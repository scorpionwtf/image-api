import React, { useState } from 'react';
import { MdUploadFile } from "react-icons/md";
import { MdFileDownload } from "react-icons/md";
import { ImgComparisonSlider } from '@img-comparison-slider/react';

interface UploadAreaProps {
  handleFileUpload: (file: File, onSuccess: () => void, onError: () => void) => void; // Update to pass success and error callbacks
  base64Image: string | null; // Store the base64 image for display
  onUploadAnother: () => void; // Function to reset the upload area
}

const UploadArea: React.FC<UploadAreaProps> = ({ handleFileUpload, base64Image, onUploadAnother }) => {
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null); // New state for uploaded image URL

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    // Validate file type and size
    if (!file.type.startsWith('image/jpeg') && !file.type.startsWith('image/png')) {
      alert('Only JPG or PNG images are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB.');
      return;
    }

    // Set loading to true and pass the file to handleFileUpload
    setLoading(true);

    // Generate a temporary URL for the uploaded image
    const uploadedImageUrl = URL.createObjectURL(file);
    setUploadedImageUrl(uploadedImageUrl);

    handleFileUpload(
      file,
      () => {
        // On success (image processed), set loading to false
        setLoading(false);
      },
      () => {
        // On error, also set loading to false
        setLoading(false);
        alert('Failed to process the image. Please try again.');
      }
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <svg className="animate-spin h-12 w-12 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <p className="text-gray-500 mt-2">Processing image...</p>
      </div>
    );
  }

  // Render the comparison slider with the uploaded image and the transformed base64 image
  if (base64Image && uploadedImageUrl) {
    return (
      <div className="flex flex-col items-center mb-10">
        
        <ImgComparisonSlider
    hover={true}
    style={{
      maxWidth: '100%', // Restrict max width of the container
      maxHeight: '500px', // Restrict max height of the container
      width: '100%',
      height: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}
  >
    <img
      slot="first"
      src={uploadedImageUrl}
      alt="Uploaded"
      style={{
        objectFit: 'contain', // Maintain proportions
        width: '100%', 
        height: '100%',
        maxWidth: '100%',
        maxHeight: '500px', // Make sure it fits within this height
      }}
    />
    <img
      slot="second"
      src={base64Image}
      alt="Upscaled"
      style={{
        objectFit: 'contain', // Maintain proportions
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '500px', // Make sure it fits within this height
      }}
    />
  </ImgComparisonSlider>

        <div className="mt-4 flex space-x-4">
        <a href="/pricing" className=" mr-36 box-border relative inline-flex items-center justify-center w-auto px-6 py-1 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
                                <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                                <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                                <span className="relative  flex items-center text-lg">
                                <svg className="relative w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                Get Pro
                                </span>
                                </a>
                                
          <button onClick={onUploadAnother}>
            <a className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
              <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
              <span className="relative text-white font-extrabold flex flex-row gap-x-1 items-center">UPLOAD <MdUploadFile /> </span>
            </a>
          </button>

          <a href={base64Image} download="upscaled-image.png" className="rounded-full px-5 py-2.5 overflow-hidden group bg-blue-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300">
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative flex flex-row items-center gap-x-1">Download <MdFileDownload /></span>
          </a>

        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-dashed mx-2 border-gray-300 p-10 rounded-xl bg-slate-100 mb-6 relative">
      <input
        type="file"
        accept="image/jpeg, image/png"
        className="opacity-0 absolute inset-0 z-50 cursor-pointer"
        onChange={handleImageUpload}
      />
      <div className="flex flex-col items-center">
        <MdUploadFile size={80} color='grey'/>
        <p className="text-gray-600 mt-2">Click or Drag & Drop images</p>
        <p className="text-sm text-gray-400">JPG, JPEG or PNG. Max Free Size 5MB</p>
      </div>
    </div>
  );
};

export default UploadArea;
