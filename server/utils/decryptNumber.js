import { decrypt } from '../encryptionEdwardsCurve.js';

const decryptCard = ({ C1, C2, offset, b64_len, encoded_backup, seed }) => {
  if (!C1 || !C2) return 'C1 and C2 are required';

  try {
    const C1Big = C1.map((n) => BigInt(n));
    const C2Big = C2.map((n) => BigInt(n));
    const decryptNumber = decrypt(
      C1Big,
      C2Big,
      offset,
      b64_len,
      encoded_backup,
      seed || 99999
    );
    return decryptNumber;
  } catch (err) {
    return err.message;
  }
};
export default decryptCard;
