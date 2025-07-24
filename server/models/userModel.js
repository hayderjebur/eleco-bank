import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const encryptNumberSchema = mongoose.Schema(
  {
    message: { type: String, required: false },
    C1: { type: [String], required: true },
    C2: { type: [String], required: true },
    offset: { type: String, required: true },
    b64_len: { type: Number, required: true },
    encoded_backup: { type: String, required: true },
    seed: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const cardSchema = mongoose.Schema(
  {
    cardNumber: encryptNumberSchema,
    expiry: encryptNumberSchema,
    cvc: encryptNumberSchema,
    balance: {
      type: Number,
      required: false,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const transationsSchema = mongoose.Schema(
  {
    senderUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    recipientUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    cards: [cardSchema],
    transations: [transationsSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  // if (this.cards.length > 0) {
  //   const lastCardIndex = this.cards.length - 1;
  //   this.cards[lastCardIndex].cvc = await bcrypt.hash(
  //     this.cards[lastCardIndex].cvc,
  //     salt
  //   );
  // }

  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model('User', userSchema);

export default User;
