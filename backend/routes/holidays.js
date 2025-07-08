const express = require('express');
const router = express.Router();

const {getAllHolidays} = require('../controllers/holidays');

router.route('/').get(getAllHolidays);
// router.route('/:id').get(getLeave).patch(updateLeave).delete(deleteLeave);
module.exports = router;