import React from 'react'
import PostTable from '../Components/PostTable/PostTable'
import Navbar from '../Components/NavBar/Navbar'

export default function MainPage() {
    console.log(sessionStorage.getItem("x-access-token"));
    return (
        <div>
            <h1>Welcome, {sessionStorage.getItem("username")}</h1>
            <Navbar />
            <PostTable />
        </div>
    )
}
