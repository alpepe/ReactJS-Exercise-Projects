import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/common/Header';
import ESports from './components/ESports';

class App extends Component {
    
    render() {
        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route exact path="/" component={ESports} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);