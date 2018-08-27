import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './Logo-Brain.png';
const Logo = () => {
    return (
        <div className = 'ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 120, width: 120 }} >
                <div className="Tilt-inner pa4">
                    <img  src = {brain} alt='Logo'/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;