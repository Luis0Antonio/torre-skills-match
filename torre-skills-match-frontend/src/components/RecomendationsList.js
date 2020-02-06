import React from 'react'

import './styles/RecomendationList.css'

class RecomendationList extends React.Component{
    render(){
        return(
            <div className="RecomendationList__container">
                <p className="RecomendationList__container-title">
                    Recomendations
                </p>
                {
                    this.props.data.map((value, key) => {
                        return <div key={key} className="RecomendationList__container-itembox">
                            <p className="RecomendationList__container-itemtext">
                                {value.recomendationText}
                            </p>
                        </div>
                    })
                }
            </div>
        )
    }
}

export default RecomendationList