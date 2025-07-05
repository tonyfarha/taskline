import { Task } from "@/types";
import ExcelJS from "exceljs";

export const exportToXLSX = async (tasks: Task[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("TasksLine");

  // Determine the date range of the timeline from the selected tasks
  if (tasks.length === 0) {
    console.log("No tasks to export.");
    return;
  }

  const startDates = tasks.map(t => new Date(t.startDate).getTime());
  const endDates = tasks.map(t => new Date(t.endDate).getTime());
  const minDate = new Date(Math.min(...startDates));
  const maxDate = new Date(Math.max(...endDates));

  const dates: Date[] = [];
  const currentDate = new Date(minDate);
  while (currentDate <= maxDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Create header row
  const headerRow = ["Task", ...dates.map(d => d.toLocaleDateString())];
  worksheet.addRow(headerRow);

  // Freeze the header row
  worksheet.views = [
    { state: 'frozen', xSplit: 1, ySplit: 1 },
  ];

  // Add task rows
  tasks.forEach(task => {
    const taskStart = new Date(task.startDate).getTime();
    const taskEnd = new Date(task.endDate).getTime();
    const row = [task.title];

    dates.forEach(date => {
      const cell = "";
      const date_ = new Date(date).getTime();
      if (date_ >= taskStart && date_ <= taskEnd) {
        row.push(cell);
      } else {
        row.push("");
      }
    });
    worksheet.addRow(row);

    // Color the cells
    const taskRow = worksheet.lastRow;
    if (taskRow) {
      dates.forEach((date, colIndex) => {
        const date_ = new Date(date).getTime();
        if (date_ >= taskStart && date_ <= taskEnd) {
          const cell = taskRow.getCell(colIndex + 2);
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: task.color.replace("#", "FF") },
          };
        }
      });
    }
  });

  // Save the workbook
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tasksline.xlsx";
  a.click();
  window.URL.revokeObjectURL(url);
};