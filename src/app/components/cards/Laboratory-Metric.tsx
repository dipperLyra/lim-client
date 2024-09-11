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
    <div className={`${color} rounded-lg p-4 shadow-md`}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{total}</p>
    </div>
  );
};

export default LaboratoryMetricCard;
