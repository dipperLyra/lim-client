interface EquipmentProps {
  equipment: {
    name: string;
    status: string;
    comment: string;
    model?: string;
  };
}
export default function EquipmentCard({ equipment }: EquipmentProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto my-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{equipment.name}</h2>
      <p className="text-sm text-gray-500 mb-4">Model: {equipment?.model}</p>

      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-gray-400">Status:</span>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full
          ${equipment.status === "functional" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
        >
          {equipment.status}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-400">Comment:</p>
        <p className="text-sm text-gray-600">
          {equipment.comment || "No comments available"}
        </p>
      </div>
    </div>
  );
}
