import { ImgComparisonSlider } from '@img-comparison-slider/react';

const Showcase = () => {
  return (
    <section className="showcase py-20 bg-gray-800 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center text-white mb-8">
    
        Before and After <a className='bg-gradient-to-r from-blue-500 to-slate-200 bg-clip-text text-transparent'>8x</a> 
        <a className='bg-gradient-to-r from-red-500 to-slate-200 bg-clip-text text-transparent'>AI</a> Upscale Showcase
      </h2>
      <h3 className="text-lg  text-center text-white/70 mb-4"> Achieve amazing results with our Pro 8x Smart upscaling technology</h3>
      <div className="max-w-5xl justify-center items-center">
        <ImgComparisonSlider hover={true} className='shadow-xl shadow-white/50'>
          <img
            slot="first"
            src='/images/Upscaled.webp'
            alt="Uploaded"
            className="blur-md"  // Apply Tailwind's blur utility to the first image
          />
          <img
            slot="second"
            src='/images/Upscaled.webp'
            alt="Upscaled"
          />
        </ImgComparisonSlider>
      </div>
    </section>
  );
};

export default Showcase;
