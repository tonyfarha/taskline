export type Task = {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  color: string;
  userId?: string;
};
