import React, { useState,useEffect } from 'react';
import {SafeAreaView,StyleSheet } from 'react-native';
import BookingCard from '../components/BookingCard';
import config from "../config/config";

function AdminHomeScreen(props) {

    const [booking,setBooking] = useState([]);

    useEffect(() => {
        const getBooking = async () => {
            try {
                const response = await fetch(`${config.apiURL}booking`);
                const data = await response.json();
                setBooking(data);
            } catch (error) {
                console.error('Error occurred while getting booking:', error);
                // Handle error here
            }
        };

        getBooking();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {booking.map((booking,index)=>(
                <BookingCard booking={booking} key={index}></BookingCard>
            ))}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        container: {
            paddingLeft: 10,
            paddingRight: 10,
          },
    }
});

export default AdminHomeScreen;