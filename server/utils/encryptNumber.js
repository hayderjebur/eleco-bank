import { encrypt } from '../encryptionEdwardsCurve.js';

const encryptCard = (cardNumber, expiry, cvc) => {
  if (!cardNumber || !expiry || !cvc) return 'All fields are required';
  const cardNumberString = JSON.stringify(cardNumber);
  const expiryString = JSON.stringify(expiry);
  const cvcString = JSON.stringify(cvc);

  const encryptCardNumber = encrypt(cardNumberString);
  const encryptExpiryNumber = encrypt(expiryString);
  const encryptCvcNumber = encrypt(cvcString);
  return [encryptCardNumber, encryptExpiryNumber, encryptCvcNumber];
};

export default encryptCard;
