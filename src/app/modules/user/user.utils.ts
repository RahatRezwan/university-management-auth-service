/* eslint-disable no-undefined */
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

//generate user id
const findLastStudentId = async () => {
  const lastUser = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id && lastUser?.id.substring(4);
};

export const generateStudentID = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId = (await findLastStudentId()) || '0';
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementedId}`;
  return incrementedId;
};

/* generate faculty id */
const findLastFacultyId = async () => {
  const lastUser = await User.findOne(
    {
      role: 'faculty',
    },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id && lastUser?.id.substring(2);
};

export const generateFacultyID = async (): Promise<string> => {
  const currentId = (await findLastFacultyId()) || '0';
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};
