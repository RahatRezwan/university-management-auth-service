import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.constant';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';

/* create faculty */
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...facultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(facultyData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty Created Successfully',
    data: result,
  });
});

/* get all faculties */
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicFaculty[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty Fetched Successfully',
    meta: result.meta,
    data: result.data,
  });
});

/* get single faculty */
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.getSingleFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty Fetched Successfully',
    data: result,
  });
});

/* update faculty */
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;
  const result = await AcademicFacultyService.updateFaculty(id, updatedData);

  sendResponse<IAcademicFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty Updated Successfully',
    data: result,
  });
});

/* Delete Faculty */
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.deleteFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty Deleted Successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
