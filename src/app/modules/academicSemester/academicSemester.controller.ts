import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...semesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(semesterData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester Created Successfully',
      data: result,
    });

    next();
  }
);

export const AcademicSemesterController = {
  createSemester,
};
