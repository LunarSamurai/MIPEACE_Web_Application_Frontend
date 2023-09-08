import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import TestInstance from './TestInstance.js';
import App from './App.js';
import './AdminInstance.scss';  // Importing the styles
import MIPEACE_Logo from './MIPEACE_LOGO.png'
import { useHistory } from 'react-router-dom';
import { redirect } from 'react-router';

function AdminInstance() {

    const [activeItem, setActiveItem] = useState('Connections'); // Initial active item set to 'Connections'
    const [redirectToRootPage, setRedirectToRootPage] = useState(false);
    
    const handleLogoutClick = () => {
        console.log("Logout was clicked!");
        localStorage.setItem('adminLoggedOut', 'true'); // Set a specific flag for admin logout
        window.location.reload();
    };

    const AdminControlPanel = () => {
        // Check specifically for admin logout
        if (localStorage.getItem('adminLoggedOut') === "true") {
            return <Redirect to="/" />
        }
        return (
            <div className="admin-control-panel-wrapper">
                <nav className="sidebar-navigation">
                    <div className="menu-items">
                        <ul>
                            <li className={activeItem === 'Connections' ? 'active' : ''} onClick={() => setActiveItem('Connections')}>
                                <i className="fa fa-share-alt"></i>
                                <span className="tooltip">Examinee List</span>
                            </li>
                            <li className={activeItem === 'Devices' ? 'active' : ''} onClick={() => setActiveItem('Devices')}>
                                <i className="fa fa-hdd-o"></i>
                                <span className="tooltip">Results</span>
                            </li>
                            <li className={activeItem === 'Contacts' ? 'active' : ''} onClick={() => setActiveItem('Contacts')}>
                                <i className="fa fa-newspaper-o"></i>
                                <span className="tooltip">Manage Exams</span>
                            </li>
                            <li className={activeItem === 'Fax' ? 'active' : ''} onClick={() => setActiveItem('Fax')}>
                                <i className="fa fa-print"></i>
                                <span className="tooltip">Pull Reports</span>
                            </li>
                            <li className={activeItem === 'Settings' ? 'active' : ''} onClick={() => setActiveItem('Settings')}>
                                <i className="fa fa-sliders"></i>
                                <span className="tooltip">Settings</span>
                            </li>
                        </ul>
                    </div>
                    <li className="logout-item" onClick={handleLogoutClick}>
                        <i className="fa fa-sign-out"></i>
                    <span className="tooltip">Logout</span>
                </li>
                </nav>
            </div>
        );
    }

    return (
        <div className="AdminInstance">
            {AdminControlPanel()}
        </div>
    );
}
    
export default AdminInstance;