"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import DashboardHeader from "../components/Header";

import LaboratoryMetricCard from "../components/cards/Laboratory-Metric";
import { EquipmentStatsType } from "@/libs/types/stats.type";
import SidePanel from "../components/SidePanel2";
import { LabEquipmentStatusType } from "@/libs/types/equip.type";
import ReagentReportTable from "../components/tables/reagent-report.table";
import { useReagentReportTable } from "@/libs/hooks/use-reagent-report";

export default function Dashboard() {
  const { reagentReportTable } = useReagentReportTable();
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
    fetch(`${process.env.NEXT_PUBLIC_API}/lab/equipments/status`, {
      credentials: "include",
    })
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
      })
      .catch((error) => console.error(error));
  }, []);

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
              <LaboratoryMetricCard
                id={1}
                title="Total Equipment"
                total={equipStat.totalEquipmentCount}
                color="bg-blue-500"
                key="total-equipment"
              />
              <LaboratoryMetricCard
                id={2}
                title="Functional"
                total={equipStat.functionalEquipmentCount}
                color="bg-green-500"
                key="functional-equipment"
              />
              <LaboratoryMetricCard
                id={3}
                title="Non-Functional"
                total={equipStat.nonFunctionalEquipmentCount}
                color="bg-red-500"
                key="non-functional-equipment"
              />
              <LaboratoryMetricCard
                id={4}
                title="Expiring Reagents"
                total={0}
                color="bg-amber-500"
                key="expiring-reagents"
              />
            </div>
          </div>

          <div className="p-4">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">
              Laboratory Equipment Status
            </h2>

            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider"
                    >
                      Laboratory
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider"
                    >
                      Total Equipment
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider"
                    >
                      <p className="bg-green-500 text-white rounded-full py-2 px-4 text-sm">
                        Functional Equipment
                      </p>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider"
                    >
                      <p className="bg-red-500 text-white rounded-full py-2 px-4 text-sm">
                        Non-Functional Equipment
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {labEquipmentStatus?.map((lab) => (
                    <tr key={lab.laboratory}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {lab.laboratory}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
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

          <div className="p-4">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">
              Laboratory Reagent Status
            </h2>

            <div className="overflow-x-auto rounded-lg shadow-md">
              <ReagentReportTable reports={reagentReportTable!} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
