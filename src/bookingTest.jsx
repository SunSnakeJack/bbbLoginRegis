import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function BookingTest() {
  const { roomId } = useParams(); 
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [inputs, setInputs] = useState({
    roomId: roomId, 
    checkIn: '',
    checkOut: ''
  });

  useEffect(() => {
    setInputs(prevInputs => ({ ...prevInputs, roomId: roomId })); 
  }, [roomId]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const token = localStorage.getItem('token');
    if (token) {
      myHeaders.append("Authorization", `Bearer ${token}`);
    }

    const raw = JSON.stringify({
      roomId: inputs.roomId,
      checkIn: inputs.checkIn,
      checkOut: inputs.checkOut
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
        if (result.status === 'ok') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'success'
          }).then(() => {
            localStorage.setItem('token', result.accessToken);
            navigate('/');
          });
        } else {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error'
          });
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>roomID
          <input
            type="number"
            name="roomId"
            value={inputs.roomId || ""}
            onChange={handleChange}
            readOnly 
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
  );
}

export default BookingTest;
