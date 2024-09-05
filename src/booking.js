import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Booking() {
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // Get token from localStorage or other secure storage
    const token = localStorage.getItem('token');
    if (token) {
      myHeaders.append("Authorization", `Bearer ${token}`);
    }
  
    const raw = JSON.stringify({
      "roomId": inputs.roomId,
      "checkIn": inputs.checkIn,
      "checkOut": inputs.checkOut,
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    fetch("http://localhost:3333/booking", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.status === 'ok') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'success'
          }).then((value) => {
            localStorage.setItem('token',  result.accessToken)
            navigate('/')
          })
        } else {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error'
          })
        }
      })
      .catch((error) => console.error(error));

    console.log(inputs);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>roomID
          <input
            type="number"
            name="roomId"
            value={inputs.roomId || ""}
            onChange={handleChange}
          />
        </label>
        <label>checkIn
          <input
            type="date"
            name="checkIn"
            value={inputs.checkIn || ""}
            onChange={handleChange}
          />
        </label>
        <label>checkOut
          <input
            type="date"
            name="checkOut"
            value={inputs.checkOut || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  )
}

export default Booking
