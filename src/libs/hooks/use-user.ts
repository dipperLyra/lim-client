"use client";

import { useState, useEffect } from "react";

import { UserType } from "../types/user.type";

const useUser = () => {
  const [users, setUsers] = useState<UserType[]>();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users/`, {
          credentials: "include",
        });
        const data = await response.json();
        setUsers(data.users);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchLabs();
  }, []);

  return { users, error };
};

export default useUser;
