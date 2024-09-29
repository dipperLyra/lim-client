import { Modal } from "../modals";

import { MetricLabDropdown } from "../input/MetricLabInput";
import { MetricType } from "@/libs/types/metric.type";
import { ReagentReportType, ReagentType } from "@/libs/types/reagent.type";
import { ReagentDropdown } from "../input/ReagentInput";

type NewReagentReportFormType = {
  report: ReagentReportType;
  showModal: boolean;
  setShowModal: any;
  handleSubmit: any;
  handleInputChange: any;
  metrics: MetricType[];
  reagents: ReagentType[];
  reagentId: number;
  metricId: number;
};

export const NewReagentReportForm = ({
  showModal,
  setShowModal,
  handleSubmit,
  handleInputChange,
  report,
  reagentId,
  metricId,
  metrics,
  reagents,
}: NewReagentReportFormType) => {
  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <h1 className="text-xl font-bold">New Reagent Report Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="number"
            name="quantity"
            value={report.quantity}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="comment"
          >
            Comment
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="comment"
            name="comment"
            value={report.comment}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="purchaseDate"
          >
            Purchased Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="purchaseDate"
            type="date"
            name="purchaseDate"
            value={report.purchaseDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="expiryDate"
          >
            Expiry Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="expiryDate"
            type="date"
            name="expiryDate"
            value={report.expiryDate}
            onChange={handleInputChange}
            required
          />
        </div>

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
            value={report.status}
            onChange={handleInputChange}
            required
          >
            <option value="in_stock">In Stock</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="expired">Expired</option>
            <option value="ordered">Ordered</option>
          </select>
        </div>

        <MetricLabDropdown
          metrics={metrics}
          handleInputChange={handleInputChange}
        />

        <ReagentDropdown
          reagents={reagents}
          handleInputChange={handleInputChange}
        />

        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mb-4 rounded">
          Submit
        </button>
      </form>
    </Modal>
  );
};
