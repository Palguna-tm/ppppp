import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';

const RealTimeGraph = () => {
  const [dailyData, setDailyData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  
  const [weeklyData, setWeeklyData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    // Fetch daily graph data from API
    const fetchDailyData = async () => {
      try {
        const response = await fetch('https://zenapi.in/30days_graph_consumption_LPCD_Nabagram/Tripura');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Extracting consumption and date from the response
        const graphData = data.map(item => ({ date: item.date, consumption: item.consumption }));
        // Setting up the daily data for the LineChart
        setDailyData({
          labels: graphData.map(item => item.date),
          datasets: [{ data: graphData.map(item => item.consumption) }],
        });
        // Fade in animation
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }
        ).start();
      } catch (error) {
        console.error('Error fetching daily graph data:', error);
        // You can handle the error here, e.g., show an error message to the user
      }
    };

    // Fetch weekly graph data from API
    const fetchWeeklyData = async () => {
      try {
        const response = await fetch('https://zenapi.in/30days_graph_consumption_LPCD_Nabagram/Tripura');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Extracting consumption and date from the response
        const graphData = data.map(item => ({ date: item.date, consumption: item.consumption }));
        // Setting up the weekly data for the LineChart
        setWeeklyData({
          labels: graphData.map(item => item.date),
          datasets: [{ data: graphData.map(item => item.consumption) }],
        });
      } catch (error) {
        console.error('Error fetching weekly graph data:', error);
        // You can handle the error here, e.g., show an error message to the user
      }
    };

    fetchDailyData();
    fetchWeeklyData();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
        <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 10 }}>Real Time Data</Text>
        <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20 }}>Welcome to Real Time Graphs...!</Text>
      </Animated.View>
      
      {/* Display the daily graph */}
      <View style={styles.graphContainer}>
        <Text style={styles.heading}>Daily</Text>
        <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        </Animated.Text>
        <LineChart
          data={dailyData}
          width={1000} // Increased graph width
          height={220}
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Change color to black
            style: {
              borderRadius: 16,
            },
          }}
          bezier
        />
      </View>
      
      {/* Display the weekly graph */}
      <View style={styles.graphContainer}>
        <Text style={styles.heading}>Weekly</Text>
        <LineChart
          data={weeklyData}
          width={1000} // Increased graph width
          height={220}
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Change color to black
            style: {
              borderRadius: 16,
            },
          }}
          bezier
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center',
    paddingTop: 15, // Add padding to the top
  },
  textContainer: {
    position: 'absolute',
    top: 0,
  },
  graphContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50, // Adjust the margin between graphs
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default RealTimeGraph;
