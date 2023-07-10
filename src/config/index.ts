import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_student_password: process.env.DEFAULT_STUDENT_PASS,
  default_faculty_password: process.env.DEFAULT_FACULTY_PASS,
  default_admin_password: process.env.DEFAULT_ADMIN_PASS,
};
