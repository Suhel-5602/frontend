import React, { useState } from 'react'
import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPasssword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post("http://localhost:5000/user/login", data);
            if (response.data.status === "error") {
                alert(response.data.message);
                return;
            }else{
                alert(response.data.message);
                const user=response.data.data;
                localStorage.setItem("user",JSON.stringify(user));
                props.setCurrentUser(user)
                setTimeout(()=>{
                    navigate("/tasks");
                    
                },500);

            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className='login-container'>
            <h3>Login Form</h3>
            <form onSubmit={handleSubmit} >
                <div className='form control'>
                    <label> enter your email</label><br />
                    <input type='email' placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />
                </div>

                <div className='form control'>
                    <label> enter your password</label><br />
                    <input type='password' placeholder='enter your password' value={password} onChange={(e) => setPasssword(e.target.value)} required /><br /><br />
                </div>
                <button className='login-btn'>Login</button>
            </form>

        </div>
    )
}

export default Login