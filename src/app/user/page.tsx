"use client";

import React, { useState } from "react";

import DashboardHeader from "../components/Header";

import SidePanel from "../components/SidePanel2";
import useUser from "@/libs/hooks/use-user";
import UserTable from "../components/tables/user-table";
import { NewUserForm } from "../components/forms/NewUserForm";
import useLab from "@/libs/hooks/use-lab";
import { UserType } from "@/libs/types/user.type";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { users } = useUser();
  const { laboratories } = useLab();

  const [showModal, setShowModal] = useState(false);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [userForm, setUserForm] = useState<UserType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    labId: 0,
  });

  const handleSidePanelToggle = () => {
    setSidePanelOpen(!sidePanelOpen);
  };

  const handleInputChange = (e: any) => {
    setUserForm((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData: UserType = {
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      email: userForm.email,
      password: userForm.password,
      labId: userForm.labId,
    };

    fetch(`${process.env.NEXT_PUBLIC_API}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        setUserForm({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setShowModal(false);
      })
      .catch((error) => {
        toast.error("Error creating user: " + error.message);
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mb-4 rounded"
            onClick={() => setShowModal(true)}
          >
            New User
          </button>
          <h2 className="text-lg font-bold mb-4">Users</h2>
          <UserTable users={users!} />

          <NewUserForm
            showModal={showModal}
            setShowModal={setShowModal}
            handleInputChange={handleInputChange}
            user={userForm}
            laboratories={laboratories}
            handleSubmit={handleSubmit}
          />
        </main>
      </div>
    </div>
  );
}
