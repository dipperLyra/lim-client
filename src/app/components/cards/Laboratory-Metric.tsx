interface LaboratoryMetricCardProps {
  id: number;
  title: string;
  total: number;
  color: string;
}

const LaboratoryMetricCard = ({
  total,
  title,
  id,
  color,
}: LaboratoryMetricCardProps) => {
  return (
    <div
      className={`${color} rounded-lg p-4 shadow-md flex flex-col items-center`}
    >
      <h2 className="text-l text-[#14203d] font-semibold mb-2">{title}</h2>
      <p className="font-bold text-[#14203d] text-3xl text-center">{total}</p>
    </div>
  );
};

export default LaboratoryMetricCard;
