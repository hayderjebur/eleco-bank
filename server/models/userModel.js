import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const cardSchema = mongoose.Schema(
  {
    // cardNumber: { type: String, required: true },
    // expiry: { type: String, required: true },
    // cvc: { type: String, required: true },
    hashedData: { type: String, required: true },
    signature: { type: String },
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
    publicKey: {
      type: String,
      // required: true,
    },
    privateKey: {
      type: String,
      // required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    cards: [cardSchema],
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
