import os
import cv2
import numpy as np
from PIL import Image

BURGER_SRC = r"C:\Users\PRASHANT VAIBHAV\.gemini\antigravity-ide\brain\9ef387b0-b22a-4ecc-a56f-cd5fc4b983c8\hero_burger_1792593616613.jpg"
FRIES_SRC = r"C:\Users\PRASHANT VAIBHAV\.gemini\antigravity-ide\brain\9ef387b0-b22a-4ecc-a56f-cd5fc4b983c8\hero_fries_1792593639817.jpg"
OUT_DIR = r"c:\Users\PRASHANT VAIBHAV\Documents\jobgen_micro_homers_emerton\public"

def clean_burger(src_path, out_name):
    img = cv2.imread(src_path)
    h, w = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Cut off slate stone below bottom bun (starts around y=875)
    # Bun has an organic curved bottom, so let's mask out y > 878
    slate_y_limit = 878

    # Threshold background
    _, thresh = cv2.threshold(gray, 22, 255, cv2.THRESH_BINARY)
    
    # Remove everything below slate_y_limit
    thresh[slate_y_limit:, :] = 0

    # Morphological cleanup
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    mask = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=2)

    # Get largest component (the burger)
    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(mask)
    largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    food_mask = (labels == largest_label).astype(np.uint8) * 255

    # Dilate slightly
    kernel_edge = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    food_mask = cv2.dilate(food_mask, kernel_edge, iterations=1)

    # Smooth the mask boundary for anti-aliasing
    food_mask_f = food_mask.astype(np.float32) / 255.0

    # Feather the bottom 25 pixels of the bun so it curves softly into air
    for y in range(slate_y_limit - 22, slate_y_limit):
        fade = (slate_y_limit - y) / 22.0
        food_mask_f[y, :] *= (1.0 - (1.0 - fade) ** 2)

    food_mask_f = cv2.GaussianBlur(food_mask_f, (5, 5), 0)

    # Bounding box crop
    active_y, active_x = np.where(food_mask_f > 0.05)
    pad = 15
    y1 = max(0, active_y.min() - pad)
    y2 = min(h, active_y.max() + pad)
    x1 = max(0, active_x.min() - pad)
    x2 = min(w, active_x.max() + pad)

    rgb = rgb[y1:y2, x1:x2]
    food_mask_f = food_mask_f[y1:y2, x1:x2]

    alpha_ch = np.clip(food_mask_f * 255, 0, 255).astype(np.uint8)
    rgba = np.dstack((rgb, alpha_ch))
    pil_img = Image.fromarray(rgba)

    pil_img.thumbnail((800, 800), Image.Resampling.LANCZOS)

    png_path = os.path.join(OUT_DIR, f"{out_name}.png")
    pil_img.save(png_path, format="PNG", optimize=True)

    webp_path = os.path.join(OUT_DIR, f"{out_name}.webp")
    pil_img.save(webp_path, format="WEBP", quality=82, method=6)

    print(f"Exported pure burger (no slate): {pil_img.size} PNG={os.path.getsize(png_path)/1024:.1f}KB, WebP={os.path.getsize(webp_path)/1024:.1f}KB")

def clean_fries(src_path, out_name):
    img = cv2.imread(src_path)
    h, w = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    _, thresh = cv2.threshold(gray, 20, 255, cv2.THRESH_BINARY)
    # Box ends around y=830
    thresh[835:, :] = 0

    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    mask = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=2)

    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(mask)
    largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    food_mask = (labels == largest_label).astype(np.uint8) * 255

    kernel_edge = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    food_mask = cv2.dilate(food_mask, kernel_edge, iterations=1)
    food_mask_f = food_mask.astype(np.float32) / 255.0
    food_mask_f = cv2.GaussianBlur(food_mask_f, (5, 5), 0)

    active_y, active_x = np.where(food_mask_f > 0.05)
    pad = 15
    y1 = max(0, active_y.min() - pad)
    y2 = min(h, active_y.max() + pad)
    x1 = max(0, active_x.min() - pad)
    x2 = min(w, active_x.max() + pad)

    rgb = rgb[y1:y2, x1:x2]
    food_mask_f = food_mask_f[y1:y2, x1:x2]

    alpha_ch = np.clip(food_mask_f * 255, 0, 255).astype(np.uint8)
    rgba = np.dstack((rgb, alpha_ch))
    pil_img = Image.fromarray(rgba)

    pil_img.thumbnail((800, 800), Image.Resampling.LANCZOS)

    png_path = os.path.join(OUT_DIR, f"{out_name}.png")
    pil_img.save(png_path, format="PNG", optimize=True)

    webp_path = os.path.join(OUT_DIR, f"{out_name}.webp")
    pil_img.save(webp_path, format="WEBP", quality=82, method=6)

    print(f"Exported fries: {pil_img.size} PNG={os.path.getsize(png_path)/1024:.1f}KB, WebP={os.path.getsize(webp_path)/1024:.1f}KB")

if __name__ == "__main__":
    clean_burger(BURGER_SRC, "hero-burger")
    clean_fries(FRIES_SRC, "hero-fries")
