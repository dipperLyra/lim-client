"use client"
import { useState } from "react";
import { toast } from 'react-toastify';
import DashboardHeader from "../components/Header";

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

    console.log(formData)
  
    fetch(`${process.env.NEXT_PUBLIC_API}/lab/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
      toast.success('Lab created successfully!');
      setLabDetails({ name: "", address: "", state: "", country: "" })
    })
    .catch((error) => {
      toast.error('Error creating lab: ' + error.message);
    });
  };

  return (
    <main>
      <DashboardHeader />
      <div className=" w-full md:w-1/2 mx-4">
        <h1 className="text-3xl font-bold mb-4">Lab Setup</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
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
    </main>
  );
}