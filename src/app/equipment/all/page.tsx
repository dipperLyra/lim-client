"use client";

import { useState, useEffect, Suspense } from "react";
import EquipmentCard from "@/app/components/cards/EquipmentCard";
import DashboardHeader from "@/app/components/Header";
import SidePanel from "@/app/components/SidePanel2";
import ReagentCard from "@/app/components/cards/ReagentCard";

export default function NonFunctionalEquipmentPage() {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [equipments, setEquipments] = useState([]);
  const [reagents, setReagents] = useState([]);
  const [laboratory, setLaboratory] = useState("");

  const handleSidePanelToggle = () => {
    setSidePanelOpen(!sidePanelOpen);
  };

  useEffect(() => {
    const fetchEquipments = async (labId: string) => {
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API}/lab/assets`);
        if (labId) {
          url.searchParams.set("labId", labId);
          url.searchParams.set("status", "all");

          const response = await fetch(url.href);
          const data = await response.json();
          setEquipments(data?.equipments);
          setReagents(data?.reagents);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const params = new URLSearchParams(window.location.search);
    const labId = params.get("labId");
    const labName = params.get("laboratory");

    if (labId) {
      fetchEquipments(labId);
      setLaboratory(labName || "");
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="lg:w-64">
        <SidePanel isOpen={sidePanelOpen} togglePanel={handleSidePanelToggle} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <DashboardHeader />
        <div className="p-4">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center space-x-2">
            <span className="text-blue-500">{laboratory}</span>
            <span className="text-gray-500">- Equipments</span>
          </h2>

          <Suspense fallback={<div>Loading equipments...</div>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {equipments.map((equipment: any) => (
                <EquipmentCard key={equipment.id} equipment={equipment} />
              ))}
            </div>
          </Suspense>

          <h2 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center space-x-2">
            <span className="text-gray-500">Reagents</span>
          </h2>

          <Suspense fallback={<div>Loading reagents...</div>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reagents?.map((reagent: any, index) => (
                <ReagentCard
                  key={index}
                  comment={reagent.comment}
                  name={reagent.name}
                  status={reagent.status}
                  manufacturer={reagent.manufacturer}
                />
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
