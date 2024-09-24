"use client";

import React, { useState, useEffect } from "react";

import DashboardHeader from "../components/Header";

import { toast } from "react-toastify";
import SidePanel2 from "../components/SidePanel2";
import { NewMetricForm } from "../components/forms/NewMetricForm";
import { MetricType } from "@/libs/types/metric.type";
import { NewReagentForm } from "../components/forms/NewReagentForm";
import { ReagentType } from "@/libs/types/reagent.type";
import { LabType } from "@/libs/types/lab.type";

export default function Reagent() {
  const [laboratories, setLaboratories] = useState<LabType[]>([]);
  const [metricForm, setMetricForm] = useState<MetricType>({
    name: "",
    symbol: "",
    type: undefined,
  });
  const [reagentForm, setReagentForm] = useState<ReagentType>({
    name: "",
    manufacturer: "",
    labId: 0,
  });

  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showReagentModal, setShowReagentModal] = useState(false);
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

  const handleReagentInputChange = (e: any) => {
    setReagentForm((prevDetails) => ({
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

  const handleReagentSubmit = (e: any) => {
    e.preventDefault();
    const formData: ReagentType = {
      name: reagentForm.name,
      manufacturer: reagentForm.manufacturer,
      labId: reagentForm.labId,
    };

    fetch(`${process.env.NEXT_PUBLIC_API}/reagents/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        setReagentForm({
          name: "",
          manufacturer: "",
          labId: 0,
        });
        setShowReagentModal(false);
        setIsFetch(true);
      })
      .catch((error) => {
        toast.error("Error creating metric: " + error.message);
      });
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/lab/`)
      .then((response) => response.json())
      .then((data) => {
        setLaboratories(data.labs);
      });
  }, [isFetch]);

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
          <div className="container mx-auto p-4">
            <div className="flex justify-start mt-4 space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowModal(true)}
              >
                Metric Setup
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowReagentModal(true)}
              >
                New Reagent
              </button>
            </div>
          </div>

          <NewMetricForm
            showModal={showModal}
            setShowModal={setShowModal}
            handleInputChange={handleInputChange}
            metric={metricForm}
            handleSubmit={handleSubmit}
          />

          <NewReagentForm
            showModal={showReagentModal}
            setShowModal={setShowReagentModal}
            handleInputChange={handleReagentInputChange}
            reagent={reagentForm}
            laboratories={laboratories}
            handleSubmit={handleReagentSubmit}
          />
        </div>
      </div>
    </div>
  );
}
