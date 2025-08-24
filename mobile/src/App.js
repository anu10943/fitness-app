import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BmiScreen from './screens/BmiScreen';
import TimerScreen from './screens/TimerScreen';
import { View, Button } from 'react-native';

const Stack = createNativeStackNavigator();

function Home({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent:'center', padding:16 }}>
      <Button title="BMI Tracker" onPress={() => navigation.navigate('BMI')} />
      <View style={{ height: 16 }} />
      <Button title="Interval Timer" onPress={() => navigation.navigate('Timer')} />
    </View>
  );
}

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BMI" component={BmiScreen} />
        <Stack.Screen name="Timer" component={TimerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
