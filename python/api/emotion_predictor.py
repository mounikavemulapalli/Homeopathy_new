import torch
from torchvision import transforms
from PIL import Image, UnidentifiedImageError
import json
from io import BytesIO

# 🔄 Load your emotion classification model
try:
    emotion_model = torch.load("models/emotion_model.pt", map_location="cpu")
    emotion_model.eval()
except Exception as e:
    raise RuntimeError(f"❌ Failed to load emotion model: {e}")

# 📜 Load emotion label mapping
try:
    with open("models/emotion_labels.json", "r") as f:
        emotion_labels = json.load(f)
except Exception as e:
    raise RuntimeError(f"❌ Failed to load emotion labels: {e}")

# 🔧 Define image transformations (resize to model input shape)
emotion_transform = transforms.Compose([
    transforms.Resize((48, 48)),  # Common FER dataset size
    transforms.Grayscale(num_output_channels=1),
    transforms.ToTensor(),
])

# 🧠 Prediction function
async def predict_emotion(file):
    try:
        image_data = await file.read()
        img = Image.open(BytesIO(image_data)).convert("RGB")
        img = emotion_transform(img).unsqueeze(0)  # Add batch dimension
    except UnidentifiedImageError:
        return {"error": "Invalid image file for emotion detection."}

    with torch.no_grad():
        output = emotion_model(img)
        probabilities = torch.softmax(output, dim=1)
        confidence = torch.max(probabilities).item()
        predicted_idx = torch.argmax(probabilities).item()

    label = emotion_labels.get(str(predicted_idx), "Unknown")

    if confidence < 0.3:
        return {
            "emotion": "Uncertain",
            "confidence": round(confidence, 2),
            "explanation": "Model confidence is too low to classify emotion accurately."
        }

    return {
        "emotion": label,
        "confidence": round(confidence, 2),
        "explanation": f"Predicted using emotion CNN model (idx={predicted_idx})"
    }
