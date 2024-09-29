"use client";

import { useState, useEffect } from "react";

import { LabType } from "@/libs/types/lab.type";

const useLab = () => {
  const [laboratories, setLaboratories] = useState<LabType[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/lab/`);
        const data = await response.json();
        setLaboratories(data.labs);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchLabs();
  }, []);

  return { laboratories, error };
};

export default useLab;
