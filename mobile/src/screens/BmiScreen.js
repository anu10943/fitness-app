import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { saveBmi, listBmi } from '../services/api';

function category(bmi){
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export default function BmiScreen(){
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);

  async function load(){
    const res = await listBmi();
    if (res?.ok) setHistory(res.data);
  }

  useEffect(() => { load(); }, []);

  async function onSave(){
    const h = parseFloat(height), w = parseFloat(weight);
    if (!h || !w) return;
    const bmi = +(w / ((h/100)**2)).toFixed(2);
    setCurrent({ bmi, cat: category(bmi) });
    const res = await saveBmi({ height_cm: h, weight_kg: w });
    if (res?.ok) load();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Tracker</Text>
      <TextInput placeholder="Height (cm)" keyboardType="numeric" style={styles.input} value={height} onChangeText={setHeight} />
      <TextInput placeholder="Weight (kg)" keyboardType="numeric" style={styles.input} value={weight} onChangeText={setWeight} />
      <Button title="Calculate & Save" onPress={onSave} />
      {current && <Text style={styles.result}>BMI: {current.bmi} ({current.cat})</Text>}
      <Text style={styles.subtitle}>History</Text>
      <FlatList
        data={history}
        keyExtractor={item => String(item.id)}
        ItemSeparatorComponent={() => <View style={{ height:8 }} />}
        renderItem={({ item }) => (
          <Text>{new Date(item.created_at).toLocaleString()} — {item.bmi}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  title: { fontSize:24, fontWeight:'600', marginBottom:12 },
  subtitle: { marginTop:16, fontSize:18, fontWeight:'500' },
  input: { borderWidth:1, borderColor:'#ccc', padding:10, borderRadius:8, marginBottom:10 },
  result: { marginTop:12, fontSize:18, fontWeight:'600' }
});
