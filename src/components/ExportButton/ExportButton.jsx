import React from "react";
import { exportExcel } from "../../utils/excelExport";
import { BsDownload } from "react-icons/bs";



const ExportButton = ({ data, filename }) => {
  return (
    <button
      onClick={() => exportExcel(data, filename)}
      className="p-3 w-[150px] mt-4 bg-gray-700 rounded-md flex items-center justify-center"
    >
      <p className="mr-2  text-white">Yuklab olish</p>
      <BsDownload className="fill-white"/>
    </button>
  );
};

export default ExportButton;
