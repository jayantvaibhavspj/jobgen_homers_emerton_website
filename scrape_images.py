import urllib.request
import re
import os

pages = [
    'https://homersemerton.com.au/',
    'https://homersemerton.com.au/our-menu/',
    'https://homersemerton.com.au/about-us/',
    'https://homersemerton.com.au/catering/',
    'https://homersemerton.com.au/order-online/',
    'https://homersemerton.com.au/contact-us/'
]

all_img_urls = set()
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for page in pages:
    try:
        req = urllib.request.Request(page, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            found = re.findall(r'https?://[^\s\"\'\(\)]+wp-content/uploads/[^\s\"\'\(\)]+\.(?:jpg|jpeg|png|webp)', html)
            for img in found:
                all_img_urls.add(img)
            print(f'Fetched {page}, total images so far: {len(all_img_urls)}')
    except Exception as e:
        print(f'Error fetching {page}: {e}')

print(f'\nTotal unique upload images found: {len(all_img_urls)}')

# Also find Google places review images or other photos
download_dir = r'c:\Users\PRASHANT VAIBHAV\Documents\jobgen_micro_homers_emerton\public\homers_assets'
os.makedirs(download_dir, exist_ok=True)

downloaded = []
for url in sorted(all_img_urls):
    filename = url.split('/')[-1]
    # Skip small thumbs if not necessary
    target_path = os.path.join(download_dir, filename)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp, open(target_path, 'wb') as f:
            f.write(resp.read())
        print(f'Downloaded: {filename}')
        downloaded.append((url, filename))
    except Exception as e:
        print(f'Failed {url}: {e}')

print(f'\nSuccessfully downloaded {len(downloaded)} images to {download_dir}')
