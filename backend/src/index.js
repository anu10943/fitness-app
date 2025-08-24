import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bmiRouter from './routes/bmi.js';

const app = express();
const PORT = process.env.PORT || 3000;
const allowed = (process.env.CORS_ORIGINS || '').split(',').map(s=>s.trim()).filter(Boolean);

app.use(helmet());
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // mobile apps, curl
    return cb(null, allowed.includes(origin));
  }
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/bmi', bmiRouter);

app.get('/', (_req, res) => res.json({ ok:true, service:'fitness-backend' }));

app.listen(PORT, () => {
  console.log(`Backend running on http://0.0.0.0:${PORT}`);
});
