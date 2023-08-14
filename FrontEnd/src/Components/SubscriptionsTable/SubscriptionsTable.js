import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function SubscriptionsTable() {
    const [Members, setMembers] = useState([])
    const [Movies, setMovies] = useState([])
    const [Subscriptions, setSubscriptions] = useState([])
    const navigate = useNavigate()

    const getData = async (token) => {
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

    const getDataMOvie = async (token) => {
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
            const resp = await axios.delete(`http://localhost:8000/api/Members/${id}`, {
                headers: { "x-access-token": token }
            })
            alert(resp.data)
        } catch (e) {
            setMembers([])
            alert("Invalid Token")
            navigate("/")
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem("x-access-token")
        if (!token) navigate("/")
        getData(token)
        getDataMOvie(token)
        getDataSubscriptions(token)
    }, [Members])

    return (
        <div>
            <h1 class="text-center">Subscriptions List</h1>
            <ul>
                <li onClick={() => navigate("/AddMembers")} className='nav-item'><a>Add Member</a></li>
                <li onClick={() => navigate("/Subscriptions")} className='nav-item'><a>Members</a></li>
            </ul>
            <div class="pricing-box-container">
                {
                    Members.map(Member => {
                        return <div key={Member._id} class="pricing-box text-center">
                            <h2><strong>{Member.FullName}</strong></h2>
                            <h5>{Member.Email}</h5>
                            <h5>{Member.City}</h5>
                            <button class="signupbtn" onClick={() => navigate("/EditMembers", { state: Member._id })}>Update</button>
                            <button class="cancelbtn" onClick={() => deletePost(Member._id)}>Delete</button><br />
                            <hr />
                            <h2>Add Subscription</h2>
                            <button class="btn-primary" onClick={() => navigate("/AddSubscription", { state: Member.Email })} >Add Subscription</button>
                            <hr />
                            <h2>Movies Watched</h2>
                            {Movies.map(Movie => {
                                return Subscriptions.map(Subscription => {
                                    if (Subscription.MemberID === Member._id && Subscription.MovieID === Movie._id) {
                                        return <ul class="features-list" key={Movie._id} >
                                            <li>| {Movie.name} - <strong>{Movie.Year}</strong></li>
                                        </ul>
                                    }
                                })
                            })
                            }
                        </div>
                    })
                }
            </div>
            {/* <div className='nav-container'>
                <table border={1}>
                    <thead>
                        <th>FullName</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </thead>
                    <tbody>
                        {
                            Members.map(Member => {
                                return <tr key={Member._id}>
                                    <td>{Member.FullName}</td>
                                    <td>{Member.Email}</td>
                                    <td>{Member.City}</td>
                                    <td><button onClick={() => deletePost(Member._id)}>Delete</button></td>
                                    <td><button onClick={() => navigate("/EditMembers", { state: Member._id })}>Update</button></td>
                                    <h1>Add Subscription</h1>
                                    <tr><span onClick={() => navigate("/AddSubscription", { state: Member.Email })} className='nav-item'>Add Subscription</span></tr>
                                    <h1>Movies Watched</h1>
                                    <table border={1}>
                                        <thead>
                                            <th>name</th>
                                            <th>Year</th>
                                        </thead>
                                        <tbody>{Movies.map(Movie => {
                                            return Subscriptions.map(Subscription => {
                                                if (Subscription.MemberID === Member._id && Subscription.MovieID === Movie._id) {
                                                    return <tr>
                                                        <td>{Movie.name}</td>
                                                        <td>{Movie.Year}</td>
                                                    </tr>
                                                }
                                            })
                                        })
                                        }
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
