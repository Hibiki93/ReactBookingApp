import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

function BookingCard({booking}) {
    // Check if booking is undefined or null to prevent errors
    if (!booking) {
        return null; // Or handle it appropriately
    }

    // Access the bookingid property
    const bookingId = booking.bookingid;
    return (
        <View style={styles.card}>
            <Text style={styles.cardID}>Booking ID: {booking.bookingid}</Text>
            <Image style={styles.cardImage} source={{uri:"https://picsum.photos/200/300"}}></Image>
        </View>
    );
}

const styles = StyleSheet.create({
    card:{
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.75,
        shadowRadius: 17,
        elevation: 10, 
        // backgroundColor:"black",
        marginBottom:10,
        height:70,
        width:"80%",
        justifyContent:"start",
        alignItems:"flex-start"
    },
    cardID:{
    },
    cardImage:{
        width: 70,
        height: 70,
    }
    
});

export default BookingCard;