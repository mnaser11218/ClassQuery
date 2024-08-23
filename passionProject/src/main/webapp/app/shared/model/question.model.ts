import dayjs from 'dayjs';
import { ITag } from 'app/shared/model/tag.model';
import { IAnswer } from 'app/shared/model/answer.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';

export interface IQuestion {
  id?: number;
  title?: string | null;
  question?: string | null;
  createdDate?: dayjs.Dayjs | null;
  tags?: ITag[] | null;
  answers?: IAnswer[] | null;
  userProfile?: IUserProfile | null;
}

export const defaultValue: Readonly<IQuestion> = {};
