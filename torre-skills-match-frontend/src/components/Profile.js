import React from 'react'

import './styles/Profile.css'
import { FaWeightHanging } from 'react-icons/fa';

class Profile extends React.Component{
    render(){
        return(
            <div className="Profile__container">
                <img 
                    src={this.props.user.avatar ? this.props.user.avatar : ''}
                    alt="Foto perfil"
                    className="Profile__container-picture"    
                />
                <span className="Profile__container-name">
                    {this.props.user.name}
                </span>
                <div className="Profile__container-weight-box">
                    <FaWeightHanging 
                        className="Profile__container-icon"
                    />
                    <span className="Profile__container-weight">
                        {Number(this.props.user.weight).toFixed(0)}
                    </span>
                </div>
                <a 
                    href={this.props.user.link_torre} 
                    className="btn Profile__container-button"
                >
                    OPEN IN TORRE
                </a>
            </div>
        )
    }
}

export default Profile