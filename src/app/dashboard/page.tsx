import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';

export default function Dashboard() {
  
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Laboratories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Lab A</h2>
          <p className="text-gray-700">Location: Lagos</p>
          <Link href="/lab-details" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">View Details</Link>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2>Lab B</h2>
          <p className="text-gray-700">Location: Abuja</p>
          <Link href="/lab-details" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">View Details</Link>
        </div>
      </div>
    </main>
  );
}