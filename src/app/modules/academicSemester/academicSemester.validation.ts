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

    year: z.string({ required_error: 'Semester year is required' }),

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

/* update semester */
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitles] as [string, ...string[]], {
          required_error: 'Semester title is required',
        })
        .optional(),

      year: z
        .string({ required_error: 'Semester year is required' })
        .optional(),

      code: z
        .enum([...academicSemesterCodes] as [string, ...string[]], {
          required_error: 'Semester code is required',
        })
        .optional(),

      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'Semester start month is required',
        })
        .optional(),

      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'Semester end month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either provide both title or code neither provide any of them',
    }
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
