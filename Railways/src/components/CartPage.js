import React, { Component } from 'react';
import { getCart } from '../api/remote';
import CatalogPage from './CatalogPage';

export default class CartPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yourTickets: []

        }
    }

    componentDidMount() {
        this.getData()
    }

    async getData() {
        const res = await getCart()
        this.setState({ yourTickets: res })
        console.log(this.state)
    }

    render() {
        return (
            <div>
                {this.state.yourTickets.map(t => (
                    <section key={t._id} className="single-ticket">
                        <div className="left-ticket-container">
                            <img src="https://wallscover.com/images/town-wallpaper-1.jpg" alt="" className="destination-img" />
                            <div className="train-parameters">
                                <span className="ticket-price">Price: {t.price}$</span>
                                <span className="ticket-class">{t.class}</span>
                            </div>
                        </div>
                        <div className="right-ticket-container">
                            <h2>{t.origin}</h2>
                            <p>from {t.destination}</p>
                            <p>Time: {t.time}</p>
                            <p>arrives {t.arrives} (duration {t.duration})</p>
                            <p></p>
                            <div>
                                <span className="number-of-tickets">Count: {t.count}</span>
                                <a href="" className="remove">REMOVE</a>
                            </div>
                        </div>
                    </section>
                ))}

                <section className="ticket-checkout">
                    <div className="total">Sub total: 200$</div>
                    <a href="" className="checkout">Checkout</a>
                </section>
            </div>
        );
    }
}