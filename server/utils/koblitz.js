import {
  KoblitzCurve,
  encrypt_koblitz,
  decrypt_koblitz,
} from '../encryptionKolitz.js';

const p = (1n << 127n) - 1n;
const a = 1n;
const P = [
  70386797490885948081266913011078919886n,
  58295921324149903641698107476034198484n,
];

const curve = new KoblitzCurve(p, a);

export function encryptKoblitz(message, seed = 99999) {
  return encrypt_koblitz(message, curve, P, seed, p);
}

export function decryptKoblitzNumber({
  C1,
  C2,
  offset,
  byte_len,
  encoded_backup,
  seed = 99999,
}) {
  return decrypt_koblitz(
    C1,
    C2,
    offset,
    byte_len,
    curve,
    P,
    seed,
    p,
    encoded_backup
  );
}
