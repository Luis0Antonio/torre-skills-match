import React from 'react'

import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

import './styles/Info.css'

class Info extends React.Component{
    render(){
        return(
            <div>
                <Navbar />
                <Hero 
                    text="Why should I use this?"
                />
                <div className="Info__container">
                    <p className="Info__container-text">
                        <b>Torre Network Helper</b> is the place that helps you to be ready for getting hired using the torre protocol.
                    </p>
                    <p className="Info__container-text">
                        We help you improve your reputation on Torre!
                    </p>
                    <p className="Info__container-text">
                        You should use this because companies receive hundreds of applicants to their offers and they can’t review them all. It’s your responsibility to scale into their applicants stack
                    </p>
                </div>
            </div>
        )
    }
}

export default Info