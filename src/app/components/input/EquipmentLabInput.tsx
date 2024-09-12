interface LabType {
  id: number;
  name: string;
}

interface EquipmentFormProps {
  laboratories: LabType[];
  handleInputChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  labId?: string;
}

export const EquipmentLabDropdown: React.FC<EquipmentFormProps> = ({
  laboratories,
  handleInputChange,
  labId,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="lab"
      >
        Laboratory
      </label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="lab"
        name="labId"
        onChange={handleInputChange}
      >
        <option value="">Select a Laboratory</option>
        {laboratories.map((lab: LabType) => (
          <option value={lab.id}>{lab.name}</option>
        ))}
      </select>
    </div>
  );
};
