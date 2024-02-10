// PopupMessagePayment.tsx

import React from "react";
import { useRouter } from "next/router";

interface PopupMessagePaymentProps {
  message: React.ReactNode;
  onClose: () => void;
}

const PopupMessagePayment: React.FC<PopupMessagePaymentProps> = ({
  message,
  onClose,
}) => {
  const router = useRouter();

  const handleClose = () => {
    // Navigasi kembali ke halaman pembayaran
    router.push("/payment");

    // Panggil fungsi onClose jika diperlukan
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-[720px]">
        {message}
        <button
          onClick={handleClose}
          className="mt-4 px-4 py-2 bg-[#25D366] text-white rounded-md hover:bg-[#22c55e] duration-300"
        >
          Tutup Popup
        </button>
      </div>
    </div>
  );
};

export default PopupMessagePayment;
