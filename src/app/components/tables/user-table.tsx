import { UserType } from "@/libs/types/user.type";
import Link from "next/link";

type UserTableProps = {
  users: UserType[];
};

export default function UserTable({ users }: UserTableProps) {
  return (
    <table className="w-full border-collapse border border-gray-200">
      <thead className="bg-gray-200 dark:bg-gray-700">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider">
            S/N
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border border-gray-200">{index + 1}</td>
            <td className="px-4 py-2 border border-gray-200">
              {user.firstName} {user.lastName}
            </td>
            <td
              className={`px-4 py-2 border border-gray-200 ${user.isActive ? "text-green-500" : "text-red-500"} `}
            >
              {user.isActive ? "active" : "disabled"}
            </td>
            <td className="px-4 py-2 border border-gray-200">
              <Link
                href={`#`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
