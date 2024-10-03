import { MetricType } from "@/libs/types/metric.type";

interface EquipmentFormProps {
  metrics: MetricType[];
  handleInputChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const MetricLabDropdown: React.FC<EquipmentFormProps> = ({
  metrics,
  handleInputChange,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        htmlFor="metric"
      >
        Metric
      </label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="metric"
        name="metricId"
        onChange={handleInputChange}
      >
        <option value="">Select a metric type</option>
        {metrics.map((metric) => {
          return (
            <option value={metric?.id}>
              {metric.name} ({metric.symbol})
            </option>
          );
        })}
      </select>
    </div>
  );
};
