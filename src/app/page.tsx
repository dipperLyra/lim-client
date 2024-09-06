"use client"

import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (data.token) {
        router.push("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center mb-12">
        <Image
          src="/bloom-logo.png"
          alt="Bloom Logo"
          width={100}
          height={24}
          priority
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full max-w-md p-8 lg:p-12 border border-gray-300 rounded-lg"
      >
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg"
        >
          Login
        </button>
      </form>
    </main>
  );
}
