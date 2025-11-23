import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import contactRoutes from './server/routes/contact.routes.js';
import projectRoutes from './server/routes/project.routes.js';
import qualificationRoutes from './server/routes/qualification.routes.js';
import userRoutes from './server/routes/user.routes.js';
import authRoutes from './server/routes/auth.routes.js';

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

// DB connect
const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Portfolio';
mongoose.connect(uri).then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => console.error('Mongo error', err));

// basic route for screenshot
app.get('/', (req, res) => {
  res.status(200).send('Portfolio API is running 🚀');
});

// mount resource routes
app.use('/api', contactRoutes);
app.use('/api', projectRoutes);
app.use('/api', qualificationRoutes);
app.use('/api', userRoutes);
// auth
app.use('/', authRoutes);

// error handler (auth)
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: err.name + ': ' + err.message });
  }
  if (err) return res.status(400).json({ error: err.name + ': ' + err.message });
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server on http://localhost:${PORT}`));
