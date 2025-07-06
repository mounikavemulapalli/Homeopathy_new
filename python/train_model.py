import os
import torch
from torch import nn, optim
from torchvision import datasets, transforms, models
import json
from sklearn.model_selection import train_test_split
from torch.utils.data import Subset

# ---------------------
# CONFIG
# ---------------------
DATA_DIR = "data/train"
MODEL_PATH = "skin_model.pt"
LABELS_PATH = "labels.json"
NUM_EPOCHS = 7
BATCH_SIZE = 32
LEARNING_RATE = 0.001

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"🔧 Using device: {device}")

# ---------------------
# TRANSFORMS
# ---------------------
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# ---------------------
# LOAD DATASET
# ---------------------
full_dataset = datasets.ImageFolder(DATA_DIR, transform=transform)

# Split dataset into train/val (80/20)
indices = list(range(len(full_dataset)))
train_indices, val_indices = train_test_split(indices, test_size=0.2, random_state=42)

train_dataset = Subset(full_dataset, train_indices)
val_dataset = Subset(full_dataset, val_indices)

train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
val_loader = torch.utils.data.DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False)

# ---------------------
# SAVE LABELS
# ---------------------
idx_to_class = {v: k for k, v in full_dataset.class_to_idx.items()}
with open(LABELS_PATH, "w") as f:
    json.dump(idx_to_class, f)
print("✅ Labels saved to:", LABELS_PATH)

# ---------------------
# MODEL SETUP
# ---------------------
model = models.resnet18(pretrained=True)
model.fc = nn.Linear(model.fc.in_features, 26)

model = model.to(device)

# ---------------------
# LOSS AND OPTIMIZER
# ---------------------
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)

# ---------------------
# TRAINING LOOP
# ---------------------
print("🚀 Starting training...")
for epoch in range(NUM_EPOCHS):
    model.train()
    total_loss = 0.0
    correct = 0
    total = 0

    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        total_loss += loss.item()
        _, predicted = torch.max(outputs, 1)
        correct += (predicted == labels).sum().item()
        total += labels.size(0)

    epoch_accuracy = 100 * correct / total
    print(f"📘 Epoch {epoch+1}/{NUM_EPOCHS} | Loss: {total_loss:.4f} | Accuracy: {epoch_accuracy:.2f}%")

# ---------------------
# VALIDATION ACCURACY
# ---------------------
model.eval()
val_correct = 0
val_total = 0
with torch.no_grad():
    for images, labels in val_loader:
        images, labels = images.to(device), labels.to(device)
        outputs = model(images)
        _, predicted = torch.max(outputs, 1)
        val_total += labels.size(0)
        val_correct += (predicted == labels).sum().item()

val_accuracy = 100 * val_correct / val_total
print(f"✅ Validation Accuracy: {val_accuracy:.2f}%")

# ---------------------
# SAVE MODEL
# ---------------------
torch.save(model.state_dict(), MODEL_PATH)
print("✅ Model saved to:", MODEL_PATH)
print("✅ Classes:", idx_to_class)
