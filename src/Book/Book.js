import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import { userContext } from '../App';

const Book = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext)
  const [selectedDate, setSelectedDate] = useState({
    checkIn: new Date(),
    checkOut: new Date()
  });

  console.log( selectedDate,loggedInUser)

  const handleCheckInDate = (date) => {
    const newDates = { ...selectedDate }
    newDates.checkIn = date;
    setSelectedDate(newDates);

  };
  const handleCheckOutDate = (date) => {
    const newDates = { ...selectedDate }
    newDates.checkOut = date;
    setSelectedDate(newDates);
  };
  const handleBooking = () => {
    const newBooking = { ...selectedDate, ...loggedInUser };
    fetch('http://localhost:3020/addBooking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBooking)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }
  return (
    <div>
      <h5>This is booking</h5>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Check In Date"
            value={selectedDate.checkIn}
            onChange={handleCheckInDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Check Out Date"
            format="dd/MM/yyyy"
            value={selectedDate.checkOut}
            onChange={handleCheckOutDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />

        </Grid>
        <Button variant="contained" onClick={handleBooking} color="primary">
          Book Now
</Button>
      </MuiPickersUtilsProvider>

    </div>
  );
};

export default Book;