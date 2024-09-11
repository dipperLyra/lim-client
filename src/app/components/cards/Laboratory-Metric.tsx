interface LaboratoryMetricCardProps {
  id: number;
  title: string;
  total: number;
}

const LaboratoryMetricCard = ({
  total,
  title,
  id,
}: LaboratoryMetricCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md ">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{total}</p>
    </div>
  );
};

export default LaboratoryMetricCard;
