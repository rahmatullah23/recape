import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const [bookings,setBookings] =useState([])
    useEffect(() =>{
        fetch('http://localhost:3020/bookings?email='+loggedInUser.email)
        .then(res => res.json())
        .then(data => setBookings(data))
    },[])
    return (
        <div>
            <h4>This is Booking lists</h4>
            {
                bookings.map(book => <li>{book.email}from:{(new Date(book.checkIn).toDateString('dd/MM/yyyy'))}</li>)
            }

        </div>
    );
};

export default Bookings;