import dayjs from 'dayjs';
import { ITag } from 'app/shared/model/tag.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { IAssignment } from 'app/shared/model/assignment.model';

export interface IQuestion {
  id?: number;
  title?: string | null;
  question?: string | null;
  createdDate?: dayjs.Dayjs | null;
  tags?: ITag[] | null;
  userProfile?: IUserProfile | null;
  assignment?: IAssignment | null;
}

export const defaultValue: Readonly<IQuestion> = {};
