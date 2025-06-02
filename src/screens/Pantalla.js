import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Pantalla(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido/a!</Text>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Register')}
        style={[styles.button, styles.secondaryButton]}
      >
        <Text style={styles.buttonText}>Registro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Login')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 48,
    color: '#d62828',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: '#d62828',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff0f0',
  },
});
