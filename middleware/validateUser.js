const { body, validationResult } = require('express-validator');
const validateUser = [
    body('name').isString().withMessage('Name must be a string'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({ errors: errors.array() });
        }

        next();
    },
];

module.exports = validateUser;
