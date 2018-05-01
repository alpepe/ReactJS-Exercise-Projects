import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/common/Header';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';    
import HomePage from './components/HomePage';
import CreatePage from './components/Create/CreatePage';
import DetailsPage from './components/Details/DetailsPage';
import PrivateRoute from './components/common/PrivateRoute';
import toastr from 'toastr'

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        localStorage.clear();
        this.props.history.push('/');
        toastr.success("Logout");
    }

    render() {
        return (
            <div className="App">
                <Header loggedIn={localStorage.getItem('authToken') != null} onLogout={this.onLogout} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/view/:page" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/create" component={CreatePage} />
                    <PrivateRoute path="/details/:id" component={DetailsPage} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);