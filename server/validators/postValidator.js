exports.createPostValidator = (req, res, next) => {
    req.check('title', 'Write the title').notEmpty();
    req.check('title', 'The title is shorter than the minimum allowed length (4)')
        .isLength({
            min: 4
        });

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