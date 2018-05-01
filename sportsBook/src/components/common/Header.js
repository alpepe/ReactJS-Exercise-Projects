import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {

        return (
            <header>
                <nav className="navbar bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <NavLink className="nav-link" exact to="/" activeClassName="active">eSports</NavLink>
                            </div>
                        </div>
                    </div>
                </nav >
            </header>
        );
    }
}