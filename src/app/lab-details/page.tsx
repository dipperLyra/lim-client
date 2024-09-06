"use client"

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardHeader from "../components/Header";
import { LabType } from "@/libs/types/lab.type";


const LabDetails = () => {
  const { id } = useParams();
  const [lab, setLab] = useState<LabType>({name: "", address: "", country: "", state: "", id:0});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/lab/${id}`)
      .then(response => response.json())
      .then(data => setLab(data));
  }, [id]);


  return (
    <div>
      <DashboardHeader />
      <h1>Lab Details</h1>
      <p>Name: {lab.name}</p>
      <p>Address: {lab.address}</p>
      <p>State: {lab.state}</p>
      <p>Country: {lab.country}</p>
    </div>
  );
};
export default LabDetails;