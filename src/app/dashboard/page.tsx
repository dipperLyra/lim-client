"use client"

import { useEffect, useState } from "react";

import DashboardHeader from "../components/Header";
import LaboratoryCard from "../components/cards/Laboratory";
import { LabType } from "@/libs/types/lab.type";

export default function Dashboard() {
  const [labs, setLabs] = useState<LabType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/lab/`)
      .then(response => response.json())
      .then(data => setLabs(data.labs));
  }, []);
  
  return (
    <main>
      <DashboardHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Laboratories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {labs.map(lab => (
            <LaboratoryCard key={lab.id} name={lab.name} location={`${lab.address}, ${lab.state}, ${lab.country}`} />
          ))}
        </div>
      </div>

    </main>
  );
}