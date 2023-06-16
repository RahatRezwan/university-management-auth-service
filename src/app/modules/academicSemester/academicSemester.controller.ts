import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

/* create Semester */
const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...semesterData } = req.body;
  const result = await AcademicSemesterService.createSemester(semesterData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});

/* get all semester */
const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicSemester[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Semester Fetched Successfully',
    meta: result.meta,
    data: result.data,
  });
});

/* get single semester */
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicSemesterService.getSingleSemester(id);

  sendResponse<IAcademicSemester>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Semester Fetched Successfully',
    data: result,
  });
});

/* update semester */
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;
  const result = await AcademicSemesterService.updateSemester(id, updatedData);

  sendResponse<IAcademicSemester>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Semester Updated Successfully',
    data: result,
  });
});

/* Delete Semester */
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicSemesterService.deleteSemester(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Semester Deleted Successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
