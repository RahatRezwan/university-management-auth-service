import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';
const router = express.Router();

/* get students */
router.get('/', StudentController.getAllStudents);

/* get single student */
router.get('/:id', StudentController.getSingleStudent);

/* update student */
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

/* delete student */
router.delete('/:id', StudentController.deleteStudent);

/* router.patch(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
); */

export const StudentRoutes = router;
