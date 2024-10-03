"use client";

import React, { useState } from "react";

import DashboardHeader from "../components/Header";

import { toast } from "react-toastify";
import SidePanel from "../components/SidePanel2";
import { NewMetricForm } from "../components/forms/NewMetricForm";
import { MetricType } from "@/libs/types/metric.type";
import { NewReagentForm } from "../components/forms/NewReagentForm";
import { ReagentReportType, ReagentType } from "@/libs/types/reagent.type";
import useLab from "@/libs/hooks/use-lab";
import { NewReagentReportForm } from "../components/forms/NewReagentReportForm";
import useReagent from "@/libs/hooks/use-reagent";
import useMetric from "@/libs/hooks/use-metric";
import ReagentTable from "../components/tables/reagent.table";
import { useReagentReport } from "@/libs/hooks/use-reagent-report";

export default function Reagent() {
  const { laboratories } = useLab();
  const { reagents } = useReagent();
  const { metrics } = useMetric();
  const { reagentReport } = useReagentReport();
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
  const [reagentReportForm, setReagentReportForm] = useState<ReagentReportType>(
    {
      metricId: 0,
      reagentId: 0,
      quantity: 0,
      comment: "",
      expiryDate: "",
      purchaseDate: "",
      status: undefined,
    },
  );

  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showReagentModal, setShowReagentModal] = useState(false);
  const [showReagentReportModal, setShowReagentReportModal] = useState(false);
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

  const handleReagentReportInputChange = (e: any) => {
    setReagentReportForm((prevDetails) => ({
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
      credentials: "include",
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
      credentials: "include",
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

  const handleReagentReportSubmit = (e: any) => {
    e.preventDefault();
    const formData: ReagentReportType = {
      metricId: reagentReportForm.metricId,
      reagentId: reagentReportForm.reagentId,
      quantity: reagentReportForm.quantity,
      comment: reagentReportForm.comment,
      expiryDate: reagentReportForm.expiryDate,
      purchaseDate: reagentReportForm.purchaseDate,
      status: reagentReportForm.status,
    };

    fetch(`${process.env.NEXT_PUBLIC_API}/reagents/reports`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        setReagentReportForm({
          metricId: 0,
          reagentId: 0,
          quantity: 0,
          comment: "",
          expiryDate: "",
          purchaseDate: "",
          status: undefined,
        });
        setShowReagentReportModal(false);
        setIsFetch(true);
      })
      .catch((error) => {
        toast.error("Error creating metric: " + error.message);
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="lg:w-64">
        <SidePanel isOpen={sidePanelOpen} togglePanel={handleSidePanelToggle} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <DashboardHeader />
        <div className="container mx-auto p-4">
          <div className="container mx-auto">
            <div className="flex justify-start space-x-4">
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
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowReagentReportModal(true)}
              >
                Reagent Stock
              </button>
            </div>
          </div>

          <h2 className="text-lg font-bold mb-4 mt-4">Reagents</h2>
          <ReagentTable reports={reagentReport!} />

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

          <NewReagentReportForm
            metricId={reagentReportForm.metricId}
            reagentId={reagentReportForm.reagentId}
            metrics={metrics!}
            reagents={reagents!}
            report={reagentReportForm}
            showModal={showReagentReportModal}
            setShowModal={setShowReagentReportModal}
            handleInputChange={handleReagentReportInputChange}
            handleSubmit={handleReagentReportSubmit}
          />
        </div>
      </div>
    </div>
  );
}
