import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

import elliptic from 'elliptic';
import crypto from 'crypto';
const EC = elliptic.ec;
const secp256k1 = new EC('secp256k1');
const ed25519 = new EC('ed25519');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      publicKey: user.publicKey,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
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
  const key = secp256k1.genKeyPair();

  const user = await User.create({
    name,
    email,
    password,
    publicKey: key.getPublic('hex'),
    privateKey: key.getPrivate(),
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      publicKey: user.publicKey,
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
  const users = await User.find({}).select('-password  -cards.signature');
  res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select(
    '-password -privateKey -cards.signature'
  );

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Create new Card
// @route   POST /api/users/:id/card
// @access  Private
const createCard = asyncHandler(async (req, res) => {
  const { cardNumber, expiry, cvc, ellipticType } = req.body;

  // publicKey: key.getPublic('hex')
  // const userKeyPair = ec.genKeyPair();

  const user = await User.findById(req.params.id);
  if (user) {
    const cardData = {
      cardNumber,
      expiry,
      cvc,
    };
    throw Error('error');
    // Hash the card data
    const hash = crypto
      .createHash('sha256')
      .update(JSON.stringify(cardData))
      .digest('hex');

    const card = {
      hashedData: hash,
      user: req.user._id,
    };

    user.cards.push(card);

    await user.save();
    res.status(201).json({ message: 'Card added successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
// @desc    Create Signture
// @route   POST /api/users/:userId/cards/:cardId
// @access  Private

const createSignature = asyncHandler(async (req, res) => {
  const { ellipticType } = req.body;
  const cardId = mongoose.Types.ObjectId(req.params.cardId);

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const foundCard = user.cards.find((card) => card._id.equals(cardId));
    if (!foundCard) {
      res.status(404);
      throw new Error('Card not found');
    }
    if (foundCard.signature) {
      res.status(404);
      throw new Error('The card already has a signature ');
    }

    let signature;
    if (ellipticType === 'Edward') {
      signature = ed25519
        .keyFromPrivate(user.privateKey)
        .sign(foundCard.hashedData);
    } else if (ellipticType === 'Koblite') {
      signature = secp256k1
        .keyFromPrivate(user.privateKey)
        .sign(foundCard.hashedData);
    } else {
      res.status(400);
      throw new Error('Unsupported elliptic curve type');
    }

    foundCard.signature = signature?.toDER('hex');
    await user.save();

    res
      .status(201)
      .json({ message: 'Signature added successfully!', foundCard });
  } catch (error) {
    console.error('Error creating signature:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export {
  authUser,
  registerUser,
  getUsers,
  getUserById,
  createCard,
  createSignature,
};
