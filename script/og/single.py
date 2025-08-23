from PIL import Image, ImageDraw, ImageFont
import os
import math
import sys

def create_og_image(
    title: str,
    output_path: str = "og_image.png",
    text_color: tuple = (255, 255, 255),  # デフォルトを白色に変更
    outline_color: tuple = (47, 65, 95),  # #2F415F
    outline_width: int = 7,
    width: int = 1200,
    height: int = 630,
    site_name: str = "北極の とある倉庫"  # サイト名を追加
):
    """
    背景画像を使用してOG画像を作成します。
    
    引数:
        title (str): メインタイトルテキスト
        output_path (str): 生成された画像の保存先パス
        text_color (tuple): テキストのRGBカラー
        outline_color (tuple): テキストのフチのRGBカラー
        outline_width (int): フチの太さ
        width (int): 画像の幅
        height (int): 画像の高さ
        site_name (str): 右下に表示するサイト名
    """
    # スクリプトのディレクトリを取得
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 背景画像の読み込みとリサイズ
    try:
        background_path = os.path.join(script_dir, "ogbg.png")
        background = Image.open(background_path)
        background = background.resize((width, height), Image.Resampling.LANCZOS)
    except Exception as e:
        print(f"背景画像の読み込みエラー: {e}")
        print(f"背景画像パス: {background_path}")
        # 画像の読み込みに失敗した場合は黒背景にフォールバック
        background = Image.new('RGB', (width, height), (0, 0, 0))
    
    # 背景画像を使用して新しい画像を作成
    image = background.copy()
    draw = ImageDraw.Draw(image)
    
    # フォントの読み込み
    try:
        # フォントファイルのパスを指定
        font_path = os.path.join(script_dir, "ZenKurenaido-Regular.ttf")
        title_font = ImageFont.truetype(font_path, 60)
        site_name_font = ImageFont.truetype(font_path, 40)  # サイト名用のフォント
    except Exception as e:
        print(f"フォントの読み込みエラー: {e}")
        print(f"フォントパス: {font_path}")
        print("デフォルトフォントを使用します")
        title_font = ImageFont.load_default()
        site_name_font = ImageFont.load_default()
    
    def draw_text_with_rounded_outline(text, position, font, fill_color, outline_color, outline_width):
        """テキストに角丸のフチを付けて描画する関数"""
        # テキストのサイズを取得
        text_bbox = draw.textbbox(position, text, font=font)
        text_width = text_bbox[2] - text_bbox[0]
        text_height = text_bbox[3] - text_bbox[1]
        
        # 角丸の半径を計算（テキストの高さの20%）
        corner_radius = int(text_height * 0.2)
        
        # フチを描画（角丸）
        for angle in range(0, 360, 5):  # 5度ごとに点を描画
            rad = math.radians(angle)
            for r in range(outline_width):
                x = position[0] + r * math.cos(rad)
                y = position[1] + r * math.sin(rad)
                draw.text((x, y), text, font=font, fill=outline_color)
        
        # メインのテキストを描画
        draw.text(position, text, font=font, fill=fill_color)
    
    # テキストの位置を計算
    title_width = draw.textlength(title, font=title_font)
    title_position = ((width - title_width) // 2, height // 3 + 50)
    
    # タイトルを描画（角丸フチ付き）
    draw_text_with_rounded_outline(title, title_position, title_font, text_color, outline_color, outline_width)
    
    # サイト名を右下に描画（角丸フチ付き）
    site_name_width = draw.textlength(site_name, font=site_name_font)
    site_name_position = (width - site_name_width - 60, height - 100)  # 右下に配置
    draw_text_with_rounded_outline(site_name, site_name_position, site_name_font, text_color, outline_color, outline_width)
    
    # 出力パスを絶対パスに変換
    if not os.path.isabs(output_path):
        output_path = os.path.join(script_dir, output_path)
    
    # 出力ディレクトリが存在しない場合は作成
    output_dir = os.path.dirname(output_path)
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)
    
    # 画像を保存
    image.save(output_path)
    print(f"OG画像を保存しました: {output_path}")


if __name__ == "__main__":
    # コマンドライン引数をチェック
    if len(sys.argv) < 2:
        print("使用方法: python single.py \"タイトル\"")
        print("例: python single.py \"新しい記事のタイトル\"")
        sys.exit(1)
    
    # タイトルを取得（複数の引数を結合）
    title = " ".join(sys.argv[1:])
    
    # デフォルトの出力パス（同じディレクトリにog_image.pngとして保存）
    output_path = "og_image.png"
    
    # OG画像を生成
    create_og_image(
        title=title,
        output_path=output_path
    )
