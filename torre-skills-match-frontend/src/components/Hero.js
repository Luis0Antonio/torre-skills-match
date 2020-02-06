import React from 'react'

import './styles/Hero.css'

class Hero extends React.Component{
    render(){
        return(
            <div className="Hero__container">
                <p className="Hero__content-text">
                    {this.props.text ? this.props.text : 'welcome!'}
                </p>
            </div>
        )
    }
}

export default Hero