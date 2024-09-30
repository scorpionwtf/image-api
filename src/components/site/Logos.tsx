import Image from 'next/image';

const Logos: React.FC = () => {
  return (
    <section className="logos py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Trusted by Leading Companies</h2>
      <div className="flex justify-center space-x-10">
        <Image src="/images/company1-logo.png" alt="Company 1" width={120} height={60} />
        <Image src="/images/company2-logo.png" alt="Company 2" width={120} height={60} />
        <Image src="/images/company3-logo.png" alt="Company 3" width={120} height={60} />
      </div>
    </section>
  );
};

export default Logos;
