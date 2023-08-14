import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function AddMembers() {
    const [Movie, setMovie] = useState({})
    const navigate = useNavigate()
    const d = new Date();

    const AddPost = async () => {
        try {
            console.log(Movie);
            const token = sessionStorage.getItem("x-access-token")
            const resp = await axios.post(`http://localhost:8000/api/Members`, Movie, {
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
            <h1 class="text-center">Add Member</h1>
            <ul>
                <li onClick={() => navigate("/AddMembers")} className='nav-item'><a>Add Member</a></li>
                <li onClick={() => navigate("/Subscriptions")} className='nav-item'><a>Members</a></li>
            </ul>
            <p>Please fill in this form to Add Member.</p>
            <hr />
            FullName : <input id='name' placeholder="Enter FullName" onChange={e => setMovie({ ...Movie, FullName: e.target.value })} name='FullName' type='text' /><br />
            Email : <input placeholder="Enter Email" onChange={e => setMovie({ ...Movie, Email: e.target.value, })} name='Email' type='text' /><br />
            City : <input placeholder="Enter City" onChange={e => setMovie({ ...Movie, City: e.target.value, })} name='City' type='text' /><br />
            <br />
            <button class="signupbtn" onClick={AddPost}>Add post</button>
            <button class="cancelbtn" onClick={() => navigate("/Subscriptions")}>Cancel</button>
        </div>
    )
}
