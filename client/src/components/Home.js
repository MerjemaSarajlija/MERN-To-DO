import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';



class Home extends Component {

    render() {
        const { isAuthenticated } = this.props;
        if (isAuthenticated) {
            return (
                <Redirect to="/board" />
            )
        }
         return(
            <div className = "bgimg">
                <div className="middle">
                    <h1>REGISTER AND MANAGE YOUR HOUSE MOVING TASKS </h1>
                 </div>
           </div>
         )
   }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(Home);