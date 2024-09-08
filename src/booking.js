import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


function Booking() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs(values => ({ ...values, [name]: value }));
  };

  function generateRandomString(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const bookingNumber = generateRandomString(8);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    if (token) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    }

    const raw = JSON.stringify({
      bookingNumber,
      roomId: inputs.roomId,
      checkIn: inputs.checkIn,
      checkOut: inputs.checkOut,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:3333/booking', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 'ok') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'success',
          }).then(() => {
            localStorage.setItem('token', result.accessToken);
            navigate('/');
          });
        } else {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error',
          });
        }
      })
      .catch((error) => console.error(error));
  };

  const room = {
    name: 'Deluxe Room',
    price: 2000,
    NumberOfRooms: 1,
    area: '50 sqm',
  };

  return (
    <div className="booking-container">
      <div className="booking-form">
        <h2>Book a Room</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Room ID:
            <input
              type="number"
              name="roomId"
              value={inputs.roomId || ''}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Check In:
            <input
              type="date"
              name="checkIn"
              value={inputs.checkIn || ''}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Check Out:
            <input
              type="date"
              name="checkOut"
              value={inputs.checkOut || ''}
              onChange={handleChange}
              required
            />
          </label>
          <input type="submit" value="Submit Booking" className="submit-btn" />
        </form>
      </div>

      <div className="reservation-summary">
        <h4><strong>Reservation Summary</strong></h4>
        <p>Room Name: <strong>{room.name}</strong></p>
        <p>Price: <strong>THB {room.price}</strong></p>
        <p>Number of Rooms: <strong>{room.NumberOfRooms}</strong></p>
        <p>Area: <strong>{room.area}</strong></p>
        <p><strong>Stay 2 Nights Extra Save 5%</strong></p>
        <button className="confirm-booking-btn">Confirm Booking</button>
      </div>
    </div>
  );
}

export default Booking;
