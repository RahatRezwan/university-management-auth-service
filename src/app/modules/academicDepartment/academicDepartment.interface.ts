import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type AcademicDepartmentModel = Model<IAcademicDepartment, object>;

export type IAcademicDepartmentFiltersRequest = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId | IAcademicFaculty;
};
