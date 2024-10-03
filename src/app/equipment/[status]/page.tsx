"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import EquipmentCard from "@/app/components/cards/EquipmentCard";

export default function EquipmentStatusPage() {
  const router = useRouter();
  const { status, laboratory } = router.query;

  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/equipments/${status}/${laboratory}`,
          {
            credentials: "include",
          },
        );
        const data = await response.json();
        setEquipments(data.equipments);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEquipments();
  }, [status, laboratory]);

  return (
    <div className="container mx-auto p-4 text-gray-800 dark:text-gray-200">
      <h2 className="text-lg font-bold mb-4">
        {laboratory} -{" "}
        {status === "functional" ? "Functional" : "Non-Functional"} Equipments
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {equipments.map((equipment: any) => (
          <EquipmentCard key={equipment.id} equipment={equipment} />
        ))}
      </div>
    </div>
  );
}
