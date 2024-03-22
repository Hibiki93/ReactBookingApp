import React, { useEffect } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

function BookingCard({ booking }) {
  const bookingId = booking.bookingid;
  const [loading, setLoading] = useState(false);
  const deleteBooking = async (bookingID) => {
    alert(bookingID);
    const token = await AsyncStorage.getItem("tokenUser");
    if (startDate && endDate) {
      try {
        setLoading(true);
        const response = await fetch(`${config.apiURL}booking/${bookingID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          alert("Booking deleted successfully");
        } else {
          const errorMessage = await response.text();
          throw new Error(errorMessage || "Delete booking request failed");
        }
      } catch (error) {
        console.error("Error occurred while deleting booking:", error);
        alert("An error occurred while deleting booking");
      } finally{
        setLoading(false)
      }
    }
  };

  return (
    <View style={styles.card}>
      <Image
        style={styles.cardImage}
        source={{ uri: "https://picsum.photos/200/300" }}
      ></Image>
      <View style={styles.cardContent}>
        <Text style={styles.cardID}>Booking ID: {bookingId}</Text>
    </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteBooking(bookingId)}>
        <Icon
            name="trash"
            color={'#fff'}
            size={20}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 7,
    elevation: 2,
    backgroundColor:"#fff",
    marginBottom: 10,
    height: 70,
    width: "95%",
    marginLeft:"2.5%",
    justifyContent: "start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  cardContent: {
    marginVertical:10,
  },
  cardImage: {
    width: 50,
    height: 50,
    margin:10
  },
  deleteBtn:{
    marginLeft:"auto",
    justifyContent:"center",
    alignItems:"center",
    height:70,
    paddingRight:20,
    paddingLeft:20,
    backgroundColor:"#dd3d31"
  }
});

export default BookingCard;
