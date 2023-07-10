import { Model, Types } from 'mongoose';
import { IBloodGroup, IGender, IUserName } from '../../../interfaces/common';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type IFaculty = {
  id: string;
  name: IUserName; //embedded object
  profileImage: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender?: IGender;
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup?: IBloodGroup;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  designation: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: IGender;
  bloodGroup?: IBloodGroup;
  academicDepartment?: string;
  academicFaculty?: string;
  designation?: string;
};
