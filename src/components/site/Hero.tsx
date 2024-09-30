"use client";

import { useState } from "react";
import NonLoginInfo from "./NonLoginInfo";
import TabSwitcher from "./TabSwitcher";
import UploadArea from "./UploadArea";
import ZoomLevelSelector from "./ZoomLevelSelector";
import { Session } from "next-auth";
import Image from "next/image";

type Tab = 'upscale' | 'reimagine';


interface HeroProps {
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
  IsProSelected: number;
  setIsProSelected: (level: number) => void;
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  session?: Session | null; // Optionally pass session if required
  error?: string | null; // Optionally pass error if required
  setError?: (error: string | null) => void; // Optionally pass setError if required
}

const Hero: React.FC<HeroProps> = ({ selectedTab, setSelectedTab, zoomLevel, setZoomLevel, handleFileUpload, session, error, setError, IsProSelected, setIsProSelected }) => {
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleFileUpload2 = async (file: File, onSuccess: () => void, onError: () => void) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        body: formData,
        headers: {
          'Zoom-Level': zoomLevel.toString()
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
  
      const data = await response.json();
      if (data.result) {
        setBase64Image(`data:image/png;base64,${data.result}`);
        onSuccess(); // Call success callback to stop the loading spinner
      } else {
        throw new Error('No image data returned from API');
      }
    } catch (error) {
      console.error('Image upload failed', error);
      onError(); // Call error callback to stop the loading spinner and handle error
    }
  };
  
  
  
  
  const handleUploadAnother = () => {
    setBase64Image(null); // Reset the image to allow another upload
  };

  return (
    <section className="py-10 bg-white text-center">
      {selectedTab === 'upscale' ? (
        <div className="max-w-2xl mx-auto">
          <TabSwitcher selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <h1 className="text-5xl font-bold mb-2">Smart Image Upscaler</h1>
          <p className="text-gray-700 mb-6">Upscale and enhance your jpg, png, jpeg, images in batch process.</p>
          {IsProSelected===1 && !base64Image && (<div className="mb-5"><a href="/#pricing" className="box-border relative inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
                                <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                                <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                                <span className="relative  flex items-center text-lg">
                                <svg className="relative w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                Get Pro
                                </span>
                                </a></div>)}
        {!base64Image &&  <ZoomLevelSelector zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} error={error} setError={setError} session={session}
          IsProSelected={IsProSelected} setIsProSelected={setIsProSelected} />}
          <UploadArea
            handleFileUpload={handleFileUpload2}
            base64Image={base64Image}
            onUploadAnother={handleUploadAnother}
          />
          <NonLoginInfo />
        </div>
      ) : (
        <div>
          <TabSwitcher selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <h1 className="text-5xl font-bold mb-2">Smart Image Reimagine</h1>
          <p className="text-gray-700 mb-6">Upscale and enhance your jpg, png images in batch process.</p>
          <div className=" flex flex-col items-center justify-center"> Curently Under Development.. <Image alt="development" width={100} height={100} src='/images/development.jpg'/></div>
        </div>
      )}
    </section>
  );
};

export default Hero;
