import Image from 'next/image';


const APIPage = () => {;

  return (
    <div className='flex flex-col items-center'>
        <div className=" flex flex-col items-center justify-center"> Curently Under Development.. <Image alt="development" width={100} height={100} src='/images/development.jpg'/></div>
        <a href='/' className='underline'>Back to Home Page</a>
    </div> 
 );
};

export default APIPage;