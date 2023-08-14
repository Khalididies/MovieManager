import React from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'
export default function Navbar() {
    const navigate = useNavigate()

    const getout = () => {
      sessionStorage.setItem("x-access-token", "")
      sessionStorage.setItem('username', "");
      sessionStorage.setItem('userid', "");
      navigate("/") 
  }

  return (
    <ul >
    <li onClick={() => navigate("/MainPage")} ><a>Movies</a></li>
    <li onClick={() => navigate("/Subscriptions")} ><a>Subscriptions</a></li>
    {/* <li onClick={() => navigate("/UsersManagment")} ><a>Users Managment</a></li> */}
    <li onClick={() => getout()} ><a>logOut</a></li>
    <li onClick={() => navigate("/Register")} ><a>Register</a></li>
    </ul>
  )
}
