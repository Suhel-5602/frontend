import React, { useState } from 'react'
import './Register.css'
import axios from 'axios';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPasssword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("password doesnot match..");
            return;
        }

        const data = {
            name: name,
            email: email,
            phone: phone,
            password: password,
        };
        try {
            const response = await axios.post("http://localhost:5000/user", data);
            alert(response.data);
            setName("");
            setEmail("");
            setPhone("");
            setPasssword("");
            setConfirmPassword("");
        } catch (error) {
            alert(error)
        }
    };

    return (
        <div className='register-container'>
            <form onSubmit={handleSubmit} >
                <h3>register form</h3>
                <div className='form control'>
                    <label> enter your name</label><br />
                    <input type='text' placeholder='enter your name' value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className='form control'>
                    <label> enter your email</label><br />
                    <input type='email' placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className='form control'>
                    <label> enter your phone number</label><br />
                    <input type='text' placeholder='enter your phone number' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>

                <div className='form control'>
                    <label> enter your password</label><br />
                    <input type='password' placeholder='enter your password' value={password} onChange={(e) => setPasssword(e.target.value)} required />
                </div>

                <div className='form control'>
                    <label> confirm your password</label><br />
                    <input type='password' placeholder='confirm your password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /><br /><br />
                </div>
                <button className='register-btn'>Register</button>

            </form>

        </div>
    )
}

export default Register