import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function TimerScreen(){
  const [work, setWork] = useState('40');
  const [rest, setRest] = useState('20');
  const [sets, setSets] = useState('5');
  const [phase, setPhase] = useState('idle'); // idle|work|rest|done
  const [timeLeft, setTimeLeft] = useState(0);
  const [setNum, setSetNum] = useState(0);
  const intervalRef = useRef(null);

  const startPhase = async (p) => {
    const w = parseInt(work, 10), r = parseInt(rest, 10);
    setPhase(p);
    setTimeLeft(p === 'work' ? w : r);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const start = async () => {
    setSetNum(1);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
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
    <View style={styles.container}>
      <Text style={styles.title}>Interval Timer</Text>
      <View style={styles.row}>
        <TextInput style={styles.input} keyboardType="numeric" value={work} onChangeText={setWork} placeholder="Work (s)" />
        <TextInput style={styles.input} keyboardType="numeric" value={rest} onChangeText={setRest} placeholder="Rest (s)" />
        <TextInput style={styles.input} keyboardType="numeric" value={sets} onChangeText={setSets} placeholder="Sets" />
      </View>
      <Text style={styles.big}>{phase === 'idle' ? '--' : timeLeft}</Text>
      <Text style={styles.sub}>Phase: {phase.toUpperCase()}  |  Set {setNum} / {sets}</Text>
      <View style={styles.row}>
        <Button title="Start" onPress={start} />
        <View style={{ width: 12 }} />
        <Button title="Stop" onPress={stop} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  title: { fontSize:24, fontWeight:'600', marginBottom:12 },
  row: { flexDirection:'row', gap:8, marginBottom:12, alignItems:'center' },
  input: { flex:1, borderWidth:1, borderColor:'#ccc', padding:10, borderRadius:8 },
  big: { fontSize:64, textAlign:'center', marginVertical:16 },
  sub: { textAlign:'center', marginBottom:16 }
});
