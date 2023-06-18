import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

/* create Department */
const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body;
  const result = await AcademicDepartmentService.createDepartment(
    departmentData
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department Created Successfully',
    data: result,
  });
});

/* get all Departments */
const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AcademicDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicDepartment[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department Fetched Successfully',
    meta: result.meta,
    data: result.data,
  });
});

/* get single Department */
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.getSingleDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department Fetched Successfully',
    data: result,
  });
});

/* update Department */
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updatedData
  );

  sendResponse<IAcademicDepartment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department Updated Successfully',
    data: result,
  });
});

/* Delete Department */
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.deleteDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department Deleted Successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
