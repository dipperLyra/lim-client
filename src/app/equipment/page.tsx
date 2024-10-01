"use client";

import React, { useState, useEffect } from "react";

import DashboardHeader from "../components/Header";

import { toast } from "react-toastify";
import { EquipmentType } from "@/libs/types/equip.type";
import Link from "next/link";
import SidePanel from "../components/SidePanel2";
import { NewEquipmentForm } from "../components/forms/NewEquipmentForm";
import useLab from "@/libs/hooks/use-lab";
import useEquipment from "@/libs/hooks/use-equipment";

export default function Equipment() {
  const [equipForm, setEquipForm] = useState<EquipmentType>({
    name: "",
    status: "",
    description: "",
    manufacturer: "",
    model: "",
    serialNumber: "",
    labId: "",
    comment: "",
  });
  const { laboratories } = useLab();
  const { equipment, setIsFetch } = useEquipment();
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSidePanelToggle = () => {
    setSidePanelOpen(!sidePanelOpen);
  };

  const handleInputChange = (e: any) => {
    setEquipForm((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData: EquipmentType = {
      name: equipForm.name,
      status: equipForm.status,
      description: equipForm.description,
      manufacturer: equipForm.manufacturer,
      model: equipForm.model,
      serialNumber: equipForm.serialNumber,
      labId: equipForm.labId,
      comment: equipForm.comment,
    };

    fetch(`${process.env.NEXT_PUBLIC_API}/equipment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Equipment created successfully!");
        setEquipForm({
          name: "",
          status: "",
          description: "",
          manufacturer: "",
          model: "",
          serialNumber: "",
          comment: "",
        });
        setShowModal(false);
        setIsFetch(true);
      })
      .catch((error) => {
        toast.error("Error creating lab: " + error.message);
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
          {/* Button to trigger modal */}
          <div className="flex justify-start mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowModal(true)}
            >
              New Equipment
            </button>
          </div>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-200 bg-gray-100 text-left">
                  S/N
                </th>
                <th className="px-4 py-2 border border-gray-200 bg-gray-100 text-left">
                  Name
                </th>
                <th className="px-4 py-2 border border-gray-200 bg-gray-100 text-left">
                  Status
                </th>
                <th className="px-4 py-2 border border-gray-200 bg-gray-100 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((equip, index) => (
                <tr key={equip.id}>
                  <td className="px-4 py-2 border border-gray-200">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {equip.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {equip.status}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <Link
                      href={`#`}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Button to trigger modal */}
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowModal(true)}
            >
              New Equipment
            </button>
          </div>

          <NewEquipmentForm
            showModal={showModal}
            setShowModal={setShowModal}
            handleInputChange={handleInputChange}
            equipment={equipForm}
            handleSubmit={handleSubmit}
            laboratories={laboratories}
          />
        </div>
      </div>
    </div>
  );
}
