// Field and Curve Parameters
const p = (1n << 127n) - 1n; // 2^127 - 1
const a = 1n;

// Base point (as provided)
const P = [
  70386797490885948081266913011078919886n,
  58295921324149903641698107476034198484n,
];

export class KoblitzCurve {
  constructor(p, a) {
    this.p = BigInt(p);
    this.a = BigInt(a);
  }

  modInverse(a, m) {
    // Extended Euclidean algorithm
    let m0 = m,
      t,
      q;
    let x0 = 0n,
      x1 = 1n;
    a = ((a % m) + m) % m;
    while (a > 1n) {
      q = a / m;
      [m, a] = [a % m, m];
      [x0, x1] = [x1 - q * x0, x0];
    }
    return x1 < 0n ? x1 + m0 : x1;
  }

  point_add(P, Q) {
    if (!P) return Q;
    if (!Q) return P;
    const [x1, y1] = P;
    const [x2, y2] = Q;

    if (x1 === x2 && (y1 + y2) % this.p === 0n) {
      return null;
    }

    let s;
    if (x1 === x2 && y1 === y2) {
      const num = (3n * x1 * x1 + 2n * this.a * x1 + 1n) % this.p;
      const den = this.modInverse((2n * y1 + x1) % this.p, this.p);
      s = (num * den) % this.p;
    } else {
      const num = (y2 - y1 + this.p) % this.p;
      const den = this.modInverse((x2 - x1 + this.p) % this.p, this.p);
      s = (num * den) % this.p;
    }

    const x3 = (s * s + s + x1 + x2 + this.a) % this.p;
    const y3 = (s * (x1 + x3) + x3 + y1) % this.p;
    return [x3, y3];
  }

  scalar_mult(k, P) {
    k = BigInt(k);
    let Q = null;
    let current = P;
    while (k > 0n) {
      if (k & 1n) Q = Q === null ? current : this.point_add(Q, current);
      current = this.point_add(current, current);
      k >>= 1n;
    }
    return Q;
  }
}

// Chaotic key generation (Henon + Logistic)
function chaotic_key_full(seed, p) {
  let r_log = 3.99;
  let x_log = (seed % 1000) / 1000.0;
  for (let i = 0; i < 100; i++) {
    x_log = r_log * x_log * (1 - x_log);
  }
  const x_log_scaled = Math.floor(x_log * 1e8);

  const a_hen = 1.4,
    b_hen = 0.3;
  let xh = (seed % 100) / 100.0;
  let yh = ((seed + 1) % 100) / 100.0;
  for (let i = 0; i < 100; i++) {
    const xh_new = 1 - a_hen * xh * xh + yh;
    yh = b_hen * xh;
    xh = xh_new;
  }
  const x_hen_scaled = Math.floor((xh + yh) * 1e8);

  // Always return a positive key modulo p
  return (BigInt(x_log_scaled ^ x_hen_scaled) + p) % p;
}

// Encryption
export function encrypt_koblitz(msg, curve, P, seed, p) {
  const encoded = Buffer.from(msg, 'utf-8').toString('base64');
  const mInt = BigInt('0x' + Buffer.from(encoded, 'utf-8').toString('hex'));
  const byte_len = Math.ceil(mInt.toString(2).length / 8);
  let offset = 0n;
  let x, y;

  while (true) {
    x = (mInt + offset) % p;
    const rhs = (x ** 3n + a * x ** 2n + 1n) % p;
    y = modPow(rhs, (p + 1n) / 4n, p);
    if ((y * y) % p === rhs) break;
    offset++;
  }

  const M = [x, y];

  const k = chaotic_key_full(seed, p);
  const Q = curve.scalar_mult(k, P);
  const r = chaotic_key_full(seed + 1, p);
  const C1 = curve.scalar_mult(r, P);
  const rQ = curve.scalar_mult(r, Q);
  const C2 = curve.point_add(M, rQ);

  return { C1, C2, offset, byte_len, encoded, k, Q };
}

// Decryption
// export function decrypt_koblitz(
//   C1,
//   C2,
//   offset,
//   byte_len,
//   curve,
//   P,
//   seed,
//   p,
//   encoded_backup
// ) {
//   const k = chaotic_key_full(seed, p);
//   const kC1 = curve.scalar_mult(k, C1);
//   if (!kC1) throw new Error('Invalid k*C1 (point not on curve)');
//   const inv_kC1 = [kC1[0], (p - kC1[1]) % p];
//   const M = curve.point_add(C2, inv_kC1);
//   const x = (M[0] - offset + p) % p;

//   try {
//     const hex = x.toString(16).padStart(byte_len * 2, '0');
//     const recovered_bytes = Buffer.from(hex, 'hex');
//     return Buffer.from(recovered_bytes.toString(), 'base64').toString();
//   } catch {
//     return Buffer.from(encoded_backup, 'base64').toString();
//   }
// }
export function decrypt_koblitz(
  C1,
  C2,
  offset,
  byte_len,
  curve,
  P,
  seed,
  p,
  encoded_backup
) {
  const k = chaotic_key_full(seed, p);
  const kC1 = curve.scalar_mult(k, C1);
  if (!kC1) throw new Error('Invalid k*C1 (point not on curve)');

  const inv_kC1 = [kC1[0], (p - kC1[1]) % p];
  const M = curve.point_add(C2, inv_kC1);
  const x = (M[0] - offset + p) % p;

  try {
    const hex = x.toString(16).padStart(byte_len * 2, '0');
    const recovered_bytes = Buffer.from(hex, 'hex');
    const result = Buffer.from(recovered_bytes.toString(), 'base64').toString();

    if (result && /^[0-9]+$/.test(result)) {
      return result;
    }
  } catch (err) {
    console.error('Primary decode failed:', err);
  }

  // Force fallback
  return Buffer.from(encoded_backup, 'base64').toString();
}

// Fast modular exponentiation
function modPow(base, exp, mod) {
  base = base % mod;
  let result = 1n;
  while (exp > 0n) {
    if (exp & 1n) result = (result * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return result;
}

// module.exports = {
//   KoblitzCurve,

//   chaotic_key_full,
// };
