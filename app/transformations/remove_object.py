from PIL import Image
import io
import sys
import os

def remove_object(imageData, maskData):
    try:
        
        # Convert bytes data into an image
        # original_image = Image.open(io.BytesIO(imageData))
        # mask_image = Image.open(io.BytesIO(maskData))
        # print("TEST")

        # # Convert the image to a supported format if necessary
        # if original_image.format not in ['JPEG', 'PNG', 'JPG']:
        #     original_image = original_image.convert("RGB")
        #     converted_image_io = io.BytesIO()
        #     original_image.save(converted_image_io, format='JPEG')
        #     original_image = Image.open(io.BytesIO(converted_image_io.getvalue()))

        # Inpaint
        print("TEST2")
        print("TEST3")
        
        
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return None


