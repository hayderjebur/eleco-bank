import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUsers,
  getUserById,
  createCard,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
// router.post('/encrypt', encryptMsg);
// router.post('/decrypt', decryptMsg);

router.route('/:id').get(protect, getUserById);
router.route('/:id/card').post(protect, createCard);
// router.route('/:userId/cards/:cardId').post(protect, admin, createSignature);

export default router;
