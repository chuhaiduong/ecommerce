import express from 'express';
const router = express.Router();

import {signup,signin} from '../controllers/auth';

// router.post('/signin',userSignupValidator,signup);
// router.post('/account-activation',accountActivation);

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;