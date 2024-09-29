"use client";

import { useState, useEffect } from "react";

import { ReagentReportTableType } from "../types/reagent.type";

const useReagentReport = () => {
  const [reagentReport, setReagentReport] =
    useState<ReagentReportTableType[]>();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/reagents/reports/`,
        );
        const data = await response.json();
        setReagentReport(data.reports);
        console.log(">>>>>> Data Received");
        console.log(data.reports);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchLabs();
  }, []);

  return { reagentReport, error };
};

export default useReagentReport;
