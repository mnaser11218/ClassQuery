import dayjs from 'dayjs';

export interface IUserProfile {
  id?: number;
  name?: string;
  emailAddress?: string | null;
  aboutMe?: string | null;
  created?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<IUserProfile> = {};
