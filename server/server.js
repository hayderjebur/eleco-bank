import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// import elliptic from 'elliptic';
// import crypto from 'crypto';
// const EC = elliptic.ec;
// const ec = new EC('secp256k1');

// Generate keys
// const key = ec.genKeyPair();

// Credit card number to sign
// const creditCardNumber = '1234 5678 9012 3456';

// Hash the credit card number
// const hash = crypto.createHash('sha256').update(creditCardNumber).digest();

// Sign the hash
// const signature = key.sign(hash);
// console.log(signature);

// // Export DER encoded signature
// const derSign = signature.toDER();

// Verify signature
// console.log(key.verify(hash, derSign));

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

// app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/upload', uploadRoutes);
// app.use('/api/gallery', galleryRoutes);

// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const parentDir = path.join(__dirname, '..');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(parentDir, '/client/build')));

  app.get('/*', (req, res) =>
    res.sendFile(path.resolve(parentDir, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mood on port ${PORT}`.yellow.bold
  )
);
