import Link from "next/link";

interface LaboratoryCardProps {
  id: number;
  name: string;
  location: string;
}

const LaboratoryCard = ({ name, location, id }: LaboratoryCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
        {name}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{location}</p>

      <Link
        href={`/equipment/all?labId=${id}&laboratory=${name}`}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        View Details
      </Link>
    </div>
  );
};

export default LaboratoryCard;
