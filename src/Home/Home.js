import React from 'react';
import { Link } from 'react-router-dom';
import Book from '../Book/Book';
import Shipment from '../Shipment/Shipment';

const Home = () => {
    return (
        <div>
            <h3>This is home</h3>
            <Link to='/shipment'>Shipment</Link>
           <Book/>
        </div>
    );
};

export default Home;