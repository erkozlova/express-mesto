const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  undateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/me', undateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
