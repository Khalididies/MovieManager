import React from 'react'
import "./Login.css"
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function Register() {
    
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const login = async () => {
        try {
            await axios.post("http://localhost:8000/api/Users", user)
            navigate("/")
        }catch(e) {
            console.log(e)
        }
    }

    return (
        <div className='login-container'>
            FirstName: <input onChange={e => setUser({ ...user, FirstName: e.target.value })} type='text' /> <br />
            LastName: <input onChange={e => setUser({ ...user, LastName: e.target.value })} type='text' /> <br />
            Username: <input onChange={e => setUser({ ...user, Username: e.target.value })} type='text' /> <br />
            Password: <input onChange={e => setUser({ ...user, Password: e.target.value })} type='password' /> <br />
            <button onClick={login}>Register</button>
        </div>
    )
}
