import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constant';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';

/* get all students */
const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students Fetched Successfully',
    meta: result.meta,
    data: result.data,
  });
});

/* get single Student */
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.getSingleStudent(id);

  sendResponse<IStudent>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Student Fetched Successfully',
    data: result,
  });
});

/* update Student */
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;
  const result = await StudentService.updateStudent(id, updatedData);

  sendResponse<IStudent>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student Updated Successfully',
    data: result,
  });
});

/* Delete Student */
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.deleteStudent(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student Deleted Successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
