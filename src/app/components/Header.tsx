import Image from "next/image";

const DashboardHeader = () => {
  return (
    <header className="flex justify-between items-center p-5 bg-[#14203d] text-white shadow-lg">
      <a href="/dashboard" className="flex items-center space-x-2">
        <Image src="/bloom-logo.png" alt="Bloom Logo" width={150} height={30} />
      </a>

      <div className="flex items-center space-x-6">
        <div className="mr-2">
          <Image src="/son-logo.png" alt="SON Logo" width={60} height={40} />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
