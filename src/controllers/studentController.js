import studentService from '../services/studentService.js'; 


class StudentController {
  async createStudent(req, res, next) {
    try {
      const student = await studentService.createStudent(req.body);
      res.status(201).json({
        success: true,
        data: student,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllStudents(req, res, next) {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const result = await studentService.getAllStudents(parseInt(page), parseInt(limit), search);
      res.status(200).json({
        success: true,
        data: result.students,
        pagination: {
          page: result.page,
          limit: parseInt(limit),
          total: result.total,
          pages: result.pages
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getStudentById(req, res, next) {
    try {
      const student = await studentService.getStudentById(req.params.id);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found...'
        });
      }
      res.status(200).json({
        success: true,
        data: student
      });
    } catch (error) {
      next(error);
    }
  }

  async updateStudent(req, res, next) {
    try {
      const student = await studentService.updateStudent(req.params.id, req.body);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found...'
        });
      }
      res.status(200).json({
        success: true,
        data: student
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteStudent(req, res, next) {
    try {
      const student = await studentService.deleteStudent(req.params.id);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found...'
        });
      }
      res.status(200).json({
        success: true,
        message: 'Student deleted successfully...'
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new StudentController();