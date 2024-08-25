import dayjs from 'dayjs';

export interface IAssignment {
  id?: number;
  name?: string;
  topic?: string | null;
  courseName?: string | null;
  description?: string | null;
  created?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<IAssignment> = {};
