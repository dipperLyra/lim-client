import { ReagentType } from "@/libs/types/reagent.type";

interface EquipmentFormProps {
  reagents: ReagentType[];
  handleInputChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ReagentDropdown: React.FC<EquipmentFormProps> = ({
  reagents,
  handleInputChange,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        htmlFor="reagent"
      >
        Reagent
      </label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="reagent"
        name="reagentId"
        onChange={handleInputChange}
      >
        <option value="">Select a reagent</option>
        {reagents.map((reagent) => {
          return <option value={reagent?.id}>{reagent.name}</option>;
        })}
      </select>
    </div>
  );
};
