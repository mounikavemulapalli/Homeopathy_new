from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from torchvision import transforms, models
from PIL import Image, UnidentifiedImageError
import torch
import torch.nn as nn
import json
from io import BytesIO

app = FastAPI()

# Optional: Allow CORS if using from browser frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔄 Load label map
try:
    with open("labels.json") as f:
        label_map = json.load(f)
except Exception as e:
    raise RuntimeError(f"❌ Label map loading failed: {e}")

# 🧠 Load model
try:
    model = models.resnet18(pretrained=False)
    model.fc = nn.Linear(model.fc.in_features, len(label_map))
    model.load_state_dict(torch.load("skin_model.pt", map_location="cpu"))
    model.eval()
    print("✅ Model loaded successfully.")
except Exception as e:
    raise RuntimeError(f"❌ Model loading failed: {e}")

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])



@app.get("/")
def home():
    return {"message": "✅ Skin Disease Detection API is running!"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(BytesIO(contents)).convert("RGB")
    except UnidentifiedImageError:
        raise HTTPException(status_code=400, detail="Invalid image file.")

    image_tensor = transform(image).unsqueeze(0)

    with torch.no_grad():
        output = model(image_tensor)
        probabilities = torch.softmax(output, dim=1)
        predicted_idx = torch.argmax(probabilities, dim=1).item()
        print("Predicted index:", predicted_idx)  # Add this
        print("Label map:", label_map)
        confidence = probabilities[0, predicted_idx].item()

    # Optionally log prediction details
    print("🔍 Predicted:", label_map[str(predicted_idx)])
    print("📊 Confidence:", confidence)

    if confidence < 0.1:
        return {
            "diagnosis": label_map[str(predicted_idx)],
            "confidence": round(confidence, 2),
            "explanation": "⚠️ Low confidence. Model is uncertain, but this is the top guess."
        }

    return {
        "diagnosis": label_map[str(predicted_idx)],
        "confidence": round(confidence, 2),
        "explanation": "Prediction made using PyTorch skin model."
    }
