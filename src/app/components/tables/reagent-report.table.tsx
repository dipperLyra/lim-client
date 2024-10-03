import { formatDate } from "@/libs/helpers/date.helper";
import { formatString } from "@/libs/helpers/string.helper";
import {
  ReagentReportTableType,
  ReagentStatus,
} from "@/libs/types/reagent.type";

type ReagentReportTableProps = {
  reports: ReagentReportTableType[];
};

export default function ReagentReportTable({
  reports,
}: ReagentReportTableProps) {
  return (
    <table className="w-full table-auto divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
      <thead className="bg-gray-200 dark:bg-gray-700">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider"
          >
            Laboratory
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider"
          >
            Status
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider"
          >
            Expiry Date
          </th>
        </tr>
      </thead>
      <tbody>
        {reports?.map((report, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border border-gray-200">
              {report.laboratory}
            </td>
            <td className="px-4 py-2 border border-gray-200">{report.name}</td>
            <td
              className={`px-4 py-2 border border-gray-200 ${getStatusClasses(report.status as ReagentStatus)}`}
            >
              {formatString(report.status)}
            </td>
            <td className="px-4 py-2 border border-gray-200">
              {formatDate(report.expiryDate.toString())}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const getStatusClasses = (status: ReagentStatus) => {
  switch (status) {
    case "expired":
      return "bg-red-500 text-white rounded-full";
    case "out_of_stock":
      return "bg-red-500 text-white rounded-full";
    case "in_stock":
      return "bg-green-500 text-white rounded-full";
    case "ordered":
      return "bg-amber-500 text-white rounded-full";
    default:
      return "";
  }
};
