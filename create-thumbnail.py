import os
from PIL import Image


def expand2square(pil_img):
    width, height = pil_img.size
    if width == height:
        return pil_img
    elif width > height:
        result = Image.new("RGBA", (width, width), color=None)
        result.paste(pil_img, (0, (width - height) // 2))
        return result
    else:
        result = Image.new("RGBA", (height, height), color=None)
        result.paste(pil_img, ((height - width) // 2, 0))
        return result


size = 256, 256
subdirList = os.scandir("public/sprites")

for subdir in subdirList:
    chara_id = subdir.name
    base_path = f"{subdir.path}/{chara_id}_base.png"
    base = Image.open(base_path)
    base.thumbnail(size=size)
    square_thumbnail = expand2square(base)
    square_thumbnail.save(
        f"{subdir.path}/{chara_id}_thumbnail.png", "PNG")
