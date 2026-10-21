import urllib.request
import os

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
download_dir = r'c:\Users\PRASHANT VAIBHAV\Documents\jobgen_micro_homers_emerton\public\homers_assets'
os.makedirs(download_dir, exist_ok=True)

specific_urls = [
    'https://homersemerton.com.au/wp-content/uploads/2023/12/homers_emerton_logov2.png',
    'https://homersemerton.com.au/wp-content/uploads/2023/11/homers-emerton.jpg',
    'https://homersemerton.com.au/wp-content/uploads/2024/02/homeslide.jpg',
    'https://homersemerton.com.au/wp-content/uploads/2024/02/Chicken-deal-two_drink.jpg',
    'https://homersemerton.com.au/wp-content/uploads/2025/05/Menu-1-29052025.jpg',
    'https://homersemerton.com.au/wp-content/uploads/2025/05/Menu2-29052025.jpg',
    'https://homersemerton.com.au/wp-content/uploads/2025/05/Menu-3-29052025.jpg',
    'https://homersemerton.com.au/wp-content/uploads/2025/05/Menu-4-29052025.jpg',
]

for url in specific_urls:
    fname = url.split('/')[-1]
    tgt = os.path.join(download_dir, fname)
    if os.path.exists(tgt) and os.path.getsize(tgt) > 1000:
        print(f'Already exists: {fname}')
        continue
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp, open(tgt, 'wb') as f:
            f.write(resp.read())
        print(f'Downloaded {fname} ({os.path.getsize(tgt)} bytes)')
    except Exception as e:
        print(f'Failed {url}: {e}')

print('Specific downloads done!')
