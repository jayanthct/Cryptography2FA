const express = require('express');
const router = express.Router();
const {
  loginUser,
  verify2FACode
} = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/verify-2fa', verify2FACode);

module.exports = router;
