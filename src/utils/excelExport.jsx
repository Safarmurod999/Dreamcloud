import * as XLSX from "xlsx";
const { read, utils } = XLSX;

export const exportExcel = (data, filename) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, worksheet, "Orders");
  XLSX.utils.sheet_add_aoa(worksheet, [["Id"]]);
  XLSX.writeFileXLSX(wb, `${filename}.xlsx`);
};
