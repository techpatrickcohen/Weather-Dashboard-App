import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import MetricCard from '../components/MetricCard';
import {WEATHER_API_URL, WEATHER_API_KEY} from "@env"


export default function DashboardScreen({ navigation }) {
  const screenWidth = Dimensions.get("window").width;

  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          WEATHER_API_URL,
          {
            headers: {
              'x-api-key': WEATHER_API_KEY,
            },
          }
        );
        const jsonResponse = await response.json();
        const data = JSON.parse(jsonResponse.body);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        Alert.alert("Error", "Failed to fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);


  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}`;
  };

  const getChartData = (field) => {
    return weatherData.map((item) => item[field]);
  };

  // Only keep every nth label to show 6 labels
  const getChartLabels = () => {
    const totalLabels = weatherData.length;
    const step = Math.ceil(totalLabels / 6); // Step to get 6 labels
    return weatherData
      .filter((_, index) => index % step === 0)
      .map((item) => formatDate(item.timestamp));
  };

  const getLatestEntry = () => {
    return weatherData.length > 0 ? weatherData[weatherData.length - 1] : null;
  };

  const latestEntry = getLatestEntry();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text style={{ color: '#1e90ff', marginTop: 10 }}>Loading Weather Data...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weather Dashboard (Miami)</Text>

      <View style={styles.row}>
          <MetricCard
          description="Temperature"
          number={`${latestEntry.temperature}°C`}
          onPress={() => {}}
          style={styles.card}
        />
        <MetricCard
          description="Humidity"
          number={`${latestEntry.humidity}%`}
          onPress={() => {}}
          style={styles.card}
        />
      </View>

      <Text style={styles.chartTitle}>Temperature Over Time</Text>
      <LineChart
        data={{
          labels: getChartLabels(), // Only 6 labels
          datasets: [
            {
              data: getChartData('temperature'),
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="°C"
        chartConfig={{
          ...chartConfigTemp,
          xAxisLabelCount: 6, // Ensure only 6 labels are displayed
        }}
        style={styles.chart}
        bezier
      />

      <Text style={styles.chartTitle}>Humidity Over Time</Text>
      <LineChart
        data={{
          labels: getChartLabels(), // Only 6 labels
          datasets: [
            {
              data: getChartData('humidity'),
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="%"
        chartConfig={{
          ...chartConfigHumidity,
          xAxisLabelCount: 6, // Ensure only 6 labels are displayed
        }}
        style={styles.chart}
      />

    </ScrollView>
  );
};

// Chart configuration
const chartConfigTemp = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  propsForDots: {
    r: '2',
    strokeWidth: '2',
    stroke: '#e30f00',
  },
};

const chartConfigHumidity = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(30, 144, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  propsForDots: {
    r: '2',
    strokeWidth: '2',
    stroke: '#1e90ff',
  },
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1e90ff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
  },
  metricsContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: 'center',
  },
});
