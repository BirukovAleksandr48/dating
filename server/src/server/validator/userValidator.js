const yup = require('yup');
const moment = require('moment');

const yupUser = yup.object().shape({
    firstName: yup.string().required("firstname is required"),
    lastName: yup.string().required("lastname is required"),
    email: yup.string().required("email is required").email("email is incorrect"),
    password: yup.string().required("password is required").trim().min(8),
    gender: yup.string().required("gender is required"),
    birthDate: yup
        .date()
        .max(moment().subtract(18, 'year').format('YYYY-MM-DD'), "birth date is incorrect"),
    intention: yup.string().required("intention is required"),
    civilStatus: yup.string().required("civil status is required"),
    religion: yup.string().required("religion is required"),
    children: yup.string().required("children is required"),
    piercings: yup.string().required("piercings is required"),
    smoker: yup.string().required("smoker is required"),
    tattoos: yup.string().required("tattoos is required"),
    work: yup.string().required("work is required"),
    city: yup.string().required("city is required")
});

/**
 * Validate object User with yup shape (https://www.npmjs.com/package/yup). Use it before creating new user.
 * @param req - contain User object in req.body
 */
module.exports = (req, res, next) => {
    yupUser
    .validate(req.body)
    .then(()=> next())
    .catch(err => next({ code: 400, message: err.errors[0] }));
};
