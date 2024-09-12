"use client";

import React, { useState, useEffect } from "react";

import DashboardHeader from "../components/Header";

import { X } from "lucide-react";
import SidePanel from "../components/SidePanel";
import { EquipmentType } from "@/libs/types/equip.type";
import Link from "next/link";

export default function Equipment() {
  const [equip, setEquip] = useState<EquipmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const handleSidePanelToggle = () => {
    setSidePanelOpen(!sidePanelOpen);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/equipment/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEquip(data);
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
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-200 bg-gray-100 text-left">
                    S/N
                  </th>
                  <th className="px-4 py-2 border border-gray-200 bg-gray-100 text-left">
                    Name
                  </th>
                  <th className="px-4 py-2 border border-gray-200 bg-gray-100 text-left">
                    Status
                  </th>
                  <th className="px-4 py-2 border border-gray-200 bg-gray-100 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {equip.map((equip, index) => (
                  <tr key={equip.id}>
                    <td className="px-4 py-2 border border-gray-200">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {equip.name}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {equip.status?.status}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      <Link
                        href={`#`}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
