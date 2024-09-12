import {
  Beaker,
  Hammer,
  TestTubeDiagonal,
  Users,
  Settings,
} from "lucide-react";
import Link from "next/link";

const SidePanel = () => (
  <div className="bg-white h-full shadow-lg">
    <div className="p-4">
      <nav className="mt-8">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              <Beaker className="h-5 w-5 mr-2" />
              <Link href={`/labs`}>Laboratory</Link>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              <Hammer className="h-5 w-5 mr-2" />
              <Link href={`/equipment`}>Equipment</Link>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              <TestTubeDiagonal className="h-5 w-5 mr-2" />
              Reagent
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              <Users className="h-5 w-5 mr-2" />
              Users
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default SidePanel;
