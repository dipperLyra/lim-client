"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardHeader from "../components/Header";
import { Modal } from "../components/modals";
import LaboratoryCard from "../components/cards/Laboratory";
import SidePanel from "../components/SidePanel2";
import useLab from "@/libs/hooks/use-lab";

export default function LabSetup() {
  const [labDetails, setLabDetails] = useState({
    name: "",
    address: "",
    state: "",
    country: "",
  });
  const { laboratories } = useLab();
  const [isFetch, setIsFetch] = useState(false);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSidePanelToggle = () => {
    setSidePanelOpen(!sidePanelOpen);
  };

  const handleInputChange = (e: any) => {
    setLabDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = {
      name: labDetails.name,
      address: labDetails.address,
      state: labDetails.state,
      country: labDetails.country,
    };

    fetch(`${process.env.NEXT_PUBLIC_API}/lab/`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Lab created successfully!");
        setLabDetails({ name: "", address: "", state: "", country: "" });
        setShowModal(false);
        setIsFetch(true);
      })
      .catch((error) => {
        toast.error("Error creating lab: " + error.message);
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="lg:w-64">
        <SidePanel isOpen={sidePanelOpen} togglePanel={handleSidePanelToggle} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <DashboardHeader />
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Laboratories</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {laboratories?.map((lab) => (
              <LaboratoryCard
                key={lab.id}
                id={lab.id}
                name={lab.name}
                location={`${lab.state}`}
              />
            ))}
          </div>

          {/* Button to trigger modal */}
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowModal(true)}
            >
              New Lab
            </button>
          </div>

          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <h1 className="text-xl font-bold dark:text-gray-200">New Lab</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={labDetails.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  type="text"
                  name="address"
                  value={labDetails.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  htmlFor="state"
                >
                  State
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="state"
                  type="text"
                  name="state"
                  value={labDetails.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  htmlFor="country"
                >
                  Country
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="country"
                  type="text"
                  name="country"
                  value={labDetails.country}
                  onChange={handleInputChange}
                />
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mb-4 rounded">
                Submit
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
}
