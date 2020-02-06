import React from 'react'

import { Link } from 'react-router-dom'
import './styles/Navbar.css'

class Navbar extends React.Component{
    render(){
        return(
            <div className="Navbar__container">
                <div>
                    <Link to="/matchskill" className="Navbar__title">
                        torre
                    </Link>
                    <span className="Navbar__subtitle">
                        Network Helper
                    </span>
                </div>
                <div>
                    <Link to="/home" className="Navbar__item">
                        Network Helper
                    </Link>
                    <Link to="/info" className="Navbar__item">
                        Info
                    </Link>
                </div>
            </div>
        )
    }
}

export default Navbar