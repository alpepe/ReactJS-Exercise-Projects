import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import toastr from 'toastr'

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;
        return (
            <header>
                <nav className="navbar bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <NavLink className="nav-link" exact to="/" activeClassName="active">Home</NavLink>
                                {loggedIn && <NavLink to="/create" className="nav-link" activeClassName="active">Create Hotel</NavLink>}
                                {loggedIn && <a className="nav-link" href="javascript:void(0)" onClick={onLogout}>Logout</a>}
                                {!loggedIn && <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>}
                                {!loggedIn && <NavLink to="/register" className="nav-link" activeClassName="active">Register</NavLink>}
                            </div>
                        </div>
                    </div>
                </nav >
            </header>
        );
    }
}