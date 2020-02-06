import React from 'react'

import './styles/Footer.css'

class Footer extends React.Component{
    render(){
        return(
            <div className="Footer__container">
                <span className="Footer__container-text">
                    a product developed by <a href="https://bio.torre.co/es/larpa" className="Footer__container-link">@larpa</a> using <a href="https://torre.docsend.com/view/v6hunik" className="Footer__container-link">the torre protocol</a>
                </span>
            </div>
        )
    }
}

export default Footer