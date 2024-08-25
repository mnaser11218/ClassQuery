import dayjs from 'dayjs';
import { IQuestion } from 'app/shared/model/question.model';

export interface ITag {
  id?: number;
  tagName?: string | null;
  tagDescription?: string | null;
  createdDate?: dayjs.Dayjs | null;
  labName?: string | null;
  labTopic?: string | null;
  questions?: IQuestion[] | null;
}

export const defaultValue: Readonly<ITag> = {};
