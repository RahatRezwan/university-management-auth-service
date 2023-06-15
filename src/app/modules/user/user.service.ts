import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateID } from './user.utils';

const createUserToDB = async (user: IUser): Promise<IUser | null> => {
  //auto generated incremental id
  const id = await generateID();
  user.id = id;
  //default password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user');
  }
  return createdUser;
};

export const UserService = {
  createUserToDB,
};
