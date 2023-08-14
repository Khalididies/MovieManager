import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";

export default function EditMove() {
    const [Movie, setMovies] = useState({})
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        const token = sessionStorage.getItem("x-access-token")
        if (!token) navigate("/")
        getData(token)
    }, [])

    const UpdatePost = async (updatedStud) => {
        try {
            const token = sessionStorage.getItem("x-access-token")
            const resp = await axios.put(`http://localhost:8000/api/Movies/${updatedStud._id}`, updatedStud, {
                headers: { "x-access-token": token }
            })
            alert(resp.data)
        } catch (e) {
            setMovies([])
            alert("Invalid Token")
            navigate("/")
        }
    }

    const getData = async (token) => {
        try {
            const id = location.state;
            const resp = await axios.get(`http://localhost:8000/api/Movies/${id}`, {
                headers: { "x-access-token": token }
            })
            setMovies(resp.data)
        } catch (e) {
            setMovies([])
            alert("Invalid Token")
            navigate("/")
        }
    }

    

    return (
        <div >
            <h1>Welcome, {sessionStorage.getItem("username")}</h1><br />
            <h1>Movie to Edit : {Movie.name}</h1>
            <ul>
                <li onClick={() => navigate("/Addmovie")} className='nav-item'><a>Add Movies</a></li>
                <li onClick={() => navigate("/MainPage")} className='nav-item'><a>Movies</a></li>
                <br />
            </ul>
            <p>Please fill in this form to Edit Movie.</p>
            <hr />
            Name : <input id='name' value={Movie.name} onChange={e => setMovies({ ...Movie, name: e.target.value })} name='name' type='text' /><br />
            Genres : <input value={Movie.Genres} onChange={e => setMovies({ ...Movie, Genres: e.target.value, })} name='Genres' type='text' /><br />
            Image URL : <input value={Movie.Image} onChange={e => setMovies({ ...Movie, Image: e.target.value, })} name='image' type='text' /><br />
            Premired : <input value={Movie.Year} onChange={e => setMovies({ ...Movie, Year: e.target.value, })} name='premired' type='text' /><br />
            moviecap : <input value={Movie.moviecap} onChange={e => setMovies({ ...Movie, moviecap: e.target.value, })} name='moviecap' type='text' />
            <br />
            <button class="signupbtn" onClick={() => UpdatePost(Movie)}>Add post</button>
            <button class="cancelbtn" onClick={() => navigate("/MainPage")}>Cancel</button>
        </div>
    )
}
