const express = require('express');
const router = express.Router();

const { getAll, getEmployee, insert, verifyEmail, update, deleteById } = require('../Controllers/employeeController');

router.post('/getall', getAll);
router.post('/getemployee', getEmployee);
// router.post('/login', login);
router.post('/verifyemail', verifyEmail);
router.post('/insert', insert);
router.post('/update', update);
router.post('/deletebyid', deleteById);

module.exports = router;