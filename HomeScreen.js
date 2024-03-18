import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
// import { Path, Rect } from 'react-native-svg';

import { useNavigation } from '@react-navigation/native';
// import { ImageSourcePropType } from 'react-native';



const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
  const [todayUsage, setTodayUsage] = useState(0);
  const [weekUsage, setWeekUsage] = useState(0);
  const [monthUsage, setMonthUsage] = useState(0);
  const [forecastUsage, setForecastUsage] = useState(0);

  const [barChartData, setBarChartData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [selectedCalendar, setSelectedCalendar] = useState('0');
  const [chartHeading, setChartHeading] = useState('');
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleNotificationPress = () => {
   
  };
  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  // const navigation = useNavigation();

  const handleProfilePress = () => {
    console.log('Profile icon pressed');
    navigation.navigate('Profile'); // Navigate to "ProfileScreen"
  };

  const handleLogoutPress = () => {
    // Navigate to the login page
    navigation.navigate('Login');
  };

  const handleBarGraphPress = () => {
    navigation.navigate('Report'); // Navigate to "ReportScreen"
  };

  const handleRealTimeGraphPress = () => {
    navigation.navigate('RealTimeGraph'); // Navigate to "RealTimeGraphScreen"
  };
  const handleAboutUsPress = () => {
    navigation.navigate('AboutUs'); // Navigate to "AboutUs" screen
  };
  
  const handleTooltipPress = (value, index, x, y) => {
    console.log('Tooltip pressed:', value, index, x, y);
    setTooltipData({ value, index });
    setTooltipPosition({ x, y: y - 40 });
  };
  
  
  const hideTooltip = () => {
    setTooltipData(null);
  };
  const handleCalendarClick = (calendar) => {
    console.log('Clicked calendar:', calendar);
    setSelectedCalendar(calendar);
    switch (calendar) {
      case 'today':
        setBarChartDataAndHeading('today', 'Consumption Chart for Today');
        break;
      case 'week':
        setBarChartDataAndHeading('week', 'Consumption Chart for Week');
        fetchweekData(); // Fetch week data here
        break;
      case 'month':
        setBarChartDataAndHeading('month', 'Consumption Chart for Month');
        fetchMonthData(); // Fetch month data here
        break;
      case 'forecast':
        setBarChartDataAndHeading('forecast', 'Forecast Consumption Chart');
        break;
      default:
        break;
    }
  };


  const setBarChartDataAndHeading = async (calendarType, heading) => {
    let url = '';
    console.log('Setting chart heading:', heading);
    switch (calendarType) {
      case 'today':
        url = 'https://zenapi.in/30days_graph_consumption_PS01_Pondugala/Pondugala';
        break;
      case 'week':
        url = 'https://zenapi.in/30days_graph_consumption_LPCD_Nabagram/Tripura'; // Week data URL
        break;
      case 'month':
        url = 'https://zenapi.in/30days_graph_consumption_LPCD_Nabagram/Tripura';
        break;
      case 'forecast':
        url = 'https://zenapi.in/30days_graph_consumption_LPCD_Nabagram/Tripura'; // Forecast data URL
        break;
      default:
        break;
    }
    try {
      const response = await fetch(url);
      const responseData = await response.json();

      console.log('Received data:', responseData); // Log the received data

      if (Array.isArray(responseData)) {
        const chartData = {
          labels: responseData.map(entry => entry.date),
          datasets: [{
            data: responseData.map(entry => entry.consumption)
          }]
        };
        setBarChartData(chartData);
        setChartHeading(heading);
      } else {
        console.error('Error fetching chart data: Response data array not found');
      }
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };


  useEffect(() => {
    fetchtodayData();
    fetchForecastData();
  }, []);

  useEffect(() => {
    fetchtodayData();
    fetchForecastData();
  }, []);

  useEffect(() => {
    fetchtodayData();
    fetchForecastData();
  }, []);

  const fetchtodayData = async () => {
    try {
      const response = await fetch('https://zenapi.in/p_present_con/Ahp_Woods');
      const data = await response.json();
      setTodayUsage(Math.round((data.today_consumption) / 100000) + ' KL'); // Assuming 'today_consumption' exists in your response
    } catch (error) {
      console.error('Error fetching card data:', error);
    }
  };

  const fetchweekData = async () => {
    try {
      const response = await fetch('https://zenapi.in/p_week_con/Ahp_Woods');
      const data = await response.json();
      setWeekUsage(Math.round((data.week_consumption) / 100000) + ' KL'); // Assuming 'week_consumption' exists in your response
    } catch (error) {
      console.error('Error fetching week data:', error);
    }
  };

  const fetchMonthData = async () => {
    try {
      const response = await fetch('https://zenapi.in/p_month_con/Ahp_Woods');
      const data = await response.json();
      setMonthUsage(Math.round((data.month_consumption) / 100000) + ' KL'); // Assuming 'month_consumption' exists in your response
    } catch (error) {
      console.error('Error fetching month data:', error);
    }
  };

  const fetchForecastData = async () => {
    try {
      const response = await fetch('https://zenapi.in/p_month_con/Ahp_Woods');
      const data = await response.json();
      setForecastUsage(Math.round((data.forecast_consumption) / 100000) + ' KL'); // Assuming 'forecast_consumption' exists in your response
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  const renderTooltip = () => {
    if (tooltipData) {
      return (
        <View style={[styles.tooltipContainer, { left: tooltipPosition.x, top: tooltipPosition.y }]}>
          <Text style={styles.tooltipText}>{tooltipData.value} KL</Text>
        </View>
      );
    }
    return null;
  };
  
  
  const Footer = () => {
    return (
      <View style={styles.footer}>
      <TouchableOpacity onPress={handleRealTimeGraphPress} style={styles.footerIcon}>
          <MaterialCommunityIcons name="chart-line" size={24} color="black" />
        </TouchableOpacity>

     
          <TouchableOpacity onPress={handleBarGraphPress} style={styles.footerIcon}>
          <MaterialCommunityIcons name="chart-bar" size={24} color="black" />
        </TouchableOpacity>


        <View style={styles.circleContainer}>
          <TouchableOpacity onPress={() => console.log('Home icon pressed')} style={styles.homeIcon}>
            <MaterialCommunityIcons name="home" size={24} color="black" />
          </TouchableOpacity>
        </View>
       
        <TouchableOpacity onPress={handleAboutUsPress} style={styles.footerIcon}>
        <MaterialCommunityIcons name="information-outline" size={24} color="black" />
      </TouchableOpacity>

        <TouchableOpacity onPress={handleProfilePress} style={styles.footerIcon}>
  <MaterialCommunityIcons name="account-circle" size={24} color="black" />
</TouchableOpacity>
       
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
  <View style={styles.header}>
  <View style={styles.triangle} />
  <TouchableOpacity onPress={handleMenuPress} style={styles.logoContainer}>
    <Image source={require('./images/exozenlogo.png')} style={styles.logo} />
  </TouchableOpacity>

  <View style={styles.centerText}>
    <Text style={styles.centerTextContent}>AHP FLAT NO:A01</Text>
  </View>

  <TouchableOpacity onPress={handleNotificationPress} style={styles.iconContainer}>
    <MaterialCommunityIcons name="bell-outline" size={24} color="black" style={styles.bellOutline} />
    {/* <MaterialCommunityIcons name="bell" size={24} color="white" style={styles.bellInterior} /> */}
  </TouchableOpacity>

  <TouchableOpacity onPress={handleLogoutPress} style={styles.iconContainer}>
  <MaterialCommunityIcons name="power" size={24} color="black" />
</TouchableOpacity>

</View>


      <View style={styles.calendarContainer}>
  <View style={styles.circleContainer}>
    <View style={styles.circleOutline}>
      <TouchableOpacity onPress={() => handleCalendarClick('today')} style={styles.circle}>
        <MaterialCommunityIcons name="calendar" size={24} color={selectedCalendar === 'today' ? 'blue' : 'black'} />
      </TouchableOpacity>
    </View>
    <Text style={styles.todayText}>Today</Text>
  </View>

  <View style={{ width: 20 }} />

  <View style={styles.circleContainer}>
    <View style={styles.circleOutline}>
      <TouchableOpacity onPress={() => handleCalendarClick('week')} style={styles.circle}>
        <MaterialCommunityIcons name="calendar" size={24} color={selectedCalendar === 'week' ? 'blue' : 'black'} />
      </TouchableOpacity>
    </View>
    <Text style={styles.weekText}>Week</Text>
  </View>

  <View style={{ width: 20 }} />

  <View style={styles.circleContainer}>
    <View style={styles.circleOutline}>
      <TouchableOpacity onPress={() => handleCalendarClick('month')} style={styles.circle}>
        <MaterialCommunityIcons name="calendar" size={24} color={selectedCalendar === 'month' ? 'blue' : 'black'} />
      </TouchableOpacity>
    </View>
    <Text style={styles.monthText}>Month</Text>
  </View>

  <View style={{ width: 20 }} />
  
  <View style={styles.circleContainer}>
  <View style={styles.circleOutline}>
    <TouchableOpacity onPress={() => handleCalendarClick('forecast')} style={styles.circle}>
      <MaterialCommunityIcons name="chart-line" size={24} color={selectedCalendar === 'forecast' ? 'blue' : 'black'} />
    </TouchableOpacity>
  </View>
  <Text style={styles.forecastText}>Forecast</Text>
</View>

</View>

      <View style={styles.cardRow}>
        <View style={[styles.card, styles.cardSpacing, { backgroundColor: '#20b2aa' }]}>
          <Text style={styles.cardTitle}>Today Usage</Text>
          <Text style={styles.cardData}>{todayUsage}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: '#20b2aa' }]}>
          <Text style={styles.cardTitle}>Week Usage</Text>
          <Text style={styles.cardData}>{weekUsage}</Text>
        </View>

        <View style={[styles.card, styles.cardSpacing, { backgroundColor: '#20b2aa' }]}>
          <Text style={styles.cardTitle}>Month Usage</Text>
          <Text style={styles.cardData}>{monthUsage}</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#20b2aa' }]}>
          <Text style={styles.cardTitle}>Forecast Usage</Text>
          <Text style={styles.cardData}>{forecastUsage}</Text>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={hideTooltip}>
        <View style={styles.barChartContainer}>
          <Text style={styles.chartHeading}>{chartHeading}</Text>
          <BarChart
            data={{
              labels: barChartData.labels,
              datasets: [
                {
                  data: barChartData.datasets[0].data,
                },
              ],
            }}
            width={screenWidth - 32}
            height={200}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(32, 178, 170, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              yAxisLabel: '',
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            yAxisSuffix="KL"
            withVerticalLabels={true}
            fromZero={true}
            onDataPointClick={({ value, index, x, y }) => handleTooltipPress(value, index, x, y)}
            decorator={() => (
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
            )}
          />
          {tooltipData && (
           <View style={[styles.tooltipContainer, { left: tooltipPosition.x, top: tooltipPosition.y }]}>
           <Text style={styles.tooltipText}>{tooltipData.value} KL</Text>
         </View>
         
         
          )}
        </View>
      </TouchableWithoutFeedback>
      <Footer />
    </View>
  );
};
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 35, 
      backgroundColor: '#20b2aa', // Change the background color to the desired color
    },
    logoContainer: {
      marginRight: 'auto', // Move logo container to the right
      // marginRight: 20, // Add some margin from the right side
    },
    logo: {
      width: 200,
      height: 50,
      resizeMode: 'contain',
    },
    iconContainer: {
      padding: 15,
    },
    middleContainer: {
      alignItems: 'center',
    },
    barChartContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    chartHeading: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    headerText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white', // Change the text color to white
    },
    calendarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    circleContainer: {
      alignItems: 'center',
      marginRight: 20,
    },
    circleOutline: {
      borderWidth: 2,
      borderColor: '#20b2aa',
      borderRadius: 27,
      padding: 2,
    },
    circle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dayNumber: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
      position: 'absolute',
      top: '30%',
    },
    todayText: {
      marginTop: 5,
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    checkIcon: {
      position: 'absolute',
    },
    weekNumber: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
    weekText: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
    monthNumber: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
    monthText: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
    forecastText: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
    centerText: {
      flex: 1, // Take up remaining space
      alignItems: 'center', // Align text to center horizontally
    },
    centerTextContent: {
      fontSize: 18, // Adjust font size as needed
      fontWeight: 'bold', // Add fontWeight as needed
      color: 'white', // Change color as needed
    },

    footer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      height: 50,
    },
    footerIcon: {
      paddingHorizontal: 10,
    },
    circleContainer: {
      position: 'relative',
    },
    homeIcon: {
      backgroundColor: '#20b2aa',
      borderRadius: 50,
      padding: 10,
    },
  
    pieChartContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    cardRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    card: {
      width: screenWidth * 0.25,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    cardSpacing: {
      marginHorizontal: 15,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'white',
    },
    cardData: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
    },
  });
  

  
export default HomeScreen;