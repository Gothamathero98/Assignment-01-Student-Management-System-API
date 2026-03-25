import { Router } from 'express';

const studentRouters = Router();

// Controllers
import studentController from '../controllers/studentController.js';
import {
  validateCreateStudent,
  validateUpdateStudent,
  validateGetStudentById,
  validateDeleteStudent,
  validatePagination
} from '../middleware/validation.js';

// Routes
studentRouters.post('/student-create', validateCreateStudent, studentController.createStudent);
studentRouters.get('/all-students', validatePagination, studentController.getAllStudents);
studentRouters.get('/student-get-one-student/:id', validateGetStudentById, studentController.getStudentById);
studentRouters.put('/student-update/:id', validateUpdateStudent, studentController.updateStudent);
studentRouters.delete('/student-delete/:id', validateDeleteStudent, studentController.deleteStudent);

export default studentRouters;