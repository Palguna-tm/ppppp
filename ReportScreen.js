import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableHighlight } from 'react-native';
// import { BarChart } from 'react-native-svg-charts';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import Svg, { Text as SvgText } from 'react-native-svg';

const ReportScreen = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('https://zenapi.in/p_monthwisereport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected_month: 3, selected_year: 2024, project_name: "Ahp_Woods" }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch reports: ' + response.statusText);
      }
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const screenWidth = Dimensions.get('window').width;

  const renderBarChart = () => {
    // Check if reports is an array and not empty
    if (!Array.isArray(reports) || reports.length === 0) {
      return null; // Return null or any other placeholder component if reports is empty or not an array
    }

    const barChartData = {
      labels: reports.map(item => item._id.cust_house_number),
      datasets: [{ data: reports.map(item => item.consumption) }],
    };

    // Check if datasets[0].data is an array of numbers
    const consumptionData = barChartData.datasets[0].data;
    if (!Array.isArray(consumptionData) || consumptionData.some(isNaN)) {
      console.error("Consumption data is not in the correct format:", consumptionData);
      return null; // Return null or any other placeholder component if data is not in the correct format
    }

    return (
      <View style={styles.chartContainer}>
        <BarChart
          data={{
            labels: barChartData.labels,
            datasets: [{ data: barChartData.datasets[0].data }],
          }}
          width={screenWidth - 32}
          height={200}
          chartConfig={chartConfig}
          style={styles.chart}
          yAxisSuffix="KL"
          withVerticalLabels={true}
          fromZero={true}
          svg={{
            strokeWidth: 2,
            stroke: 'black',
          }}
        />
        <TouchableWithoutFeedback>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            {barChartData.labels.map((label, index) => (
              <Svg key={index}>
                <SvgText
                  x={(index * (screenWidth - 32)) / barChartData.labels.length}
                  y="0"
                  fill="#000"
                  fontSize="12"
                  textAnchor="middle"
                >
                  {label}
                </SvgText>
              </Svg>
            ))}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Report</Text>
      <FlatList
        data={reports}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.reportItem}>
            <Text style={styles.reportItemText}>House Number: {item._id.cust_house_number}</Text>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, styles.dateText]}>Date</Text>
              <Text style={[styles.heading, styles.consumptionText]}>Consumption</Text>
            </View>
            {item.con_dates.map((date, idx) => (
              <TouchableHighlight key={idx} underlayColor="#eee" style={styles.rowHighlight}>
                <View style={styles.dateConsumptionContainer}>
                  <Text style={[styles.dateText, styles.cell]}>{date.datetime}</Text>
                  <Text style={[styles.consumptionText, styles.cell]}>{date.consumption}</Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        )}
      />
      {renderBarChart()}
    </View>
  );
};

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(32, 178, 170, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  reportItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  reportItemText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  dateConsumptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  consumptionText: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  cell: {
    paddingVertical: 8,
  },
  rowHighlight: {
    borderRadius: 5,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  chart: {
    borderRadius: 16,
  },
});

export default ReportScreen;
