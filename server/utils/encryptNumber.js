import { encryptEdwards } from '../encryptionEdwardsCurve.js';
import { encryptKoblitz } from './koblitz.js';

const encryptCard = (cardNumber, expiry, cvc) => {
  if (!cardNumber || !expiry || !cvc) return 'All fields are required';
  const cardNumberString = JSON.stringify(cardNumber);
  const expiryString = JSON.stringify(expiry);
  const cvcString = JSON.stringify(cvc);

  const encryptCardNumber = encryptEdwards(cardNumberString);
  const encryptExpiryNumber = encryptKoblitz(expiryString);
  const encryptCvcNumber = encryptKoblitz(cvcString);
  return [encryptCardNumber, encryptExpiryNumber, encryptCvcNumber];
};

export default encryptCard;
