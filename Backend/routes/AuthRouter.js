const { signupValidation, loginValidation } = require('../middleware/AuthValidation');
const { sigup, login } = require('../controllers/AuthController');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, sigup);


module.exports = router;