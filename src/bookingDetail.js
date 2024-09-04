import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function BookingDetails() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [isLoaded, setIsLoaded] = useState(true);
  const [booking, setBooking] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`http://localhost:3333/bookingDetail`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok') {
          setBooking(result.booking);
          setIsLoaded(false);
        } else if (result.status === 'forbidden') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error'
          }).then(() => {
            navigate('/');
          });
        }
        console.log(result);
      })
      .catch((error) => console.error(error));
  }, [MySwal, navigate]);

  

  if (isLoaded) {
    return <div>Loading...</div>;
  } else {
    console.log(booking);
    return (
      <div>
        <h2>Booking Details</h2>
        <div> {booking.Username}</div>
        <div> {booking.NumberOfRooms}</div>
        <div> {booking.roomName}</div>
        <div> {booking.roomType}</div>
        <div> {booking.roomPrice}</div>
        <div> {booking.roomArea} </div>
        <div> {new Date(booking.checkIn).toLocaleDateString()}</div>
        <div> {new Date(booking.checkOut).toLocaleDateString()}</div>
        <div>
          <img 
            src={booking.roomImage ? `data:image/jpeg;base64,${booking.roomImage}` : 'default-room-image-url'} 
            alt={booking.roomName} 
            width={100}
          />
        </div>
      </div>
    );
  }
}

export default BookingDetails;
