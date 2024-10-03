import { EquipmentType } from "@/libs/types/equip.type";
import { LabType } from "@/libs/types/lab.type";
import { Modal } from "../modals";
import { EquipmentStatusDropdown } from "../input/EquipmentStatusInput";
import { EquipmentLabDropdown } from "../input/EquipmentLabInput";

type NewEquipmentFormType = {
  showModal: boolean;
  setShowModal: any;
  handleSubmit: any;
  handleInputChange: any;
  equipment: EquipmentType;
  laboratories: LabType[];
};

export const NewEquipmentForm = ({
  showModal,
  setShowModal,
  handleSubmit,
  handleInputChange,
  equipment,
  laboratories,
}: NewEquipmentFormType) => {
  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <h1 className="text-xl font-bold">New Equipment</h1>
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
            value={equipment.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="serialNumber"
          >
            Serial/Production Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="serialNumber"
            type="text"
            name="serialNumber"
            value={equipment.serialNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            name="description"
            value={equipment.description}
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
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="comment"
            type="text"
            name="comment"
            value={equipment.comment}
            onChange={handleInputChange}
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
            value={equipment.manufacturer}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="model"
          >
            Model
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="model"
            type="text"
            name="model"
            value={equipment.model}
            onChange={handleInputChange}
            required
          />
        </div>

        <EquipmentStatusDropdown
          status={equipment.status}
          handleInputChange={handleInputChange}
        />

        <EquipmentLabDropdown
          labId={equipment.labId}
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
