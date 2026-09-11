from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
source = Image.open(root / "dist/assets/blue-mesa-satellite.jpg").convert("RGB")

# Exact Iola Basin crop used by the page, saved at the panel's portrait ratio.
canvas = source.crop((714, 231, 1002, 691)).resize((864, 1380), Image.Resampling.LANCZOS)
draw = ImageDraw.Draw(canvas)

orange = "#e79a49"
white = "#ffffff"
pine = "#173d32"

def p(x, y):
    return (round(x * 8.64), round(y * 13.8))

# Short route from the marked Iola boat launch into the open basin.
route = [p(85, 55), p(82, 51), p(78, 47), p(72, 44), p(64, 43), p(58, 43.5), p(53, 44.5), p(48, 46)]
draw.line(route, fill=orange, width=9, joint="curve")

# Cut the line into a subtle GPS-style dash pattern by painting small gaps.
for a, b in zip(route, route[1:]):
    ax, ay = a; bx, by = b
    distance = max(abs(bx - ax), abs(by - ay))
    for step in range(14, distance, 32):
        t = step / distance
        x = round(ax + (bx - ax) * t)
        y = round(ay + (by - ay) * t)
        draw.ellipse((x - 6, y - 6, x + 6, y + 6), fill="#091d2c")

for x, y in (p(72, 44), p(56, 44)):
    draw.ellipse((x - 23, y - 23, x + 23, y + 23), fill=white)
    draw.ellipse((x - 11, y - 11, x + 11, y + 11), fill=orange)

# Launch marker fixed to the white launch tick visible in the satellite image.
x, y = p(85, 55)
draw.ellipse((x - 25, y - 25, x + 25, y + 25), fill=white, outline=pine, width=8)
draw.line((x - 28, y + 43, x, y, x + 31, y + 43), fill=white, width=11, joint="curve")
draw.line((x - 15, y + 28, x - 35, y + 10), fill=white, width=10)

try:
    font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 22)
except OSError:
    font = ImageFont.load_default()
label = "BOAT LAUNCH"
box = draw.textbbox((0, 0), label, font=font, stroke_width=4)
draw.text((x - (box[2] - box[0]) / 2, y + 54), label, font=font, fill=white, stroke_width=4, stroke_fill=pine)

canvas.save(root / "dist/assets/blue-mesa-route.jpg", quality=92, optimize=True)
