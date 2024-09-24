interface EquipmentFormProps {
  type: string;
  handleInputChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const MetricTypeDropdown: React.FC<EquipmentFormProps> = ({
  type,
  handleInputChange,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="metricType"
      >
        Metric Type
      </label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="metricType"
        name="type"
        value={type}
        onChange={handleInputChange}
      >
        <option value="">Select a metric type</option>
        <option value="volume">Volume</option>
        <option value="weight">Weight</option>
      </select>
    </div>
  );
};
