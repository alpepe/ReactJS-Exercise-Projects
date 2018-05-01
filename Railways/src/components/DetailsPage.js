import React, { Component } from 'react';
import { getTripDetails, postReview } from '../api/remote';
import CatalogPage from './CatalogPage';
import toastr from 'toastr'

export default class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tripDetails: {},
            firstClassNumberOfTickets: 0,
            secondClassNumberOfTickets: 0
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitFirstClass = this.onSubmitFirstClass.bind(this);
        this.onSubmitSecondClass = this.onSubmitSecondClass.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitFirstClass(e) {
        e.preventDefault();
        const res = await postReview(this.props.match.params.id, '22-01-18', 'First Class', this.state.firstClassNumberOfTickets)
        this.setState({ firstClassNumberOfTickets: 0 })
        toastr.success("Ticket added in Cart");
    
    }
    async onSubmitSecondClass(e) {
        e.preventDefault();
        const res = await postReview(this.props.match.params.id, '22-01-18', 'Second Class', this.state.secondClassNumberOfTickets)
        this.setState({ secondClassNumberOfTickets: 0 })
        toastr.success("Ticket added in Cart");
    }

    componentDidMount() {
        this.getData()
    }

    async getData() {
        const res = await getTripDetails(this.props.match.params.id)
        this.setState({ tripDetails: res })
        console.log(this.state)
    }

    render() {

        return (
            <div>
                <section className="ticket-area">
                    <div className="ticket-area-left">
                        <img src="https://wallscover.com/images/town-wallpaper-1.jpg" alt="" />
                    </div>
                    <div className="ticket-area-right">
                        <h3>{this.state.tripDetails.origin}</h3>
                        <div>From: {this.state.tripDetails.destination}</div>
                        <div className="data-and-time">Time: {this.state.tripDetails.time}</div>
                        <div className="data-and-time">Arrives: {this.state.tripDetails.arrives}</div>
                        <div className="data-and-time">Duration: {this.state.tripDetails.duration}</div>
                    </div>
                </section>
                {this.state.tripDetails.tickets && this.state.tripDetails.tickets.firstClass ?
                    <section className="train-details">
                        <form onSubmit={this.onSubmitFirstClass} className="seat-form">
                            <span>{this.state.tripDetails.tickets ? this.state.tripDetails.tickets.firstClass : 11.8}$</span><span>First className</span>
                            <input
                                type="number"
                                placeholder="Add Number"
                                name="firstClassNumberOfTickets"
                                value={this.state.firstClassNumberOfTickets}
                                onChange={this.onChangeHandler} />
                            <input type="submit" className="create-seat" value="Add to Cart" />
                            <a href="" className="delete">X</a>
                        </form>
                    </section> :
                    <span className="train-details">No have First Class</span>}

                {this.state.tripDetails.tickets && this.state.tripDetails.tickets.secondClass ?
                    <section className="train-details">
                        <form onSubmit={this.onSubmitSecondClass} className="seat-form">
                            <span>{this.state.tripDetails.tickets ? this.state.tripDetails.tickets.secondClass : 9.5}$</span><span>Second Class</span>
                            <input
                                type="number"
                                placeholder="Add Number"
                                name="secondClassNumberOfTickets"
                                value={this.state.secondClassNumberOfTickets}
                                onChange={this.onChangeHandler} />/>
                            <input type="submit" className="create-seat" value="Add to Cart" />
                            <a href="" className="delete">X</a>
                        </form>
                    </section> :
                    <span className="train-details">No have Second Class</span>}

                <footer>SoftUni RailWays</footer>
            </div >
        );
    }
}

