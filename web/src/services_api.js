const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function saveBmi({ height_cm, weight_kg }){
  const res = await fetch(`${API_URL}/api/v1/bmi`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ height_cm, weight_kg })
  });
  return res.json();
}

export async function getBmiHistory(){
  const res = await fetch(`${API_URL}/api/v1/bmi`);
  return res.json();
}
