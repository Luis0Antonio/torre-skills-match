import React from 'react'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Search from '../components/Search'
import Profile from '../components/Profile'
import RecomendationList from '../components/RecomendationsList'
import Reputation from '../components/Reputation'
import Footer from '../components/Footer'
import Responsive from 'react-responsive-decorator'
import './styles/Home.css'

class Home extends React.Component{
    state = {
        searchText: '',
        user: {},
        reputation: {},
        recomendations: [],
        errorMessage: '',
        error: false,
        isMobile: false
    }

    handleSearch = async () => {
        try{
            const response = await fetch(`https://torre-skills-match-backend.larpa.now.sh?username=${this.state.searchText}`, {
                "method": 'GET',
                "headers": {
                    "Access-Control-Allow-Origin": "*"
                }
            })
            const responseJson = await response.json()
            
            if(responseJson.success){
                this.setState({
                    error: false,
                    errorMessage: '',
                    user: responseJson.user,
                    reputation: responseJson.reputation,
                    recomendations: responseJson.recomendations
                })
            }else{
                this.setState({
                    error: true,
                    errorMessage: responseJson.message,
                    user: {},
                    reputation: {},
                    recomendations: [],
                })
            }

        }catch(e){
            console.log("ERROR: ", e)
        }
    }
    
    handleChangeSearch = e => {
        this.setState({
            searchText: e.target.value
        })
    }

    componentDidMount = () => {
        this.props.media({ minWidth: 768 }, () => {
            this.setState({
                isMobile: false
            })
        });

        this.props.media({ maxWidth: 768 }, () => {
            this.setState({
                isMobile: true
            })
        });
    };
    

    render(){
        return(
            <div>
                <Navbar />
                <Hero 
                    text="The place that helps you to be ready for getting hired using the torre protocol"
                />
                 <div className="container">
                    <div className="row">
                        <div className={this.state.isMobile ? "col-sm-12" : "col-6 "}>
                            <Search
                                text={this.state.searchText}
                                onChange={this.handleChangeSearch}
                                handleClick={this.handleSearch}
                            />
                            {
                                this.state.error &&
                                <div className="Error__message">
                                    <p>{this.state.errorMessage}</p>
                                </div>
                            }
                            {
                                this.state.user.name &&
                                <Profile 
                                    user={this.state.user}
                                />
                            }
                        </div>
                        <div className={this.state.isMobile ? "col-sm-12" : "col-6 "}>
                            {
                                this.state.reputation.message && 
                                <Reputation 
                                    percent={this.state.reputation.percent}
                                    message={this.state.reputation.message}
                                    status={this.state.reputation.status}
                                />
                            }
                            {
                                this.state.recomendations.length > 0 && 
                                <RecomendationList
                                    data={this.state.recomendations}
                                />
                            }
                             
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Responsive(Home)