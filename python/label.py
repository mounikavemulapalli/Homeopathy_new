from torchvision import datasets
import json

# This must match your data path
DATA_DIR = "data/train"

# Load dataset
dataset = datasets.ImageFolder(DATA_DIR)

# Get class index-to-name mapping
idx_to_class = {v: k for k, v in dataset.class_to_idx.items()}

# Save to labels.json
with open("labels.json", "w") as f:
    json.dump(idx_to_class, f)

print("✅ labels.json created successfully!")
print("➡️ Contents:", idx_to_class)
