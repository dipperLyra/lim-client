"use client";

import React, { useState, useEffect } from "react";

import DashboardHeader from "../components/Header";

import { X } from "lucide-react";
import SidePanel from "../components/SidePanel";
import LaboratoryMetricCard from "../components/cards/Laboratory-Metric";
import { EquipmentStatsType } from "@/libs/types/stats.type";

export default function Dashboard() {
  const [equipStat, setEquipStat] = useState<EquipmentStatsType>({
    functionalEquipmentCount: 0,
    nonFunctionalEquipmentCount: 0,
    totalEquipmentCount: 0,
  });
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const handleSidePanelToggle = () => {
    setSidePanelOpen(!sidePanelOpen);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/stats/equipment`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEquipStat(data);
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Panel for larger screens */}
      <div className="hidden md:block w-64">
        <SidePanel />
      </div>

      {/* Side Panel for mobile screens */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${sidePanelOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <button
            onClick={handleSidePanelToggle}
            className="absolute top-4 right-4"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
          <SidePanel />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <LaboratoryMetricCard
                id={1}
                title="Total Equipment"
                total={equipStat.totalEquipmentCount}
                color="bg-blue-500"
                key={1}
              />
              <LaboratoryMetricCard
                id={1}
                title="Functional"
                total={equipStat.functionalEquipmentCount}
                color="bg-green-500"
                key={1}
              />
              <LaboratoryMetricCard
                id={1}
                title="Out of Service"
                total={equipStat.nonFunctionalEquipmentCount}
                color="bg-red-500"
                key={1}
              />
              <LaboratoryMetricCard
                id={1}
                title="Expiring Reagents"
                total={0}
                color="bg-amber-500"
                key={1}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
