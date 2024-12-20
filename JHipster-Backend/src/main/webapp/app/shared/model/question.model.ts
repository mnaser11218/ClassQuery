import dayjs from 'dayjs';
import { ITag } from 'app/shared/model/tag.model';
import { IAssignment } from 'app/shared/model/assignment.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';

export interface IQuestion {
  id?: number;
  title?: string | null;
  question?: string | null;
  liked?: number | null;
  createdDate?: dayjs.Dayjs | null;
  tags?: ITag[] | null;
  assignment?: IAssignment | null;
  userProfile?: IUserProfile | null;
}

export const defaultValue: Readonly<IQuestion> = {};
