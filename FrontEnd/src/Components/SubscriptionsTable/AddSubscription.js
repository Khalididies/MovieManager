import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";

export default function AddSubscription() {
    const [Subscription, setSubscription] = useState({})
    const [Movies, setMovies] = useState([])
    const [Members, setMembers] = useState([])
    const navigate = useNavigate()
    const location = useLocation();
    const [code, setCode] = useState("fff")
    const [err, setErr] = useState(false)

    const getDataMOvie = async () => {
        try {
            const token = sessionStorage.getItem("x-access-token")
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

    const sendGenerateToken = async () => {
        try {
            const Email = location.state;
            const token = sessionStorage.getItem("x-access-token")
            const resp = await axios.get(`http://localhost:8000/api/auth/sendGenerateToken/${Email}`, {
                headers: { "x-access-token": token }
            })
            alert(resp.data)
        } catch (e) {
            alert("Invalid Token")
            navigate("/")
        }
    }

    const validate = async () => {
        const token = sessionStorage.getItem("x-access-token")
        const resp = await axios.get(`http://localhost:8000/api/auth/verify/${code}`, {
            headers: { "x-access-token": token }
        })
        const isValid = resp.data
        if (isValid) {
            const token = sessionStorage.getItem("x-access-token")
            const resp = await axios.post(`http://localhost:8000/api/Subscriptions`, Subscription, {
                headers: { "x-access-token": token }
            })
            navigate("/register/success")
        } else {
            setErr("Code InValid")
        }
    }

    const getDataMembers = async () => {
        try {
            const token = sessionStorage.getItem("x-access-token")
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

    useEffect(() => {
        getDataMOvie()
        getDataMembers()
    }, [])

    return (
        <div >
            <h1>Welcome, {sessionStorage.getItem("username")}</h1><br />
            <h1 class="text-center">Add Subscription</h1>
            <ul>
                <li onClick={() => navigate("/AddMembers")} className='nav-item'><a>Add Member</a></li>
                <li onClick={() => navigate("/Subscriptions")} className='nav-item'><a>Members</a></li>
            </ul>
            <h1>Subscrip to movie</h1>
            <p>Your email that the code will be send to : </p>
            <hr />
            <input disabled value={location.state} type='text' />
            <p>Please select the Member And the Movie. </p>
            <hr />
            Member : <select onChange={(e) => setSubscription({ ...Subscription, MemberID: e.target.value })}>
                {
                    Members.map(Member => {
                        return <option value={Member._id}>{Member.FullName}</option>
                    })
                }
            </select><br />
            Movie : <select onChange={(e) => setSubscription({ ...Subscription, MovieID: e.target.value })}>
                {
                    Movies.map(Movie => {
                        return <option value={Movie._id}>{Movie.name}</option>
                    })
                }
            </select><br />
            Date : <input onChange={e => setSubscription({ ...Subscription, Date: e.target.value, })} name='Date' type='text' /><br />
            <button class="signupbtn" onClick={e => sendGenerateToken()}>Send code</button>
            <button class="cancelbtn" onClick={() => navigate("/Subscriptions")}>Cancel</button>
            <hr />
            <h1>Verify code : </h1>
            <div>

                <p>Enter the code that was sent to your email:  </p>
                <hr />
                <input onChange={e => setCode(e.target.value)} type="text" />
                <br />
                <button class="signupbtn" onClick={e => validate()} >Add and Verify</button>
                <button class="cancelbtn" onClick={() => navigate("/Subscriptions")}>Cancel</button>
                <br />
                {err ? <span>{err}</span> : null}
            </div><br /><br />

        </div>
    )
}
