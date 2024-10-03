import { Bell } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

const DashboardHeader = () => {
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="flex justify-between items-center p-5 bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg">
      <a href="/dashboard" className="flex items-center space-x-2">
        <Image src="/bloom-logo.png" alt="Bloom Logo" width={150} height={30} />
      </a>

      <div className="flex items-center space-x-6">
        <div className="mr-2">
          <img src="/son-logo.png" alt="SON Logo" className="w-18 h-12" />
        </div>

        <div className="relative">
          <Bell size={24} className="cursor-pointer" />
          <div className="absolute top-[-5px] right-[-5px] bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            3
          </div>
        </div>

        <div className="relative">
          <a href="/" className="block py-2 px-4 hover:bg-blue-600">
            <Link href={`/`} onClick={handleLogout}>
              Logout
            </Link>
          </a>
        </div>
      </div>
    </header>
  );
};
export default DashboardHeader;
