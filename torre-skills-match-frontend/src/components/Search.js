import React from 'react'

import './styles/Search.css'

class Search extends React.Component{
    render(){
        return(
            <div className="Search__container">
                <span className="Search__container-label">
                    write your username:
                </span>
                <div>
                    <input 
                        onChange={this.props.onChange} 
                        className="form_control Search__container-input" 
                        type="text" 
                        name="lastName"
                        value={this.props.text}
                    />
                    <button 
                        onClick={this.props.handleClick} 
                        className="btn Search__container-button"
                    >
                        Search
                    </button>
                </div>
            </div>
        )
    }
}

export default Search