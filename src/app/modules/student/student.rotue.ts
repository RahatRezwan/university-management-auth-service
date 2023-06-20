import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();

/* get students */
router.get('/', StudentController.getAllStudents);

/* get single student */
router.get('/:id', StudentController.getSingleStudent);

/* update student */
router.patch('/:id', StudentController.updateStudent);

/* delete student */
router.delete('/:id', StudentController.deleteStudent);

/* router.patch(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
); */

export const StudentRoutes = router;
