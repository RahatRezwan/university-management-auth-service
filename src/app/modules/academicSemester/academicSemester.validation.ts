import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Semester title is required',
    }),

    year: z.number({ required_error: 'Semester year is required' }),

    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: 'Semester code is required',
    }),

    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Semester start month is required',
    }),

    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Semester end month is required',
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
