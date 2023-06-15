import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...semesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(semesterData);
    res.status(200).json({
      success: true,
      message: 'Semester Created Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createSemester,
};
