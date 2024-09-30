import { IoMdInformationCircleOutline } from "react-icons/io";


const NonLoginInfo = () => {
    return (
      <div className="flex flex-col mb-6 border-dashed border bg-slate-100 rounded-xl py-4 opacity-80">
        <p className="flex flex-row text-center text-gray-600 text-sm  text-black/40 ">
          <IoMdInformationCircleOutline className=" mx-3 size-5"/>
          Non-login users can upscale images up to a maximum dimension of <a className="text-blue-600/90 mx-1" href="/#pricing">4000x4000</a> for free.
          
        </p>
        <p className="text-center text-gray-600 text-sm  text-black/40">Create images up to <a className="text-blue-600/90 mx-1" href="/#pricing">16000x16000px</a>, and use batch upscaling. <a className="text-blue-600/90 mx-1 underline" href="/#pricing">Starting from $2.9</a></p>
      </div>
    );
  };
  
  export default NonLoginInfo;
  