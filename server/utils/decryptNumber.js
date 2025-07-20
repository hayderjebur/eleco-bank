import { decrypt } from '../encryptionEdwardsCurve.js';

const decryptCard = ({ C1, C2, offset, b64_len, encoded_backup, seed }) => {
  if (!C1 || !C2) return 'C1 and C2 are required';

  try {
    const C1Big = [
      '-21720870733697116682780841674808089540',
      '163550126077915508000523650011402768895',
    ];
    const C2Big = [
      '26892856053019073497741603807457277671',
      '-36504550705180076106908133939456043587',
    ];
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
