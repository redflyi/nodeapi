exports.createPostValidator = (req, res, next) => {
    req.check('title', "Write a title").notEmpty();
    req.check('title', "Title needs to be 4-150 characters").isLength({
        min:4,
        max:150
    });
    req.check('body', "Write a body").notEmpty();
    req.check('body', "Title needs to be 4-2000 characters").isLength({
        min:4,
        max:2000
    });

    //Error Checking
    const errors = req.validationErrors();

    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }

    next();
};

exports.userSignupValidator = (req, res, next) => {
    req.check("name", "Please enter your name").notEmpty();
    req.check('name', "Enter an appropriate length name").isLength({
        min:4,
        max:50
    });
    req.check('email', "Enter an e-mail").notEmpty();
    req.check('email', "Email not valid")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min: 4,
        max: 50
    })
    req.check('password', "Please enter a password").notEmpty;
    req.check('password')
    .isLength({min: 6})
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage('Password must contain a numnber')

    //Error Checking
    const errors = req.validationErrors();

    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }

    next();

}