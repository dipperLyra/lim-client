interface ModalType {
  show: boolean;
  onClose: any;
  children: any;
}

import { useEffect } from "react";

export const Modal = ({ show, onClose, children }: ModalType) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-1/2 overflow-y-auto max-h-screen">
        <button className="text-red-500 float-right" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};
