import React from 'react';

const FeaturesSection: React.FC = () => {
  return (
    <section className='py-10 bg-white'>
      <h2 className="text-4xl font-bold text-center text-black/90 mb-8">See the how our powerfull AI upscaler works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto p-8">
        <div className="bg-slate-100 rounded-lg shadow-md p-6 text-center transition-transform duration-300 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full mx-auto mb-4">
            {/* Replace emoji with an icon if you want */}
            🔄
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Advanced AI, Lightning Fast</h3>
          <p className="text-sm text-gray-600">
            Utilizing cutting-edge AI, our upscaling tool speeds up your image processing in seconds, ensuring high-quality results at top speed.
          </p>
        </div>

        <div className="bg-slate-100  rounded-lg shadow-md p-6 text-center transition-transform duration-300 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full mx-auto mb-4">
            📊
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Batch Processing Made Easy</h3>
          <p className="text-sm text-gray-600">
            Scale your workflow by processing multiple images at once. Perfect for professionals handling large volumes of media.
          </p>
        </div>

        <div className="bg-slate-100 rounded-lg shadow-md p-6 text-center transition-transform duration-300 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full mx-auto mb-4">
            🛡️
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Privacy Protection</h3>
          <p className="text-sm text-gray-600">
            All uploaded images are automatically deleted after processing if the user doesn't have an account and securely stored with encryption for existing users, ensuring your privacy is never compromised.
          </p>
        </div>

        <div className="bg-slate-100 rounded-lg shadow-md p-6 text-center transition-transform duration-300 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full mx-auto mb-4">
            🖌️
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Comprehensive Image Tools</h3>
          <p className="text-sm text-gray-600">
            Fine-tune your images with built-in reimagine-upscaler, filtering, and annotation tools. Get your images ready exactly as you need them.
          </p>
        </div>

        <div className="bg-slate-100  rounded-lg shadow-md p-6 text-center transition-transform duration-300 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full mx-auto mb-4">
            🚀
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Commercial Use? No Problem</h3>
          <p className="text-sm text-gray-600">
            Use the enhanced images for commercial purposes without any restrictions. Upscale for free, with no hidden charges or fees.
          </p>
        </div>

        <div className="bg-slate-100 rounded-lg shadow-md p-6 text-center transition-transform duration-300 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full mx-auto mb-4">
            🔍
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Superior Resolution Increase</h3>
          <p className="text-sm text-gray-600">
            Achieve up to 8x the original resolution using our high-precision upscaling technology—perfect for professional-grade outputs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

  