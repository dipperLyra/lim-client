import { Modal } from "../modals";
import { ReagentType } from "@/libs/types/reagent.type";
import { EquipmentLabDropdown } from "../input/EquipmentLabInput";
import { LabType } from "@/libs/types/lab.type";

type NewReagentFormType = {
  reagent: ReagentType;
  showModal: boolean;
  setShowModal: any;
  handleSubmit: any;
  handleInputChange: any;
  laboratories: LabType[];
};

export const NewReagentForm = ({
  showModal,
  setShowModal,
  handleSubmit,
  handleInputChange,
  reagent,
  laboratories,
}: NewReagentFormType) => {
  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <h1 className="text-xl font-bold">Setup Metric</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={reagent.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="manufacturer"
          >
            Manufacturer
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="manufacturer"
            type="text"
            name="manufacturer"
            value={reagent.manufacturer}
            onChange={handleInputChange}
            required
          />
        </div>

        <EquipmentLabDropdown
          laboratories={laboratories}
          handleInputChange={handleInputChange}
        />

        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mb-4 rounded">
          Submit
        </button>
      </form>
    </Modal>
  );
};
