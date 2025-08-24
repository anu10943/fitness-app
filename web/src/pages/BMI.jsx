import React, { useEffect, useMemo, useState } from 'react';
import { saveBmi, getBmiHistory } from '../services_api';

function category(bmi){
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export default function BMI(){
  const [heightCm, setHeight] = useState('');
  const [weightKg, setWeight] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const bmi = useMemo(() => {
    const h = parseFloat(heightCm), w = parseFloat(weightKg);
    if (!h || !w) return null;
    return +(w / ((h/100)**2)).toFixed(2);
  }, [heightCm, weightKg]);

  async function load(){
    const res = await getBmiHistory();
    if (res?.ok) setHistory(res.data);
  }

  useEffect(() => { load(); }, []);

  async function onSave(){
    const h = parseFloat(heightCm), w = parseFloat(weightKg);
    if (!h || !w) return;
    setLoading(true);
    try {
      const res = await saveBmi({ height_cm: h, weight_kg: w });
      if (res?.ok) await load();
    } finally { setLoading(false); }
  }

  return (
    <div>
      <h2>BMI Tracker</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12, maxWidth:640 }}>
        <label>Height (cm)
          <input type="number" value={heightCm} onChange={e=>setHeight(e.target.value)} style={{ width:'100%', padding:10, border:'1px solid #ccc', borderRadius:8 }} />
        </label>
        <label>Weight (kg)
          <input type="number" value={weightKg} onChange={e=>setWeight(e.target.value)} style={{ width:'100%', padding:10, border:'1px solid #ccc', borderRadius:8 }} />
        </label>
        <button onClick={onSave} disabled={loading || !bmi} style={{ alignSelf:'end', padding:'10px 14px', borderRadius:8 }}>
          {loading ? 'Saving…' : 'Calculate & Save'}
        </button>
      </div>

      <div style={{ marginTop:12 }}>
        {bmi ? (
          <div style={{ fontSize:18, fontWeight:600 }}>BMI: {bmi} ({category(bmi)})</div>
        ) : (
          <div style={{ color:'#666' }}>Enter height & weight to calculate BMI.</div>
        )}
      </div>

      <h3 style={{ marginTop:24 }}>History</h3>
      {history.length === 0 ? (
        <div>No records yet.</div>
      ) : (
        <table style={{ borderCollapse:'collapse', width:'100%' }}>
          <thead>
            <tr>
              <th style={{ textAlign:'left', borderBottom:'1px solid #ddd', padding:8 }}>Date</th>
              <th style={{ textAlign:'right', borderBottom:'1px solid #ddd', padding:8 }}>Height (cm)</th>
              <th style={{ textAlign:'right', borderBottom:'1px solid #ddd', padding:8 }}>Weight (kg)</th>
              <th style={{ textAlign:'right', borderBottom:'1px solid #ddd', padding:8 }}>BMI</th>
            </tr>
          </thead>
          <tbody>
            {history.map(row => (
              <tr key={row.id}>
                <td style={{ padding:8 }}>{new Date(row.created_at).toLocaleString()}</td>
                <td style={{ padding:8, textAlign:'right' }}>{row.height_cm}</td>
                <td style={{ padding:8, textAlign:'right' }}>{row.weight_kg}</td>
                <td style={{ padding:8, textAlign:'right' }}>{row.bmi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
