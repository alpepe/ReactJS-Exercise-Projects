import React, { Component } from 'react';
import CatalogPage from './CatalogPage';

export default class HomePage extends Component {

    render() {


        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Home page</h1>
                        <CatalogPage></CatalogPage>
                    </div>
                </div>
            </div>
        );
    }
}