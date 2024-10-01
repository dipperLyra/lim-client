import { Modal } from "../modals";
import { EquipmentLabDropdown } from "../input/EquipmentLabInput";
import { LabType } from "@/libs/types/lab.type";
import { UserType } from "@/libs/types/user.type";

type NewUserFormProps = {
  user: UserType;
  showModal: boolean;
  setShowModal: any;
  handleSubmit: any;
  handleInputChange: any;
  laboratories: LabType[];
};

export const NewUserForm = ({
  showModal,
  setShowModal,
  handleSubmit,
  handleInputChange,
  user,
  laboratories,
}: NewUserFormProps) => {
  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <h1 className="text-xl font-bold">New User Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={user.password}
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
