import React from 'react';
import {Navbar} from "react-bootstrap";
import './Footer.css';

export const Footer = () => (
    <footer className="footer">
        <Navbar bg="success">
            <Navbar.Brand style={{color:"white"}}>This is a footer</Navbar.Brand>
        </Navbar>
    </footer>
);