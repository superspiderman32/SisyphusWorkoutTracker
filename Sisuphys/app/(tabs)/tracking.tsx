import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { TouchableOpacity, Text, TextInput } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  const [loaded, setLoaded] = useState(false);
  const [lifts, setLifts] = useState<{ id: number; name: string }[]>([]);
  const [liftName, setLiftName] = useState('');

  useEffect(() => {
    const loadLifts = async () => {
      const stored = await AsyncStorage.getItem('lifts');
      if (stored) setLifts(JSON.parse(stored));
      setLoaded(true);
    };
    loadLifts();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem('lifts', JSON.stringify(lifts));
  }, [lifts, loaded]);

  const handleAddLift = () => {
    if (!liftName.trim()) return;
    const newLift = {
      id: Date.now(),
      name: liftName,
    };
    setLifts(prev => [...prev, newLift]);
    setLiftName('');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="square.and.pencil"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Tracking
        </ThemedText>
      </ThemedView>

      <ThemedText>Create and track progress of your lifts!</ThemedText>

      <ThemedText style={{ fontFamily: Fonts.rounded }}>
        Add New Exercise:
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Enter lift name..."
        value={liftName}
        onChangeText={setLiftName}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddLift}>
        <Text style={styles.buttonText}>+ Add Lift</Text>
      </TouchableOpacity>

      {lifts.map(lift => (
        <ThemedView key={lift.id} style={styles.liftCard}>
          <ThemedText>{lift.name}</ThemedText>
        </ThemedView>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  liftCard: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    fontSize: 16,
    color: 'white',
  },
});