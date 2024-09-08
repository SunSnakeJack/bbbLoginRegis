import {Routes, Route} from "react-router-dom"
import Login from "./Login";
import Profile from "./Profile";
import BookingDetails from "./bookingDetail";
import Booking from "./booking";
import RoomDetails from "./roomDetailTest";
import BookingTest from "./bookingTest";
import Register from "./Register";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/bookingDetail" element={<BookingDetails/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/roomDetail" element={<RoomDetails/>}/>
        <Route path="/bookingTest" element={<BookingTest/>}/>
        <Route path="/register" element={<Register/>}/>


 
      </Routes>

    </div>
  );
}

export default App;
