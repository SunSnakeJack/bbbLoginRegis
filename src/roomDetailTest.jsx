import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import properties_01 from './image/property-01.jpg';
import properties_02 from './image/property-02.jpg';
import properties_03 from './image/property-03.jpg';
import properties_04 from './image/property-04.jpg';
import properties_05 from './image/property-05.jpg';
import properties_06 from './image/property-06.jpg';

const images = {
    'property-01.jpg': properties_01,
    'property-02.jpg': properties_02,
    'property-03.jpg': properties_03,
    'property-04.jpg': properties_04,
    'property-05.jpg': properties_05,
    'property-06.jpg': properties_06
};

const RoomDetails = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
    
        const fetchRoomDetails = async () => {
            const rooms = [
                { id: 1, type: 'sgr', image: 'property-01.jpg', name: 'DELUXE VILLA', price: 3500, NumberOfRooms: 1, area: '15x15' },
                { id: 2, type: 'sgr', image: 'property-02.jpg', name: 'PREMIER DULUXE VILLA', price: 4000, NumberOfRooms: 1, area: '15x17' },
                { id: 3, type: 'sgr', image: 'property-03.jpg', name: 'POOL VILLA', price: 5000, NumberOfRooms: 1, area: '15x20' },
                { id: 4, type: 'dbr', image: 'property-04.jpg', name: 'DELUXE VILLA', price: 6000, NumberOfRooms: 2, area: '20x20' },
                { id: 5, type: 'dbr', image: 'property-05.jpg', name: 'PREMIER DELUXE VILLA', price: 6500, NumberOfRooms: 3, area: '25x25' },
                { id: 6, type: 'dbr', image: 'property-06.jpg', name: 'POOL VILLA', price: 7500, NumberOfRooms: 4, area: '30x30' }
            ];
            const roomDetails = rooms.find(room => room.id === parseInt(roomId));
            setRoom(roomDetails);
        };

        fetchRoomDetails();
    }, [roomId]);

    if (!room) {
        return <div>Loading...</div>;
    }

    const handleBooking = () => {
        navigate(`/booking/${room.id}`);
    };

    return (
        <div>
            {/* Header and other sections */}
            <div className="section properties">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="item">
                                <img src={images[room.image]} alt={room.name} />
                                <h1>{room.name}</h1>
                                <p>Price: THB {room.price}</p>
                                <p>Number of rooms: {room.NumberOfRooms}</p>
                                <p>Area: {room.area}</p>
                                <p>Stay 2 Nights Extra Save 5%</p>
                                {/* Booking button */}
                                <button onClick={handleBooking}>Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
        </div>
    );
};

export default RoomDetails;
