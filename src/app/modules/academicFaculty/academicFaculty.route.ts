import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFaculty
);

/* get all faculties */
router.get('/', AcademicFacultyController.getAllFaculties);

/* get single faculty */
router.get('/:id', AcademicFacultyController.getSingleFaculty);

/* update faculty */
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateFaculty
);

/* Delete a faculty */
router.delete('/:id', AcademicFacultyController.deleteFaculty);

export const AcademicFacultyRoutes = router;
