const express = require('express');

const friendController = require('../controllers/friend-controller')

const router = express.Router();

router.post('/:accepterId', friendController.requestFriend);
router.patch('/:requesterId', friendController.acceptFriend);
router.delete('/:friendId', friendController.deleteFriend);

module.exports = router;
