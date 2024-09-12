"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardHeader from "../components/Header";
import SidePanel from "../components/SidePanel";
import { LabType } from "@/libs/types/lab.type";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import LaboratoryCard from "../components/cards/Laboratory";

export default function LabSetup() {
  const [labDetails, setLabDetails] = useState({
    name: "",
    address: "",
    state: "",
    country: "",
  });

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
      })
      .catch((error) => {
        toast.error("Error creating lab: " + error.message);
      });
  };

  const [labs, setLabs] = useState<LabType[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const router = useRouter();

  const handleSidePanelToggle = () => {
    setSidePanelOpen(!sidePanelOpen);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/lab/`)
      .then((response) => response.json())
      .then((data) => {
        setLabs(data.labs);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <div className="flex h-screen bg-gray-100">
        {/* Side Panel for larger screens */}
        <div className="hidden md:block w-64">
          <SidePanel />
        </div>

        {/* Side Panel for mobile screens */}
        <div
          className={`md:hidden fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${sidePanelOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4">
            <button
              onClick={handleSidePanelToggle}
              className="absolute top-4 right-4"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
            <SidePanel />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Laboratories</h1>
                <button onClick={handleSidePanelToggle} className="md:hidden">
                  <Menu className="h-6 w-6 text-gray-600" />
                </button>
              </div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {labs.map((lab) => (
                    <LaboratoryCard
                      key={lab.id}
                      id={lab.id}
                      name={lab.name}
                      location={`${lab.state}`}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="border-b border-gray-200"></div>
            <div className="w-full md:w-1/2 ">
              <div className="container mx-auto p-4">
                <h1 className="text-xl font-bold">New Lab</h1>
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
                      value={labDetails.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="address"
                    >
                      Address
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="address"
                      type="text"
                      name="address"
                      value={labDetails.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="state"
                    >
                      State
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="state"
                      type="text"
                      name="state"
                      value={labDetails.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="country"
                    >
                      Country
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              </div>
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}
