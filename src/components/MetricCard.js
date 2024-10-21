// Card.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MetricCard = ({ description, number, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.number}>{number}</Text> 
        <Text style={styles.description}>{description}</Text> 
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,  // For Android shadow
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',  // Center the content (number and description)
  },
  number: {
    fontSize: 36,  // Large font size for the number
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,  // Smaller text for the description
    color: '#777',  // Gray color for description
    marginTop: 4,  // Small margin above the description
  },
});

export default MetricCard;
