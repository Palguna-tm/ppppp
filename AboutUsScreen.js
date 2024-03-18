import React from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Easing, ImageBackground, Image } from 'react-native';

const AboutUsScreen = () => {
  const fadeInAnim = new Animated.Value(0);

  const startAnimation = () => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    startAnimation();
  }, []);

  return (
    <ImageBackground
      source={require('./images/c.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View style={[styles.content, { opacity: fadeInAnim }]}>
          <Text style={styles.header}>We are EXOZEN</Text>
          <Text style={styles.subHeader}>We Create, Build, Develop IoT Solutions</Text>
          <Text style={styles.description}>
            EXOZEN, operating in Canada, UAE, UK, MENA, & India, is a leading Smart Society Service Provider & Product company in providing IoT solutions for Smart City, Water, Power, and Infrastructure Development for Total Project Solutions. With in-built capability to provide multi-disciplinary project teams comprising of its own core group of professionals and specialists from various domains.
          </Text>
          <Text style={styles.sectionHeader}>OUR MISSION</Text>
          <Text style={styles.sectionContent}>
            To deliver sustainable and innovative facilities management services that are scalable while ensuring safe and efficient performance of the built environment
          </Text>
          <Text style={styles.sectionHeader}>OUR VISION</Text>
          <Text style={styles.sectionContent}>
            To be a regional leader in providing integrated, quality facilities management solutions and deliver sustainable and innovative facilities management services
          </Text>
          <Text style={styles.sectionHeader}>OUR VALUES</Text>
          <Text style={styles.sectionContent}>
            We make a difference to our customers by using our management experience and applying expert knowledge through proven integrated management systems.
          </Text>
        </Animated.View>
        {/* Logo in the top right corner */}
        <View style={styles.logoContainer}>
          <Image source={require('./images/logo.png')} style={styles.logo} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
    color: '#333',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionContent: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
    color: '#555',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1, // Ensure the logo is above other elements
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default AboutUsScreen;
