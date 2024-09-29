import { ReagentStatus } from "@/libs/types/reagent.type";

interface ReagentProps {
  name: string;
  status: string;
  manufacturer?: string;
  comment: string;
  model?: string;
}
export default function ReagentCard({
  name,
  status,
  manufacturer,
  comment,
}: ReagentProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm  my-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
      <p className="text-sm text-gray-500 mb-4">Manufacturer: {manufacturer}</p>

      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-gray-400">Status:</span>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full
          ${getStatusClasses(status as ReagentStatus)}`}
        >
          {status}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-400">Comment:</p>
        <p className="text-sm text-gray-600">
          {comment ?? "No comments available"}
        </p>
      </div>
    </div>
  );
}

const getStatusClasses = (status: ReagentStatus) => {
  switch (status) {
    case "expired":
      return "bg-red-500 text-white";
    case "out_of_stock":
      return "bg-red-500 text-white";
    case "in_stock":
      return "bg-green-500 text-white";
    case "ordered":
      return "bg-amber-500 text-white";
    default:
      return "";
  }
};
