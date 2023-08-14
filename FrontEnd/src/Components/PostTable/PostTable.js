import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import "./PostTable.css"

export default function PostTable() {
    const [Members, setMembers] = useState([])
    const [Movies, setMovies] = useState([])
    const [Subscriptions, setSubscriptions] = useState([])

    const navigate = useNavigate()

    const getData = async (token) => {
        try {
            const resp = await axios.get("http://localhost:8000/api/Movies", {
                headers: { "x-access-token": token }
            })
            setMovies(resp.data)
        } catch (e) {
            setMovies([])
            alert("Invalid Token")
            navigate("/")
        }
    }

    const deletePost = async (id) => {
        try {
            const token = sessionStorage.getItem("x-access-token")
            const resp = await axios.delete(`http://localhost:8000/api/Movies/${id}`, {
                headers: { "x-access-token": token }
            })
            alert(resp.data)
        } catch (e) {
            setMovies([])
            alert("Invalid Token")
            navigate("/")
        }
    }

    const getDataMembers = async (token) => {
        try {
            const resp = await axios.get("http://localhost:8000/api/Members", {
                headers: { "x-access-token": token }
            })
            setMembers(resp.data)
        } catch (e) {
            setMembers([])
            alert("Invalid Token")
            navigate("/")
        }
    }

    const getDataSubscriptions = async (token) => {
        try {
            const resp = await axios.get("http://localhost:8000/api/Subscriptions", {
                headers: { "x-access-token": token }
            })
            setSubscriptions(resp.data)
        } catch (e) {
            setSubscriptions([])
            alert("Invalid Token")
            navigate("/")
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem("x-access-token")
        if (!token) navigate("/")
        getData(token)
        getDataMembers(token)
        getDataSubscriptions(token)
    }, [Movies])

    return (
        <div>
            <h1 class="text-center">Movies List</h1>
            <ul>
                <li onClick={() => navigate("/Addmovie")} className='nav-item'><a>Add Movies</a></li>
                <li onClick={() => navigate("/MainPage")} className='nav-item'><a>Movies</a></li>
                {/* <li><a>Find Movie : <input class="id" onChange={e => (e.target.value)} name='Find' type='text' /></a></li> */}
            </ul>
            <div  class="pricing-box-container">
            {
                Movies.map(Movie => {
                    return <div key={Movie._id} class="pricing-box text-center">
                            <h2><strong>{Movie.name}</strong></h2>
                            <p class="price"><img alt='this is an image' src={Movie.Image} /></p>
                            <h5>{Movie.Year}</h5>
                            <h5>{Movie.Genres}</h5>
                            <h5>{Movie.moviecap}</h5>
                            <button class="btn-primary" onClick={() => navigate("/EditMove", { state: Movie._id })}>Update</button>
                            <button class="btn-primary" onClick={() => deletePost(Movie._id)}>Delete</button>
                            <h4>subscriptions</h4>
                            {Subscriptions.map(Subscription => {
                                return Members.map(Member => {
                                    if (Subscription.MemberID == Member._id && Subscription.MovieID === Movie._id) {
                                        return <ul class="features-list" key={Subscription._id} >
                                            <li>| {Member.FullName} - <strong>{Subscription.Date}</strong></li>
                                        </ul>
                                    }
                                })
                            })}
                        </div>
                })
            }
            </div>


            {/* <div class="table-users">

                <table border={1}>
                    <thead>
                        <th>name</th>
                        <th>Year</th>
                        <th>Genres</th>
                        <th>Image</th>
                        <th>moviecap</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </thead>
                    <tbody>
                        {
                            Movies.map(Movie => {
                                return <tr key={Movie._id}>
                                    <td>{Movie.name}</td>
                                    <td>{Movie.Year}</td>
                                    <td>{Movie.Genres}</td>
                                    <td><img alt='this is an image' src={Movie.Image} /></td>
                                    <td>{Movie.moviecap}</td>
                                    <td><button onClick={() => deletePost(Movie._id)}>Delete</button></td>
                                    <td><button onClick={() => navigate("/EditMove", { state: Movie._id })}>Update</button></td>
                                    <h1>subscriptions </h1>
                                    <table border={1}>
                                        <thead>
                                            <th>name</th>
                                            <th>Year</th>
                                        </thead>
                                        <tbody>{Subscriptions.map(Subscription => {
                                            return Members.map(Member => {
                                                if (Subscription.MemberID == Member._id && Subscription.MovieID === Movie._id) {
                                                    return <tr key={Subscription._id}>
                                                        <td>{Member.FullName}</td>
                                                        <td>{Subscription.Date}</td>
                                                    </tr>
                                                }
                                            })
                                        })}
                                        </tbody>
                                    </table>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div> */}
        </div>
    )
}
