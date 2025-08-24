import { query } from '../db.js';

// POST /api/v1/bmi  { height_cm, weight_kg }
async function createBmi(req, res) {
  try {
    const { height_cm, weight_kg } = req.body || {};
    if (!height_cm || !weight_kg) {
      return res.status(400).json({ ok:false, error: 'height_cm and weight_kg are required' });
    }
    const bmi = Number((weight_kg / ((height_cm/100) ** 2)).toFixed(2));
    const { rows } = await query(
      `INSERT INTO bmi_entries (height_cm, weight_kg, bmi) VALUES ($1, $2, $3) RETURNING id, height_cm, weight_kg, bmi, created_at`,
      [height_cm, weight_kg, bmi]
    );
    res.json({ ok: true, data: rows[0] });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok:false, error: 'Server error' });
  }
}

// GET /api/v1/bmi  (last 50)
async function listBmi(_req, res) {
  try {
    const { rows } = await query(
      `SELECT id, height_cm, weight_kg, bmi, created_at FROM bmi_entries ORDER BY created_at DESC LIMIT 50`
    );
    res.json({ ok: true, data: rows });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok:false, error: 'Server error' });
  }
}

import { Router } from 'express';
const r = Router();
r.post('/', createBmi);
r.get('/', listBmi);
export default r; 
