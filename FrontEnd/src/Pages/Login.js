import React from 'react'
import "./Login.css"
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const login = async () => {
        try {
            const resp = await axios.post("http://localhost:8000/api/auth/login", user)
            sessionStorage.setItem("x-access-token", resp.data.token)
            sessionStorage.setItem('username', resp.data.user.FirstName);
            sessionStorage.setItem('userid', resp.data.id);
            navigate("/MainPage")
        } catch (e) {
            alert("error")
            console.log(e)
        }

    }

    const register = async () => {
        try {
            navigate("/register")
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div>
            <section class="container">
                <div class="login-container">
                    <div class="circle circle-one"></div>
                    <div class="form-container">
                        <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" class="illustration" />
                        <h1 class="opacity">LOGIN</h1>
                        <form onSubmit={e => e.preventDefault()} >
                            <input onChange={e => setUser({ ...user, Username: e.target.value })} type='text' placeholder="Username" />
                            <input onChange={e => setUser({ ...user, Password: e.target.value })} type='password' placeholder="PASSWORD" />
                            <button type="submit" onClick={login} class="opacity">SUBMIT</button>
                        </form >
                        <div class="register-forget opacity" >
                            <a onClick={register}>REGISTER</a>
                        </div>
                        <div class="form-container" >
                            <h4>Developer : <button class="opacity" ><a href="http://localhost:8000/api/api-docs" >Swagger</a></button></h4>
                        </div>
                    </div>
                    <div class="circle circle-two"></div>
                </div>
                <div class="theme-btn-container"></div>
            </section>
        </div>
    )
}
