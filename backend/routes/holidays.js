const express = require('express');
const router = express.Router();

const {getAllHolidays,createHoliday,getHoliday,updateHoliday,deleteHoliday} = require('../controllers/holidays');

router.route('/').get(getAllHolidays).post(createHoliday);
router.route('/:id').get(getHoliday).patch(updateHoliday).delete(deleteHoliday);
module.exports = router;