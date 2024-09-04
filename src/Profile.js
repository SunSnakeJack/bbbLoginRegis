import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Profile() {
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)

  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token')
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("http://localhost:3333/profile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok') {
          setUser(result.user)
          setIsLoaded(false)
        } else if (result.status === 'forbidden') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error'
          }).then((value) => {
            navigate('/')
          })
        }
        console.log(result)
      })
      .catch((error) => console.error(error));
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  if (isLoaded) {
    return (<div>Loading</div>)
  }
  else {
    console.log(user)
    return (
      <div>
        <div>{user.id}</div>
        <div>{user.email}</div>
        <div>{user.fname}</div>
        <div>{user.lname}</div>
        <div>
          <img 
            src={user.image ? `data:image/jpeg;base64,${user.image}` : 'default-image-url'} 
            alt={user.id} 
            width={100}
          />
        </div>
        <div><button onClick={logout}>logout</button></div>
      </div>
    )
  }

}

export default Profile
