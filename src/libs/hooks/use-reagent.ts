"use client";

import { useState, useEffect } from "react";

import { ReagentType } from "../types/reagent.type";

const useReagent = () => {
  const [reagents, setReagents] = useState<ReagentType[]>();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/reagents/`,
        );
        const data = await response.json();
        setReagents(data.reagents);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchLabs();
  }, []);

  return { reagents, error };
};

export default useReagent;
