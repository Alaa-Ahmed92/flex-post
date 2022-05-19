exports.createPostValidator = (req, res, next) => {
    // Post Body
    req.check('body', 'Write the body').notEmpty();
    req.check('body', 'The body is shorter than the minimum allowed length (10)')
        .isLength({
            min: 10
        });

    const errors = req.validationErrors();

    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError })
    }
    next();
};