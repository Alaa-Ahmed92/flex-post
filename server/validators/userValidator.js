exports.userSignupValidator = (req, res, next) => {
    // Name
    req.check('name', 'Name is required!').notEmpty();
    req.check('name', 'The name is shorter than the minimum allowed length (4)')
        .isLength({
            min: 4
        });
    // Email
    req.check('email', 'Email is required!').notEmpty();
    req.check('email', 'The email is shorter than the minimum allowed length (4)')
        .matches(/.+\@.+\..+/)
        .withMessage('Please type a correct email')
        .isLength({
            min: 4
        });
    // Password
    req.check('password', 'Password is required!').notEmpty();
    req.check('password', 'The password is shorter than the minimum allowed length (8)')
        .matches(/(?=.*?[A-Z])/)
        .withMessage('Password must have at least one uppercase')
        .matches(/(?=.*?[a-z])/)
        .withMessage('Password must have at least one lowercase')
        .matches(/(?=.*?[0-9])/)
        .withMessage('Password must have at least one digit')
        .matches(/(?=.*?[#?!@$%^&*-])/)
        .withMessage('Password must have at least one special character')
        .isLength({
            min: 8
        });

    const errors = req.validationErrors();

    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError })
    }
    next();
};