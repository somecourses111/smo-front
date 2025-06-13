import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const exportToExcel = (data, fileName) => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Convert JSON data to a worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Generate a file and trigger a download
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, `${fileName}.xlsx`);
};

export default exportToExcel;