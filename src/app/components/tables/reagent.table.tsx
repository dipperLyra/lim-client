import { formatString } from "@/libs/helpers/string.helper";
import { ReagentReportTableType } from "@/libs/types/reagent.type";
import Link from "next/link";

type ReagentTableProps = {
  reports: ReagentReportTableType[];
};

export default function ReagentTable({ reports }: ReagentTableProps) {
  return (
    <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-2 border border-gray-200 bg-gray-100 text-left">
            S/N
          </th>
          <th className="px-4 py-2 border border-gray-200 bg-gray-100 text-left">
            Name
          </th>
          <th className="px-4 py-2 border border-gray-200 bg-gray-100 text-left">
            Status
          </th>
          <th className="px-4 py-2 border border-gray-200 bg-gray-100 text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {reports?.map((report, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border border-gray-200">{index + 1}</td>
            <td className="px-4 py-2 border border-gray-200">{report.name}</td>
            <td className="px-4 py-2 border border-gray-200">
              {formatString(report.status)}
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
