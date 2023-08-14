import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import MainPage from './Pages/MainPage'
import Register from './Pages/Register'
import AddMovie from './Components/MovieCompnets/AddMove'
import Subscriptions from './Pages/Subscriptions'
import AddMembers from './Components/SubscriptionsTable/AddMembers'
import EditMembers from './Components/SubscriptionsTable/EditMembers'
import AddSubscription from './Components/SubscriptionsTable/AddSubscription'
import EditMove from './Components/MovieCompnets/EditMove'

function App() {
  return <div >
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/MainPage" element={<MainPage />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Addmovie" element={<AddMovie />} />
      <Route path="/EditMove" element={<EditMove />} />

      <Route path="/Subscriptions" element={<Subscriptions />} />
      <Route path="/AddSubscription" element={<AddSubscription />} />
      
      <Route path="/AddMembers" element={<AddMembers />} />
      <Route path="/EditMembers" element={<EditMembers />} />
      
    </Routes>
  </div>
}

export default App