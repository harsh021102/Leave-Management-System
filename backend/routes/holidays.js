const express = require('express');
const router = express.Router();

const {getAllHolidays,createHoliday} = require('../controllers/holidays');

router.route('/').get(getAllHolidays).post(createHoliday);
// router.route('/:id').get(getLeave).patch(updateLeave).delete(deleteLeave);
module.exports = router;