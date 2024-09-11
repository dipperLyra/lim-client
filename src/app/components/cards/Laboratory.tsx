import Link from "next/link";

interface LaboratoryCardProps {
    id: number;
    name: string;
    location: string;
}

const LaboratoryCard = ({ name, location, id }: LaboratoryCardProps) => {
    return (
      <div className="bg-white rounded-lg p-4 shadow-md flex justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <Link href={`/labs/${id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            View Details
          </Link>
        </div>
      </div>
    );
  };
  
export default LaboratoryCard;