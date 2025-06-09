const express = require('express');
const router = express.Router();

const {getAllLeaves,createLeave,updateLeave,deleteLeave,getLeave} = require('../controllers/leaves');

router.route('/').get(getAllLeaves).post(createLeave);
router.route('/:id').get(getLeave).patch(updateLeave).delete(deleteLeave);
module.exports = router;