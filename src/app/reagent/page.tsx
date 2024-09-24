"use client";

import React, { useState, useEffect } from "react";

import DashboardHeader from "../components/Header";

import { toast } from "react-toastify";
import SidePanel2 from "../components/SidePanel2";
import { NewMetricForm } from "../components/forms/NewMetricForm";
import { MetricType } from "@/libs/types/metric.type";

export default function Reagent() {
  const [metricForm, setMetricForm] = useState<MetricType>({
    name: "",
    symbol: "",
    type: undefined,
  });

  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isFetch, setIsFetch] = useState(false);

  const handleSidePanelToggle = () => {
    setSidePanelOpen(!sidePanelOpen);
  };

  const handleInputChange = (e: any) => {
    setMetricForm((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData: MetricType = {
      name: metricForm.name,
      symbol: metricForm.symbol,
      type: metricForm.type,
    };

    fetch(`${process.env.NEXT_PUBLIC_API}/metrics/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        setMetricForm({
          name: "",
          symbol: "",
          type: undefined,
        });
        setShowModal(false);
        setIsFetch(true);
      })
      .catch((error) => {
        toast.error("Error creating metric: " + error.message);
      });
  };

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
        <div className="container mx-auto p-4">
          <div className="flex justify-start mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowModal(true)}
            >
              Metric Setup
            </button>
          </div>

          <NewMetricForm
            showModal={showModal}
            setShowModal={setShowModal}
            handleInputChange={handleInputChange}
            metric={metricForm}
            handleSubmit={handleSubmit}
          />

          <div className="flex justify-start mb-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              New Reagent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
