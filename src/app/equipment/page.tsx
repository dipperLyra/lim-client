"use client";

import React, { useState, useEffect } from "react";

import DashboardHeader from "../components/Header";

import { toast } from "react-toastify";
import { EquipmentType } from "@/libs/types/equip.type";
import Link from "next/link";
import { Modal } from "../components/modals";
import { EquipmentStatusDropdown } from "../components/input/EquipmentStatusInput";
import { EquipmentLabDropdown } from "../components/input/EquipmentLabInput";
import { LabType } from "@/libs/types/lab.type";
import SidePanel2 from "../components/SidePanel2";

export default function Equipment() {
  const [equip, setEquip] = useState<EquipmentType[]>([]);
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
  const [laboratories, setLaboratories] = useState<LabType[]>([]);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isFetch, setIsFetch] = useState(false);

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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/equipment/`)
      .then((response) => response.json())
      .then((data) => {
        const arr: EquipmentType[] = [];
        data.map((equipment: EquipmentType) => {
          arr.push({
            name: equipment.name,
            status: equipment.status,
            description: equipment.description,
            manufacturer: equipment.manufacturer,
            model: equipment.model,
            serialNumber: equipment.serialNumber,
            comment: equipment.comment,
          });
        });
        setEquip(arr);
      });

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
              {equip.map((equip, index) => (
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

type NewEquipmentFormType = {
  showModal: boolean;
  setShowModal: any;
  handleSubmit: any;
  handleInputChange: any;
  equipment: EquipmentType;
  laboratories: LabType[];
};

const NewEquipmentForm = ({
  showModal,
  setShowModal,
  handleSubmit,
  handleInputChange,
  equipment,
  laboratories,
}: NewEquipmentFormType) => {
  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <h1 className="text-xl font-bold">New Equipments</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={equipment.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="serialNumber"
          >
            Serial/Production Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="serialNumber"
            type="text"
            name="serialNumber"
            value={equipment.serialNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            name="description"
            value={equipment.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="comment"
          >
            Comment
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="comment"
            type="text"
            name="comment"
            value={equipment.comment}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="manufacturer"
          >
            Manufacturer
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="manufacturer"
            type="text"
            name="manufacturer"
            value={equipment.manufacturer}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="model"
          >
            Model
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="model"
            type="text"
            name="model"
            value={equipment.model}
            onChange={handleInputChange}
            required
          />
        </div>

        <EquipmentStatusDropdown
          status={equipment.status}
          handleInputChange={handleInputChange}
        />

        <EquipmentLabDropdown
          labId={equipment.labId}
          laboratories={laboratories}
          handleInputChange={handleInputChange}
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mb-4 rounded">
          Submit
        </button>
      </form>
    </Modal>
  );
};
