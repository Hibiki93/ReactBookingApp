import React, { useState, useEffect } from "react";
import config from "../config/config";
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  Platform,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";

function UserHomeScreen(props) {
  const [firstName, setFirstName] = useState("Eric");
  const [lastName, setLastName] = useState("Pang");
  const [userName, setUserName] = useState("Eric Pang");
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [today, setToday] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [totalCost, setTotalCost] = useState('0');

  const [isPaidDeposit, setIsPaidDeposit] = useState(false);

  const [specialties, setSpecialties] = useState([
    "Breakfast",
    "Lunch",
    "Dinner",
    "None"
  ]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("None");

  const handleStartDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    const currentDate = selectedDate || startDate;
    if (currentDate < new Date()) {
      setStartDate(new Date());
    } else if (currentDate >= endDate) {
      setStartDate(endDate);
    } else {
      setStartDate(currentDate);
      calculateCost();
    }
  };
  const handleEndDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
    calculateCost();
  };

  const handleSelectSepcialty = (selectedSpecialty) => {
    if (selectedSpecialty) {
      setSelectedSpecialty(selectedSpecialty);
    }
  };

  const handleChangeName = () => {
    const newName = `${firstName} ${lastName}`;
    setUserName(newName);
    setModalVisible(false); // Close the modal after changing the name
  };

  const calculateCost = () => {
    const oneDayCost = 50;
    let daysDifference = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    let cost = 0;
    cost = oneDayCost * daysDifference;
    setTotalCost(cost)
  }

  const [loading, setLoading] = useState(false);

  const bookNow = async()=>{
    if(startDate && endDate){
      try {
        setLoading(true);
        const response = await fetch(`${config.apiURL}booking`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "firstname" : firstName,
            "lastname" : lastName,
            "totalprice" : totalCost,
            "depositpaid" : false,
            "bookingdates" : {
                "checkin" : formatDate(startDate),
                "checkout" : formatDate(endDate)
            },
            "additionalneeds" : selectedSpecialty
          })
        });
        const data = await response.json();
        alert('Booking submitted success')
       
      } catch (error) {
        console.error('Error occurred while submit:', error);
      } finally{
        setLoading(false);
      }
    }
  }

  const  formatDate= (date)=> {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    var formattedDate = year + '-' + month + '-' + day;
    
    return formattedDate;
}

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Image
              style={styles.cardImage}
              source={{ uri: "https://picsum.photos/200/300" }}
            ></Image>
            <View>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.userNameRow}>
                  <Text style={styles.cardName}>{userName}</Text>
                  <Icon
                    name="edit"
                    size={20}
                    onPress={() => setModalVisible(true)}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.mutedText}>from Malaysia Johor</Text>
            </View>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.cardTitle}>First Name</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                placeholder="First Name"
              />
              <Text style={styles.cardTitle}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                placeholder="Last Name"
              />
              <Button title="Save" onPress={handleChangeName} />
            </View>
          </View>
        </Modal>
        
        <View style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>Pick Check In Date</Text>
          </View>
          <View>
            {showDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                minimumDate={today}
                onChange={handleStartDateChange}
              />
            )}
            <Text>Selected Date: {startDate.toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.card}>
        <View>
            <Text style={styles.cardTitle}>Pick Check Out Date</Text>
          </View>     
          <View>
            {showDatePicker && (
              <DateTimePicker
                value={endDate}
                minimumDate={startDate}
                mode="date"
                display="default"
                onChange={handleEndDateChange}
              />
            )}
            <Text>Selected Date: {endDate.toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.card}>
        <View style={styles.viewMargin}>
            <Text style={styles.cardTitle}>Choose a Specialty</Text>
          </View>
          <View style={styles.viewMargin}>
            <View style={styles.tagContainer}>
              {specialties.map((specialty, index) => (
                <TouchableOpacity style={styles.tabPill} key={index}>
                  <Text
                    style={styles.tabPillText}
                    onPress={() => handleSelectSepcialty(specialty)}
                  >
                    {specialty}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text>Selected: {selectedSpecialty}</Text>
          </View>
        </View>
        
        <View style={styles.card}>
          <View style={styles.priceArea}>
                <Text style={styles.price}>MYR {totalCost}</Text>
          </View>

          <View>
            <TouchableOpacity style={styles.bookingBtn} onPress={bookNow}>
              <Text style={styles.bookingText}>{loading ? 'Submitting...' : 'Book Now!'}</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop:10,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 17,
    elevation: 1,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom:20,
    borderRadius:5,
  },
  row: {
    flexDirection: "row",
  },
  cardName: {
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 10,
  },
  userNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  mutedText: {
    color: "#808080",
    fontSize: 12,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  tagContainer: {
    flexDirection: "row",
    marginBottom:10
  },
  tabPill: {
    backgroundColor: "#2196f3",
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    height: 30,
    marginRight:5
  },
  tabPillText: {
    color: "white",
    fontSize: 14,
  },
  viewMargin: {
    marginBottom: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bookingBtn:{
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#2196f3",
  },
  bookingText:{
    color:"white"
  },
  priceArea:{
    justifyContent:"center",
    alignItems:"center"
  },
  price:{
    marginTop:20,
    fontWeight:"bold",
    fontSize:20,
  }
});

export default UserHomeScreen;
