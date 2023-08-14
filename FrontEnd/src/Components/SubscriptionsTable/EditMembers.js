import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";

export default function EditMove() {
    const [Member, setMembers] = useState({})
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
            const resp = await axios.put(`http://localhost:8000/api/Members/${updatedStud._id}`, updatedStud, {
                headers: { "x-access-token": token }
            })
            alert(resp.data)
        } catch (e) {
            setMembers([])
            alert("Invalid Token")
            navigate("/")
        }
    }

    const getData = async (token) => {
        try {
            const id = location.state;
            const resp = await axios.get(`http://localhost:8000/api/Members/${id}`, {
                headers: { "x-access-token": token }
            })
            setMembers(resp.data)
        } catch (e) {
            setMembers([])
            alert("Invalid Token")
            navigate("/")
        }
    }

    return (
        <div >
            <h1>Welcome, {sessionStorage.getItem("username")}</h1><br />
            <h1 class="text-center">Edit Member</h1>
            <ul>
                <li onClick={() => navigate("/AddMembers")} className='nav-item'><a>Add Member</a></li>
                <li onClick={() => navigate("/Subscriptions")} className='nav-item'><a>Members</a></li>
            </ul>
            <p>Please fill in this form to Edit Member.</p>
            <hr />
            FullName : <input id='name' value={Member.FullName} onChange={e => setMembers({ ...Member, FullName: e.target.value })} name='FullName' type='text' /><br />
            Email : <input value={Member.Email} onChange={e => setMembers({ ...Member, Email: e.target.value, })} name='Email' type='text' /><br />
            City : <input value={Member.City} onChange={e => setMembers({ ...Member, City: e.target.value, })} name='City' type='text' /><br />
            <br />
            <button class="signupbtn" onClick={() => UpdatePost(Member)}>Add post</button>
            <button class="cancelbtn" onClick={() => navigate("/Subscriptions")}>Cancel</button>
        </div>
    )
}
