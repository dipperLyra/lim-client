import { StatusType } from "@/libs/types/equip.type";

interface EquipmentFormProps {
  status: string;
  handleInputChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const EquipmentStatusDropdown: React.FC<EquipmentFormProps> = ({
  status,
  handleInputChange,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="status"
      >
        Status
      </label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="status"
        name="status"
        value={status}
        onChange={handleInputChange}
      >
        <option value="">Select a status</option>
        <option value="functional">Functional</option>
        <option value="non-functional">Non-functional</option>
      </select>
    </div>
  );
};
