const DashboardHeader = () => {
    return (
      <header className="flex justify-between items-center p-5 bg-[#14203d] text-white">
        <img src="bloom-logo.png" alt="Bloom Logo" className="max-w-[150px]" />
        <div className="text-2xl">
          <span>&#128276;</span>
        </div>
      </header>
    );
};
  
export default DashboardHeader;