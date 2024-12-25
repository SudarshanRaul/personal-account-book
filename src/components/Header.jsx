/**
 * Unused component
 */
import React, { useState } from 'react';

const BackIcon = (
    {
        color
    }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="24"
        height="24"
    >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-color-000 grid-col-1fr-11fr">
            <nav>
                <BackIcon
                    color='currentColor'
                />
            </nav>
            <div className="font-size-28">Account Book</div>
            <nav>
                <div className="logo">Your Logo</div>
                <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Services</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className="hamburger" onClick={toggleMenu}>
                    <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
                    <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
                    <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
                </div>
            </nav>
        </header>
    );
};

export default Header;