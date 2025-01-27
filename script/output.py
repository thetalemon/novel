from PIL import Image, ImageDraw, ImageFont

BASE_IMAGE_PATH = "ogbg.png"
OUTPUT_PATH = "ogp_output.png"
TEXT = "Example Text\nWith New Line\ntext\nWith New Line\nWith New Line\nWith New Line\nWith New Line"
FONT_FILE_PATH = './ZenMaruGothic-Medium.ttf'
FONT_SIZE = 50
MANUAL_OFFSET = -70

base_image = Image.open(BASE_IMAGE_PATH)
draw = ImageDraw.Draw(base_image)
font = ImageFont.truetype(FONT_FILE_PATH, FONT_SIZE)

# テキストの位置と色の設定
lines = TEXT.split('\n')
line_heights = [draw.textbbox((0, 0), line, font=font)[3] - draw.textbbox((0, 0), line, font=font)[1] for line in lines]
total_text_height = sum(line_heights)

if len(line_heights) > 1:
    line_heights[0] = line_heights[1]

# テキストの中央位置を計算
text_color = (255, 255, 255)  # 白色
y_offset = (base_image.height - total_text_height - (len(lines) - 1)) // 2
y_offset += MANUAL_OFFSET

# テキストの描画
for line, line_height in zip(lines, line_heights):
    line_bbox = draw.textbbox((0, 0), line, font=font)
    line_width = line_bbox[2] - line_bbox[0]
    draw.text(((base_image.width - line_width) // 2, y_offset), line, font=font, fill=text_color)
    y_offset += line_height + 20

# 画像の保存
base_image.save(OUTPUT_PATH)
print(f"OGP画像が{OUTPUT_PATH}に保存されました。")