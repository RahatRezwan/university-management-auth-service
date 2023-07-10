import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { FacultyController } from './userFaculty.controller';
import { FacultyValidation } from './userFaculty.validation';

const router = express.Router();

router.get('/', FacultyController.getAllFaculties);

/* get single faculty */
router.get('/:id', FacultyController.getSingleFaculty);

/* update faculty */
router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);

/* delete faculty */
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
