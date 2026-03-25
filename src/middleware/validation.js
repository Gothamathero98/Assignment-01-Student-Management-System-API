import { body, param, query, validationResult } from 'express-validator';


export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed...',
      errors: errors.array()
    });
  }
  next();
};

export const validateCreateStudent = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters...'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email...'),
  body('age')
    .isInt({ min: 16, max: 100 })
    .withMessage('Age must be between 16 and 100...'),
  body('course')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Course must be between 2 and 100 characters...'),
  handleValidationErrors
];

export const validateUpdateStudent = [
  param('id')
    .isMongoId()
    .withMessage('Invalid student ID...'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters...'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email...'),
  body('age')
    .optional()
    .isInt({ min: 16, max: 100 })
    .withMessage('Age must be between 16 and 100...'),
  body('course')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Course must be between 2 and 100 characters...'),
  handleValidationErrors
];

export const validateGetStudentById = [
  param('id')
    .isMongoId()
    .withMessage('Invalid student ID...'),
  handleValidationErrors
];

export const validateDeleteStudent = [
  param('id')
    .isMongoId()
    .withMessage('Invalid student ID...'),
  handleValidationErrors
];

export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer...'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100...'),
  query('search')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Search query too long...'),
  handleValidationErrors
];

