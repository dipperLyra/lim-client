"use client";

import { useState, useEffect } from "react";

import { ReagentReportTableType } from "../types/reagent.type";

export const useReagentReport = () => {
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
      } catch (error: any) {
        setError(error);
      }
    };

    fetchLabs();
  }, []);

  return { reagentReport, error };
};

export const useReagentReportTable = () => {
  const [reagentReportTable, setReagentReportTable] =
    useState<ReagentReportTableType[]>();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/reagents/reports-table/`,
        );
        const data = await response.json();
        setReagentReportTable(data.reportsTable);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchLabs();
  }, []);

  return { reagentReportTable, error };
};
