import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.model';
import { IFaculty } from '../userFaculty/userFaculty.interface';
import { UserFaculty } from '../userFaculty/userFaculty.model';
import { IStudent } from './../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyID, generateStudentID } from './user.utils';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  //default password
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  //set role
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  let newUserAllData = null;
  //start session
  const session = await mongoose.startSession();
  try {
    //start transaction
    session.startTransaction();
    //generate student id
    const id = await generateStudentID(academicSemester);
    user.id = id;
    student.id = id;

    //create student (new student will be an array)
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //set student _id into user
    user.student = newStudent[0]?._id;
    //create user
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    //commit transaction
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    //abort transaction
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData?.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    });
  }
  return newUserAllData;
};

/* create faculty */
const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  //default password
  if (!user.password) {
    user.password = config.default_faculty_password as string;
  }
  //set role
  user.role = 'faculty';

  let newUserAllData = null;
  //start session
  const session = await mongoose.startSession();
  try {
    //start transaction
    session.startTransaction();

    //generate faculty id
    const id = await generateFacultyID();
    user.id = id;
    faculty.id = id;

    //create faculty (new faculty will be an array)
    const newFaculty = await UserFaculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    //set faculty _id into user
    user.faculty = newFaculty[0]?._id;
    //create user
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //commit transaction
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    //abort transaction
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  newUserAllData = await User.findOne({ id: user.id }).populate({
    path: 'faculty',
    populate: [{ path: 'academicDepartment' }],
  });
  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
};
