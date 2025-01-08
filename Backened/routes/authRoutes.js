const router = require('express').Router() ;

// methods from authcontroller
const {register, generateAndSend ,otpVerification ,validateLogin ,forgetPassword ,verifyToken} = require('../controllers/authController');


router.post('/register' , register) ;
router.post('/generateOtp' ,generateAndSend )
router.post('/generateOtp/:id' , generateAndSend) ;
router.post('/verifyOtp' , otpVerification) ;
router.post('/validateLogin'  , validateLogin) ; 
router.post('/forgetPassword' , forgetPassword) ;
router.post('/verifyToken' , verifyToken)
module.exports = router ;   