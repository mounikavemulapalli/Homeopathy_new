import os
from PIL import Image

# 🔁 Resize config
IMAGE_SIZE = (224, 224)
SOURCE_DIR = "data/train"          # Path to your original dataset
DEST_DIR = "data/train"    # Where resized images will go

def resize_image(in_path, out_path):
    try:
        img = Image.open(in_path).convert("RGB")
        img = img.resize(IMAGE_SIZE)
        img.save(out_path)
    except Exception as e:
        print(f"Failed to process {in_path}: {e}")

for root, dirs, files in os.walk(SOURCE_DIR):
    for file in files:
        if file.lower().endswith((".jpg", ".jpeg", ".png")):
            rel_path = os.path.relpath(root, SOURCE_DIR)
            dest_folder = os.path.join(DEST_DIR, rel_path)
            os.makedirs(dest_folder, exist_ok=True)

            in_file = os.path.join(root, file)
            out_file = os.path.join(dest_folder, file)

            resize_image(in_file, out_file)

print("✅ All images resized and saved to:", DEST_DIR)
