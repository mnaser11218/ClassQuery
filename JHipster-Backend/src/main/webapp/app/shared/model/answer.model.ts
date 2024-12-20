import dayjs from 'dayjs';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { IQuestion } from 'app/shared/model/question.model';

export interface IAnswer {
  id?: number;
  answer?: string | null;
  liked?: number | null;
  createdDate?: dayjs.Dayjs | null;
  userProfile?: IUserProfile | null;
  question?: IQuestion | null;
}

export const defaultValue: Readonly<IAnswer> = {};
