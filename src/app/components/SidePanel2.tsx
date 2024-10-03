import {
  Users,
  Menu,
  X,
  Beaker,
  Hammer,
  TestTubeDiagonal,
  Home,
} from "lucide-react";
import Link from "next/link";
interface SidePanelProps {
  isOpen: boolean;
  togglePanel: any;
}

const SidePanel = ({ isOpen, togglePanel }: SidePanelProps) => {
  return (
    <>
      {/* Toggle button visible only on small screens */}
      <button
        className="lg:hidden p-4 fixed top-4 left-4 z-50 bg-gray-800 text-white rounded-md"
        onClick={togglePanel}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Side panel */}
      <div
        className={`side-panel fixed top-0 left-0 h-screen w-64 shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 z-40`}
      >
        <div className="p-4">
          <nav className="mt-20">
            <ul className="space-y-2">
              <li>
                <a
                  href="/dashboard"
                  className="flex items-center p-2 text-[#14203d] hover:bg-gray-100 rounded"
                >
                  <Home className="h-5 w-5 mr-2" />
                  <Link href={`/dashboard`}>Dashboard</Link>
                </a>
              </li>
              <li>
                <a
                  href="/labs"
                  className="flex items-center p-2 text-[#14203d] hover:bg-gray-100 rounded"
                >
                  <Beaker className="h-5 w-5 mr-2" />
                  <Link href={`/labs`}>Laboratory</Link>
                </a>
              </li>
              <li>
                <a
                  href="/equipment"
                  className="flex items-center p-2 text-[#14203d] hover:bg-gray-100 rounded"
                >
                  <Hammer className="h-5 w-5 mr-2" />
                  <Link href={`/equipment`}>Equipment</Link>
                </a>
              </li>
              <li>
                <a
                  href="/reagent"
                  className="flex items-center p-2 text-[#14203d] hover:bg-gray-100 rounded"
                >
                  <TestTubeDiagonal className="h-5 w-5 mr-2" />
                  <Link href={`/reagent`}>Reagent</Link>
                </a>
              </li>
              <li>
                <a
                  href="/user"
                  className="flex items-center p-2 text-[#14203d] hover:bg-gray-100 rounded"
                >
                  <Users className="h-5 w-5 mr-2" />
                  <Link href={"/user"}>Users</Link>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay when side panel is open on mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black opacity-50 z-30"
          onClick={togglePanel}
        />
      )}
    </>
  );
};

export default SidePanel;
