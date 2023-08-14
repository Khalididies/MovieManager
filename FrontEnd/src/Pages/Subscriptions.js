import React from 'react'
import SubscriptionsTable from '../Components/SubscriptionsTable/SubscriptionsTable'
import Navbar from '../Components/NavBar/Navbar'

export default function Subscriptions() {
    console.log(sessionStorage.getItem("x-access-token"));
    return (
        <div>
            <h1>Welcome, {sessionStorage.getItem("username")}</h1>
            <Navbar />
            <SubscriptionsTable />
        </div>
    )
}
