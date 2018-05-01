import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/common/Header';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';    
import HomePage from './components/HomePage';
import toastr from 'toastr'
import PrivateRoute from './components/common/PrivateRoute';
import CatalogPage from './components/CatalogPage';
import DetailsPage from './components/DetailsPage';
import CartPage from './components/CartPage'

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
                    <Route exact path="/" component={CatalogPage} />
                    <Route path="/search" component={CatalogPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <PrivateRoute path="/details/:id" component={DetailsPage} />
                    <PrivateRoute path="/cart" component={CartPage} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);