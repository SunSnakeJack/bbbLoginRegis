import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Register() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const [inputs, setInputs] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    async function checkEmailExists(email) {
        try {
            const response = await fetch('http://localhost:3333/checkEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            return data.exists;  // ค่าที่คืนกลับจากเซิร์ฟเวอร์
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return false;
        }
    }
    

    const validate = () => {
        let errors = {};
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const specialCharsPattern = /[^a-zA-Z]/g;
        const specialCharsPatternForPassword = /[!@#$%^&*(),.?":{}|<>~`/[\];'_+=-]/g;

        // Firstname 
        if (!inputs.fname) {
            errors.fname = "Firstname is required.";
        } else if (/\d/.test(inputs.fname)) {
            errors.fname = "Firstname cannot contain numbers.";
        } else if (specialCharsPattern.test(inputs.fname)) {
            errors.fname = "Firstname cannot contain special characters.";
        }


        //Lastname
        if (!inputs.lname) {
            errors.lname = "Lastname is required.";
        } else if (/\d/.test(inputs.lname)) {
            errors.lname = "Lastname cannot contain numbers.";
        } else if (specialCharsPattern.test(inputs.lname)) {
            errors.lname = "Lastname cannot contain special characters.";
        }


        //Email
        if (!inputs.email) {
            errors.email = "Email is required.";
        } else if (!emailPattern.test(inputs.email)) {
            errors.email = "Invalid email format.";
        } else {
            const emailExists = checkEmailExists(inputs.email); 
            if (emailExists) {
                errors.email = "This email is already registered.";
            }
        }


        //Password
        if (!inputs.password) {
            errors.password = "Password is required.";
        } else if(!/[A-Z]/.test(inputs.password)){
            errors.password = "Password must contain at least one uppercase letter." ;
        } else if(!/[a-z]/.test(inputs.password)){
            errors.password = "Password must contain at least one lowercase letter." ;
        } else if(!/\d/.test(inputs.password)){
            errors.password = "Password must contain at least one number." ;
        } else if(inputs.password.length < 8){
            errors.password = "Password must be at least 8 characters long." ;
        } else if (!specialCharsPatternForPassword.test(inputs.password)) {
            errors.password = "Password must contain at least one special character.";
        }

        console.log("Password validation errors:", errors.password);
        return errors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "fname": inputs.fname,
            "lname": inputs.lname,
            "email": inputs.email,
            "password": inputs.password,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:3333/register", requestOptions) 
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 'ok') {
                    MySwal.fire({
                        html: <i>{result.message}</i>,
                        icon: 'success'
                    }).then(() => {
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
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>First name:
                    <input
                        type="text"
                        name="fname"
                        value={inputs.fname || ""}
                        onChange={handleChange}
                    />
                </label>
                {errors.fname && <p style={{ color: 'red' }}>{errors.fname}</p>}
                <br />
                <label>Last name:
                    <input
                        type="text"
                        name="lname"
                        value={inputs.lname || ""}
                        onChange={handleChange}
                    />
                </label>
                {errors.lname && <p style={{ color: 'red' }}>{errors.lname}</p>}
                <br />
                <label>Email:
                    <input
                        type="text"
                        name="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                    />
                </label>
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                <br />
                <label>Password:
                    <input
                        type="password"
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                    />
                </label>
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                <br />
                <input type="submit" />
            </form>
        </div>
    )
}

export default Register;
