"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardHeader from "../../components/Header";
import { LabType } from "@/libs/types/lab.type";
import SidePanel from "@/app/components/SidePanel2";

const LabDetails = () => {
  const { id } = useParams();
  const [lab, setLab] = useState<LabType>({
    name: "",
    address: "",
    country: "",
    state: "",
    id: 0,
  });

  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const handleSidePanelToggle = () => {
    setSidePanelOpen(!sidePanelOpen);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/lab/${id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setLab(data.lab));
  }, [id]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="lg:w-64">
        <SidePanel isOpen={sidePanelOpen} togglePanel={handleSidePanelToggle} />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 max-w-md">
                <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  Lab Details
                </h1>
                <div className="flex flex-col gap-2">
                  <p className="text-gray-600 dark:text-gray-300">
                    Name:{" "}
                    <span className="text-gray-800 dark:text-gray-100">
                      {lab.name}
                    </span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Address:{" "}
                    <span className="text-gray-800 dark:text-gray-100">
                      {lab.address}
                    </span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    State:{" "}
                    <span className="text-gray-800 dark:text-gray-100">
                      {lab.state}
                    </span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Country:{" "}
                    <span className="text-gray-800 dark:text-gray-100">
                      {lab.country}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default LabDetails;
