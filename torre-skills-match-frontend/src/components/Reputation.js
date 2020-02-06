import React from 'react'

import './styles/Reputation.css'

class Reputation extends React.Component{
    render(){
        return(
            <div className="Reputation__container">
                <p className="Reputation__container-title">
                    Reputation
                </p>
                <div className="Reputation__container-itembox">
                    <div className="Reputation__container-itembox-container">
                        <div className="Reputation__container-itembox-number">
                            <span className="Reputation__container-itembox-number-label">
                                TOP
                            </span>
                            <span className="Reputation__container-itembox-number-value">
                                {this.props.percent}%
                            </span>
                        </div>
                        <p className="Reputation__container-itemtext">
                            {this.props.message}
                        </p>
                    </div>
                    {
                        this.props.status === 'bad' &&
                        <div className="Reputation__container-statusbox Reputation__container-statusbox-red"></div>
                    }
                    {
                        this.props.status === 'normal' &&
                        <div className="Reputation__container-statusbox Reputation__container-statusbox-yellow"></div>
                    }
                    {
                        this.props.status === 'good' &&
                        <div className="Reputation__container-statusbox Reputation__container-statusbox-blue"></div>
                    }
                    {
                        this.props.status === 'perfect' &&
                        <div className="Reputation__container-statusbox Reputation__container-statusbox-green"></div>
                    }
                </div>
            </div>
        )
    }
}

export default Reputation