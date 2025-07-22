import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

import encryptCard from '../utils/encryptNumber.js';
import decryptCard from '../utils/decryptNumber.js';
import { encryptKoblitz, decryptKoblitzNumber } from '../utils/koblitz.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // console.log(user);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      cards: user.cards,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Create new Card
// @route   POST /api/users/:id/card
// @access  Private
const createCard = asyncHandler(async (req, res) => {
  const { cardNumber, expiry, cvc } = req.body;
  console.log(cardNumber, expiry, cvc);
  const user = await User.findById(req.params.id);

  const encryptedObject = encryptCard(cardNumber, expiry, cvc);

  if (user) {
    const encryptCardNumber = {
      C1: encryptedObject[0].C1,
      C2: encryptedObject[0].C2,
      offset: encryptedObject[0].offset,
      b64_len: encryptedObject[0].b64_len,
      encoded_backup: encryptedObject[0].encoded_backup,
      seed: encryptedObject[0].seed,
    };
    const encryptExpiryNumber = {
      C1: encryptedObject[1].C1,
      C2: encryptedObject[1].C2,
      offset: encryptedObject[1].offset,
      b64_len: encryptedObject[1].byte_len,
      encoded_backup: encryptedObject[1].encoded,
      seed: 99999,
    };
    const encryptCvcNumber = {
      C1: encryptedObject[2].C1,
      C2: encryptedObject[2].C2,
      offset: encryptedObject[2].offset,
      b64_len: encryptedObject[2].byte_len,
      encoded_backup: encryptedObject[2].encoded,
      seed: 99999,
    };

    const card = {
      user: req.user._id,
      cardNumber: encryptCardNumber,
      expiry: encryptExpiryNumber,
      cvc: encryptCvcNumber,
    };

    user.cards.push(card);

    await user.save();
    res.status(201).json({ message: 'Card added successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');

  if (users && users.length > 0) {
    const updatedUsers = users.map((user) => {
      const userObj = user.toObject(); // Convert Mongoose document to plain object
      if (userObj.cards && userObj.cards.length > 0) {
        userObj.cards = decryptAllCards(userObj.cards);
      }
      return userObj;
    });

    res.json(updatedUsers);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

function decryptAllCards(cards = []) {
  return cards.map((card) => {
    const cardNumber = {
      C1: card.cardNumber.C1,
      C2: card.cardNumber.C2,
      offset: card.cardNumber.offset,
      b64_len: card.cardNumber.b64_len,
      encoded_backup: card.cardNumber.encoded_backup,
      seed: card.cardNumber.seed,
    };
    const C1Big = card.expiry.C1.map(BigInt);
    const C2Big = card.expiry.C2.map(BigInt);
    const expiryNumber = {
      C1: C1Big,
      C2: C2Big,
      offset: BigInt(card.expiry.offset),
      byte_len: card.expiry.b64_len,
      encoded_backup: card.expiry.encoded_backup,
      seed: 99999,
    };
    const C1BigCvc = card.cvc.C1.map(BigInt);
    const C2BigCvc = card.cvc.C2.map(BigInt);
    const cvcNumber = {
      C1: C1BigCvc,
      C2: C2BigCvc,
      offset: BigInt(card.cvc.offset),
      byte_len: card.cvc.b64_len,
      encoded_backup: card.cvc.encoded_backup,
      seed: 99999,
    };

    try {
      //Edwards Curve
      const decryptedNumber = decryptCard(cardNumber);
      // Kolitz Curve
      const encryptedExpiry = decryptKoblitzNumber(expiryNumber);
      const encryptedCvc = decryptKoblitzNumber(cvcNumber);
      return {
        ...card,
        cardNumber: JSON.parse(decryptedNumber),
        expiry: JSON.parse(encryptedExpiry),
        cvc: JSON.parse(encryptedCvc),
      };
    } catch (err) {
      console.error('Failed to decrypt card:', err);
      return { ...card, decryptedCardNumber: '<Decryption failed>' };
    }
  });
}

// @desc    Get user by ID
// @route   GET /api/users/:id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password').lean();

  if (user) {
    let result;
    if (user.cards) {
      result = decryptAllCards(user.cards);
      console.log('update', result);
    }
    const updatedUser = { ...user, cards: result };
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, registerUser, getUsers, getUserById, createCard };
