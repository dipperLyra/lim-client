"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DashboardHeader from "../../components/Header";
import { LabType } from "@/libs/types/lab.type";
import SidePanel2 from "@/app/components/SidePanel2";

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
    fetch(`${process.env.NEXT_PUBLIC_API}/lab/${id}`)
      .then((response) => response.json())
      .then((data) => setLab(data.lab));
  }, [id]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="lg:w-64">
        <SidePanel2
          isOpen={sidePanelOpen}
          togglePanel={handleSidePanelToggle}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-md p-4 max-w-md">
                <h1 className="text-xl font-bold mb-4">Lab Details</h1>
                <div className="flex flex-col gap-2">
                  <p className="text-gray-600">Name: {lab.name}</p>
                  <p className="text-gray-600">Address: {lab.address}</p>
                  <p className="text-gray-600">State: {lab.state}</p>
                  <p className="text-gray-600">Country: {lab.country}</p>
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
