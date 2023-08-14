import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import "./Movie.css"
// import "../NavBar/Navbar.css"

export default function AddMovie() {
    const [Movie, setMovie] = useState({})
    const navigate = useNavigate()

    const AddPost = async () => {
        try {
            const token = sessionStorage.getItem("x-access-token")
            const resp = await axios.post(`http://localhost:8000/api/Movies`, Movie, {
                headers: { "x-access-token": token }
            })
            alert(resp.data)
        } catch (e) {
            setMovie([])
            alert("Invalid Token")
            navigate("/")
        }
    }

    return (
        <div >
            <h1>Welcome, {sessionStorage.getItem("username")}</h1><br />
            <h1>Add Movie</h1>
            <ul>
                <li onClick={() => navigate("/Addmovie")} className='nav-item'><a>Add Movies</a></li>
                <li onClick={() => navigate("/MainPage")} className='nav-item'><a>Movies</a></li>
                <br />
            </ul>
            <div >
                <p>Please fill in this form to Add Movie.</p>
                <hr />
                <label for="Name"><b>Name</b></label>
                <input type="text" class='inputadd' placeholder="Enter Name" name="Name" required onChange={e => setMovie({ ...Movie, name: e.target.value })} />
                Genres : <input placeholder="Enter Genres" onChange={e => setMovie({ ...Movie, Genres: e.target.value, })} type='text' /><br />
                Image URL : <input placeholder="Enter URL" onChange={e => setMovie({ ...Movie, Image: e.target.value, })} name='image' type='text' /><br />
                Premired : <input placeholder="Enter Premired" onChange={e => setMovie({ ...Movie, Year: e.target.value, })} name='premired' type='text' /><br />
                Moviecap : <input placeholder="Enter Moviecap" onChange={e => setMovie({ ...Movie, moviecap: e.target.value, })} name='premired' type='text' />
                <div class="clearfix">
                    <button type="button" class="signupbtn" onClick={AddPost} >Add Movie</button>
                    <button type="button" class="cancelbtn" onClick={() => navigate("/MainPage")} >Cancel</button>
                </div>
            </div>
        </div>
    )
}
