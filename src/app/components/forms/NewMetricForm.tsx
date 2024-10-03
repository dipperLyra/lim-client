import { Modal } from "../modals";
import { MetricType } from "@/libs/types/metric.type";
import { MetricTypeDropdown } from "../input/MetricTypeInput";

type NewMetricFormType = {
  metric: MetricType;
  showModal: boolean;
  setShowModal: any;
  handleSubmit: any;
  handleInputChange: any;
};

export const NewMetricForm = ({
  showModal,
  setShowModal,
  handleSubmit,
  handleInputChange,
  metric,
}: NewMetricFormType) => {
  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <h1 className="text-xl font-bold dark:text-gray-200">Setup Metric</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={metric.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="symbol"
          >
            Symbol
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="symbol"
            type="text"
            name="symbol"
            value={metric.symbol}
            onChange={handleInputChange}
            required
          />
        </div>
        <MetricTypeDropdown
          type={metric.type as string}
          handleInputChange={handleInputChange}
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mb-4 rounded">
          Submit
        </button>
      </form>
    </Modal>
  );
};
