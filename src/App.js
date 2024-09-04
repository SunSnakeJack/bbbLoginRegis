import {Routes, Route} from "react-router-dom"
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register"
import BookingDetails from "./bookingDetail";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/bookingDetail" element={<BookingDetails/>}/>
 
      </Routes>

    </div>
  );
}

export default App;
