from PIL import Image, ImageDraw, ImageFont
import os
import math
import json

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
    # 背景画像の読み込みとリサイズ
    try:
        background = Image.open("../../../og/ogbg.png")
        background = background.resize((width, height), Image.Resampling.LANCZOS)
    except Exception as e:
        print(f"背景画像の読み込みエラー: {e}")
        # 画像の読み込みに失敗した場合は黒背景にフォールバック
        background = Image.new('RGB', (width, height), (0, 0, 0))
    
    # 背景画像を使用して新しい画像を作成
    image = background.copy()
    draw = ImageDraw.Draw(image)
    
    # フォントの読み込み
    try:
        # フォントファイルのパスを指定
        font_path = "../../../og/ZenKurenaido-Regular.ttf"
        title_font = ImageFont.truetype(font_path, 60)
        site_name_font = ImageFont.truetype(font_path, 40)  # サイト名用のフォント
    except Exception as e:
        print(f"フォントの読み込みエラー: {e}")
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
    
    # 出力ディレクトリが存在しない場合は作成
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # 画像を保存
    image.save(output_path)
    print(f"OG画像を保存しました: {output_path}")


def generate_all_og_images():
    """index.jsonのデータを使用して全てのOG画像を生成する関数"""
    # index.jsonのパス
    index_path = "../../../data/history/data.json"
    
    try:
        # index.jsonを読み込む
        with open(index_path, 'r', encoding='utf-8') as f:
            items = json.load(f)
            print("読み込んだアイテム数:", len(items))
        
        # 各エントリーのOG画像を生成
        for item in items:
            date = item.get('date', '')
            title = item.get('title', '')
            description = item.get('description', '')
            
            if date and title:
                # 出力パスを設定
                output_path = f"img/{date}.png"
                
                # 既にファイルが存在する場合はスキップ
                if os.path.exists(output_path):
                    print(f"スキップ: {output_path} は既に存在します")
                    continue
                
                # OG画像を生成
                create_og_image(
                    title=title,
                    output_path=output_path
                )
        
        print("全てのOG画像の生成が完了しました")
            
    except Exception as e:
        print(f"エラーが発生しました: {e}")
        import traceback
        print(traceback.format_exc())  # スタックトレースを表示

if __name__ == "__main__":
    # 全てのOG画像を生成
    generate_all_og_images()
