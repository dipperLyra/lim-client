import { useState, useEffect } from "react";

import { EquipmentType } from "@/libs/types/equip.type";

const useEquipment = () => {
  const [equipment, setEquipment] = useState<EquipmentType[]>([]);
  const [isFetch, setIsFetch] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/equipment/`,
        );
        const data = await response.json();
        const formattedData = data.map((equipment: EquipmentType) => ({
          name: equipment.name,
          status: equipment.status,
          description: equipment.description,
          manufacturer: equipment.manufacturer,
          model: equipment.model,
          serialNumber: equipment.serialNumber,
          comment: equipment.comment,
        }));
        setEquipment(formattedData);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchEquipment();
  }, [isFetch]);

  return { equipment, isFetch, setIsFetch, error };
};

export default useEquipment;
