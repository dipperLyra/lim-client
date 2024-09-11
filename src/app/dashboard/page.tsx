"use client";

import React, { useState, useEffect } from "react";

import DashboardHeader from "../components/Header";
import { LabType } from "@/libs/types/lab.type";

import { X } from "lucide-react";
import SidePanel from "../components/SidePanel";
import LaboratoryMetricCard from "../components/cards/Laboratory-Metric";

export default function Dashboard() {
  const [labs, setLabs] = useState<LabType[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const handleSidePanelToggle = () => {
    setSidePanelOpen(!sidePanelOpen);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/lab/`)
      .then((response) => response.json())
      .then((data) => {
        setLabs(data.labs);
        setLoading(false);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {labs.map((lab) => (
                <LaboratoryMetricCard
                  id={lab.id}
                  title="Equipment"
                  total={20}
                  key={lab.id}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
