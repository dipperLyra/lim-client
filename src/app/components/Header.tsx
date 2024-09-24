import Image from "next/image";
import { User } from "lucide-react";

// const DashboardHeader = () => {
//   return (
//     <header className="flex justify-between items-center p-5 bg-[#14203d] text-white">
//       <a href="/dashboard">
//         <Image src="/bloom-logo.png" alt="Bloom Logo" width={150} height={30} />
//       </a>

//       <div className="text-2xl">
//         <span>&#128276;</span>
//       </div>
//     </header>
//   );
// };

// export default DashboardHeader;

const DashboardHeader = () => {
  return (
    <header className="flex justify-between items-center p-5 bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg">
      <a href="/dashboard" className="flex items-center space-x-2">
        <Image src="/bloom-logo.png" alt="Bloom Logo" width={150} height={30} />
      </a>

      <div className="flex items-center space-x-6">
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center">
            <div className="bg-white rounded-full p-1 mb-1 mr-2">
              <User className="text-blue-900" size={28} />
            </div>
            <div className="text-2xl">
              <span>&#128276;</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-medium">Standard Organisation</div>
            <div className="text-xs font-medium">of Nigeria</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
