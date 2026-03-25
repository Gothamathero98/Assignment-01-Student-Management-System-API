import Student from '../models/Student.js';
class StudentService {
  async createStudent(studentData) {
    const student = new Student(studentData);
    return await student.save();
  }

  async getAllStudents(page = 1, limit = 10, search = '') {
    const skip = (page - 1) * limit;
    const query = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const students = await Student.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Student.countDocuments(query);

    return {
      students,
      total,
      page,
      pages: Math.ceil(total / limit)
    };
  }

  async getStudentById(id) {
    return await Student.findById(id);
  }

  async updateStudent(id, updateData) {
    return await Student.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  async deleteStudent(id) {
    return await Student.findByIdAndDelete(id);
  }
}

export default new StudentService();