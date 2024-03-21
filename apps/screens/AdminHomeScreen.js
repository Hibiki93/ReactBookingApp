import React, { useState,useEffect } from 'react';
import {SafeAreaView } from 'react-native';
import BookingCard from '../components/BookingCard';
import config from "../config/config";

function AdminHomeScreen(props) {
    const getBooking = async()=>{
        try{
            const response = await fetch(`${config.apiURL}booking`);
            const data = await response.json();
            setBooking(data);
            set
        }
        catch (error) {
            console.error('Error occurred while getting booking:', error);
            // Handle error here
          }
    }
    const [booking,setBooking] = useState([]);

    useEffect(()=>{
        getBooking();
      });

    return (
        <SafeAreaView>
            {booking.map((booking,index)=>(
                <BookingCard booking={booking} key={index}></BookingCard>
            ))}
        </SafeAreaView>
    );
}

export default AdminHomeScreen;