import dayjs from 'dayjs';
import { IQuestion } from 'app/shared/model/question.model';

export interface IAnswer {
  id?: number;
  answer?: string | null;
  createdDate?: dayjs.Dayjs | null;
  question?: IQuestion | null;
}

export const defaultValue: Readonly<IAnswer> = {};
