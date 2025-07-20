// ======================== Edwards Curve Class ========================

class EdwardsCurve {
  constructor(p, d) {
    this.p = BigInt(p);
    this.d = BigInt(d);
  }

  modInverse(a, p) {
    let t = 0n,
      newT = 1n;
    let r = p,
      newR = a % p;
    while (newR !== 0n) {
      const q = r / newR;
      [t, newT] = [newT, t - q * newT];
      [r, newR] = [newR, r - q * newR];
    }
    if (r > 1n) throw new Error('No modular inverse');
    if (t < 0n) t += p;
    return t;
  }

  add(P, Q) {
    const [x1, y1] = P.map(BigInt);
    const [x2, y2] = Q.map(BigInt);
    const p = this.p;
    const d = this.d;

    const x1x2 = (x1 * x2) % p;
    const y1y2 = (y1 * y2) % p;
    const denom = (1n + d * x1x2 * y1y2) % p;

    if (denom === 0n) throw new Error('Invalid addition: denominator is zero');

    const denom_inv = this.modInverse(denom, p);
    const x3 = ((x1 * y2 + x2 * y1) * denom_inv) % p;
    const y3 = ((y1 * y2 - x1 * x2) * denom_inv) % p;
    return [x3, y3];
  }

  scalarMult(k, P) {
    k = BigInt(k);
    let Q = null;
    let current = P;
    while (k > 0n) {
      if (k & 1n) {
        Q = Q === null ? current : this.add(Q, current);
      }
      current = this.add(current, current);
      k >>= 1n;
    }
    return Q;
  }
}

// ======================== Parameters ========================
const p = BigInt('170141183460469231731687303715884106123');
const d = BigInt('91809462350005119262454670479251904763');
const curve = new EdwardsCurve(p, d);
const G = [
  BigInt('70386797490885948081266913011078919886'),
  BigInt('58295921324149903641698107476034198484'),
];

// ======================== Chaos Helpers ========================
function logisticSequence(x0, r, n) {
  let x = x0;
  const seq = [];
  for (let i = 0; i < n; i++) {
    x = r * x * (1 - x);
    seq.push(x);
  }
  return seq;
}

function henonMap(x0, y0, a, b, n) {
  let x = x0,
    y = y0;
  for (let i = 0; i < n; i++) {
    const xNew = 1 - a * x * x + y;
    y = b * x;
    x = xNew;
  }
  return [x, y];
}

function generatePrivateKeyWithLogistic(p, seed, r = 3.99, steps = 100) {
  const k = BigInt(Math.floor(Math.random() * Number(p - 1n)) + 1);
  const x0 = (seed % 1000) / 1000.0;
  const L = logisticSequence(x0, r, steps);
  const lm_scaled = Math.floor(L[L.length - 1] * 1e8);
  const k_prime = k ^ BigInt(lm_scaled);
  return [k, k_prime];
}

function perturbPoint(Q, hx, hy, p) {
  const [Qx, Qy] = Q;
  const hx_scaled = BigInt(Math.floor(hx * 1e8)) % p;
  const hy_scaled = BigInt(Math.floor(hy * 1e8)) % p;
  return [(Qx + hx_scaled) % p, (Qy + hy_scaled) % p];
}

function modPow(base, exponent, mod) {
  base = base % mod;
  let result = 1n;
  while (exponent > 0n) {
    if (exponent & 1n) result = (result * base) % mod;
    base = (base * base) % mod;
    exponent >>= 1n;
  }
  return result;
}

function encodeMessageToPoint(message, p, d) {
  const base64Encoded = Buffer.from(message, 'utf-8').toString('base64');
  const mInt = BigInt('0x' + Buffer.from(base64Encoded).toString('hex'));
  let offset = 0n;

  while (true) {
    const x = (mInt + offset) % p;
    try {
      const x2 = (x * x) % p;
      const numerator = (1n - x2 + p) % p;
      const denominator = (1n - ((d * x2) % p) + p) % p;
      const denom_inv = curve.modInverse(denominator, p);
      const y2 = (numerator * denom_inv) % p;
      const y = modPow(y2, (p + 1n) / 4n, p);

      if ((y * y) % p === y2) {
        return [[x, y], Number(offset), base64Encoded.length, base64Encoded];
      }
    } catch (err) {}
    offset++;
    if (offset > 10000n)
      throw new Error('Failed to find valid point on curve for message');
  }
}

// ======================== Encrypt & Decrypt ========================
export function encrypt(message, seed = 99999) {
  const [k, k_prime] = generatePrivateKeyWithLogistic(p, seed);
  const Q = curve.scalarMult(k_prime, G);

  const [hx, hy] = henonMap(0.1, 0.3, 1.4, 0.3, 100);
  const Q_perturbed = perturbPoint(Q, hx, hy, p);

  const [M, offset, b64_len, encoded_backup] = encodeMessageToPoint(
    message,
    p,
    d
  );

  const [r, r_prime] = generatePrivateKeyWithLogistic(p, seed + 1);
  const C1 = curve.scalarMult(r_prime, G);
  const rQ = curve.scalarMult(r_prime, Q_perturbed);
  const C2 = curve.add(M, rQ);

  return {
    C1: C1.map((val) => val.toString()), // Convert BigInt to string
    C2: C2.map((val) => val.toString()), // Convert BigInt to string
    offset,
    b64_len,
    encoded_backup,
    seed,
  };
}

export function decrypt(C1, C2, offset, b64_len, encoded_backup, seed) {
  const [, k_prime] = generatePrivateKeyWithLogistic(p, seed);
  const kC1 = curve.scalarMult(k_prime, C1);
  const kC1_neg = [kC1[0], (p - kC1[1]) % p];
  const M = curve.add(C2, kC1_neg);
  const x = (((M[0] - BigInt(offset)) % p) + p) % p;

  try {
    const recoveredBytes = bigintToBuffer(x);
    const recoveredBase64 = recoveredBytes.toString();
    const decodedMessage = Buffer.from(recoveredBase64, 'base64').toString();
    if (decodedMessage.trim() !== '') return decodedMessage;
  } catch (err) {
    console.error('Primary decode failed:', err);
  }

  // Fallback: use encoded_backup
  try {
    return Buffer.from(encoded_backup, 'base64').toString();
  } catch {
    return '<Failed to decode message>';
  }
}
