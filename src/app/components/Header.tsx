import Image from "next/image";

const DashboardHeader = () => {
  return (
    <header className="flex justify-between items-center p-5 bg-[#14203d] text-white">
      <a href="/dashboard">
        <Image src="/bloom-logo.png" alt="Bloom Logo" width={150} height={30} />
      </a>

      <div className="text-2xl">
        <span>&#128276;</span>
      </div>
    </header>
  );
};

export default DashboardHeader;
