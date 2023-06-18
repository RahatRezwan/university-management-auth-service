import { z } from 'zod';

const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Faculty title is required' }),
  }),
});

const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Faculty title is required' }).optional(),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
};
