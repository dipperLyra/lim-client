"use client";

import { useState, useEffect } from "react";

import { MetricType } from "../types/metric.type";

const useMetric = () => {
  const [metrics, setMetrics] = useState<MetricType[]>();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/metrics/`);
        const data = await response.json();
        setMetrics(data.metrics);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchLabs();
  }, []);

  return { metrics, error };
};

export default useMetric;
