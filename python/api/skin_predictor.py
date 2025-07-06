import torch
from torchvision import transforms
from PIL import Image
import json
from io import BytesIO

model = torch.load("models/skin_model.pt", map_location="cpu")
model.eval()

with open("models/labels.json") as f:
    label_map = json.load(f)

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

async def predict_skin_disease(file):
    img = Image.open(BytesIO(await file.read())).convert("RGB")
    img_tensor = transform(img).unsqueeze(0)

    with torch.no_grad():
        output = model(img_tensor)
        confidence = torch.softmax(output, 1).max().item()
        predicted_idx = torch.argmax(output, 1).item()

    if confidence < 0.3:
        return {"diagnosis": "Uncertain", "confidence": round(confidence, 2)}
    
    return {"diagnosis": label_map[str(predicted_idx)], "confidence": round(confidence, 2)}
