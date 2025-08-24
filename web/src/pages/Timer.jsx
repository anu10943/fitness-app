import React, { useEffect, useRef, useState } from 'react';

export default function Timer(){
  const [work, setWork] = useState('40');
  const [rest, setRest] = useState('20');
  const [sets, setSets] = useState('5');
  const [phase, setPhase] = useState('idle'); // idle|work|rest|done
  const [timeLeft, setTimeLeft] = useState(0);
  const [setNum, setSetNum] = useState(0);
  const intervalRef = useRef(null);

  const startPhase = (p) => {
    const w = parseInt(work, 10), r = parseInt(rest, 10);
    setPhase(p);
    setTimeLeft(p === 'work' ? w : r);
  };

  const start = () => {
    setSetNum(1);
    startPhase('work');
  };

  const stop = () => {
    setPhase('idle');
    setTimeLeft(0);
    setSetNum(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (phase === 'idle' || phase === 'done') return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          if (phase === 'work') {
            startPhase('rest');
          } else {
            const target = parseInt(sets, 10);
            if (setNum >= target) {
              setPhase('done');
            } else {
              setSetNum((n) => n + 1);
              startPhase('work');
            }
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [phase, sets, work, rest, setNum]);

  return (
    <div>
      <h2>Interval Timer</h2>
      <div style={{ display:'flex', gap:12, alignItems:'end', marginBottom:12 }}>
        <label>Work (s)
          <input type="number" value={work} onChange={e=>setWork(e.target.value)} style={{ marginLeft:8 }} />
        </label>
        <label>Rest (s)
          <input type="number" value={rest} onChange={e=>setRest(e.target.value)} style={{ marginLeft:8 }} />
        </label>
        <label>Sets
          <input type="number" value={sets} onChange={e=>setSets(e.target.value)} style={{ marginLeft:8 }} />
        </label>
      </div>
      <div style={{ fontSize:64, textAlign:'center', margin:'16px 0' }}>{phase === 'idle' ? '--' : timeLeft}</div>
      <div style={{ textAlign:'center', marginBottom:16 }}>Phase: <b>{phase.toUpperCase()}</b> | Set {setNum} / {sets}</div>
      <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
      </div>
    </div>
  );
}
