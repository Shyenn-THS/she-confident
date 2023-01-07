from rembg import remove
from PIL import Image

input_pth = "images/barackObama.jpeg"
output_pth = "output.png"

input = Image.open(input_pth)
output = remove(input)
output.save(output_pth)
