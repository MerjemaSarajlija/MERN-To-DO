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
         return <h1>Home</h1>
   }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(Home);