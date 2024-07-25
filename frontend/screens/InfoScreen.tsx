import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Define the types for emergency information
interface EmergencyInfo {
  number: string;
  description: string;
}

interface EmergencyInfoMap {
  [country: string]: EmergencyInfo[];
}

const InfoScreen: React.FC<{ onGoBack: () => void }> = ({ onGoBack }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('Israel');
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  // Define emergency info
  const emergencyInfo: EmergencyInfoMap = {
    Israel: [
      { number: '100', description: 'משטרת ישראל: דיווח על נפלים ואירועים הקשורים לביטחון פנים, למשל הפרעות סדר ואירועי טרור.' },
      { number: '101', description: 'מד"א: דיווח על נפגעים וקבלת עזרה ראשונה.' },
      { number: '102', description: 'כבאות והצלה: דיווח על שריפות וחילוץ לכודים.' },
      { number: '103', description: 'חברת חשמל: מידע בנוגע להפסקות חשמל.' },
      { number: '104', description: 'פיקוד העורף: מידע, הנחיות והתרעות בזמן חירום.' },
    ],
  };

  // Define country flags
  const countryFlags: { [key: string]: string } = {
    Israel: '🇮🇱',
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.subheader}>Emergency Info</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdownButton}>
        <Text style={styles.dropdownText}>
          {countryFlags[selectedCountry]} {selectedCountry}
        </Text>
        <Icon name="caret-down" size={20} color="#000" style={styles.dropdownIcon} />
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {Object.keys(emergencyInfo).map((country) => (
              <TouchableOpacity
                key={country}
                onPress={() => {
                  setSelectedCountry(country);
                  setModalVisible(false);
                }}
                style={styles.modalItem}
              >
                <Text style={styles.modalText}>
                  {countryFlags[country]} {country}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.infoContainer}>
        {emergencyInfo[selectedCountry]?.map((info, index) => (
          <View key={index} style={styles.infoItem}>
            <View style={styles.phoneContainer}>
              <Icon name="phone" size={24} color="#000" style={styles.phoneIcon} />
              <Text style={styles.phoneNumber}>{info.number}</Text>
            </View>
            <Text style={styles.description}>{info.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBackground: {
    backgroundColor: '#fff', // White background
    paddingTop: 50, // Adjust padding to move header lower
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15, // Adjusted to make it lower
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    backgroundColor: '#388E3C', // Slightly darker green for the button
    borderRadius: 50,
    padding: 10,
    marginRight: 10, // Space between button and subheader
  },
  subheader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#388E3C',
    flex: 1,
    textAlign: 'center',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    padding: 10,
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownText: {
    fontSize: 20,
    flex: 1,
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalText: {
    fontSize: 18,
  },
  infoContainer: {
    padding: 20,
  },
  infoItem: {
    marginVertical: 15,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneIcon: {
    marginRight: 10,
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default InfoScreen;
