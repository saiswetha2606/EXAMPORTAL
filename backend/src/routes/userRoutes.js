const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

const router = express.Router();

router.get('/profile/:id', getUserProfile);
router.put('/profile/:id', updateUserProfile);

module.exports = router;
