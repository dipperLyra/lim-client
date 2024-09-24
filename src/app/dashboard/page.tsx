"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import DashboardHeader from "../components/Header";

import LaboratoryMetricCard from "../components/cards/Laboratory-Metric";
import { EquipmentStatsType } from "@/libs/types/stats.type";
import SidePanel2 from "../components/SidePanel2";
import { LabEquipmentStatusType } from "@/libs/types/equip.type";

export default function Dashboard() {
  const [equipStat, setEquipStat] = useState<EquipmentStatsType>({
    functionalEquipmentCount: 0,
    nonFunctionalEquipmentCount: 0,
    totalEquipmentCount: 0,
  });
  const [labEquipmentStatus, setLabEquipmentStatus] = useState<
    LabEquipmentStatusType[]
  >([]);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const handleSidePanelToggle = () => {
    setSidePanelOpen(!sidePanelOpen);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/lab/equipments/status`)
      .then((response) => response.json())
      .then((data) => {
        setLabEquipmentStatus(data.labEquipmentStatus);

        const totalEquipments = data.labEquipmentStatus.reduce(
          (acc: number, lab: LabEquipmentStatusType) =>
            acc + lab.totalEquipments,
          0,
        );
        const functionalEquipments = data.labEquipmentStatus.reduce(
          (acc: number, lab: LabEquipmentStatusType) =>
            acc + lab.functionalEquipments.length,
          0,
        );
        const nonFunctionalEquipments = data.labEquipmentStatus.reduce(
          (acc: number, lab: LabEquipmentStatusType) =>
            acc + lab.nonFunctionalEquipments.length,
          0,
        );

        setEquipStat({
          totalEquipmentCount: totalEquipments,
          functionalEquipmentCount: functionalEquipments,
          nonFunctionalEquipmentCount: nonFunctionalEquipments,
        });
      });
  }, []);

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
                title="Non-Functional"
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

          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">
              Laboratory Equipments Status
            </h2>

            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="w-full table-auto divide-y divide-gray-200">
                <thead className="bg-gray-200 text-gray-600">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Laboratory
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Total Equipments
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Functional Equipments
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Non-Functional Equipments
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {labEquipmentStatus.map((lab) => (
                    <tr key={lab.laboratory}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {lab.laboratory}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lab.totalEquipments}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 cursor-pointer">
                        <Link
                          href={`/equipment/functional?labId=${lab.laboratoryId}&laboratory=${lab.laboratory}`}
                        >
                          {lab.functionalEquipments.length}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 cursor-pointer">
                        <Link
                          href={`/equipment/non-functional?labId=${lab.laboratoryId}&laboratory=${lab.laboratory}`}
                        >
                          {lab.nonFunctionalEquipments.length}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
