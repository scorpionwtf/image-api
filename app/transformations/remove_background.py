# from rembg import remove
from rembg import remove

from PIL import Image
import io
import sys
import os


    
    

def remove_background(image_data):
    try:
        # Convert bytes data into an image
        original_image = Image.open(io.BytesIO(image_data))
        
        # Convert the image to a supported format if necessary
        if original_image.format not in ['JPEG', 'PNG', 'JPG']:
            
            original_image = original_image.convert("RGB")
            converted_image_io = io.BytesIO()
            original_image.save(converted_image_io, format='JPEG')
            original_image = Image.open(io.BytesIO(converted_image_io.getvalue()))

        # Remove background
        
        image_without_bg = remove(original_image)
        
        
        return image_without_bg
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def remove_background_from_file(input_path, output_path):
    try:
        # Read the image from the file path
        with open(input_path, "rb") as image_file:
            image_data = image_file.read()
        
        # Call the removebg function with the image data
        image_without_bg = remove_background(image_data)
        
        if image_without_bg is not None:
            # Save the resulting image to the output path
            image_without_bg.save(output_path)
            print(f"Background removed successfully. Saved to {output_path}")
        else:
            print("Background removal failed.")

    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python test_remove_bg.py <input_path>")
        sys.exit(1)

    input_path = sys.argv[1]
    # Define the output path (you can customize this as needed)
    output_path = os.path.splitext(input_path)[0] + '_no_bg.png'

    remove_background_from_file(input_path, output_path)