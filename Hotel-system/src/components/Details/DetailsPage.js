import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getHotelDetails, postReview } from '../../api/remote.js';
import ReviewSection from './ReviewSection';



export default class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hotel: false
        }
    }

    componentDidMount() {
        this.getData()
    }

    async getData() {
        const res = await getHotelDetails(this.props.match.params.id)
        this.setState({ hotel: res })

    }

    render() {
        let main = <h1>Liading &hellip;</h1>;

        if (this.state.hotel) {
            main = (
                <div className="hotel-details">
                    <div>
                        <img alt={this.state.hotel.image} src={this.state.hotel.image} />
                        <h2><b>{this.state.hotel.name}</b></h2>
                        <h3>{this.state.hotel.location}</h3>
                        <p>{this.state.hotel.description}</p>
                        <p>Number of Rooms: <b>{this.state.hotel.numberOfRooms}</b></p>
                        <p>Parking Slots: <b>{this.state.hotel.parkingSlots}</b></p>
                    </div>
                </div>
            )
        }
        return (
            <div>
                {main}
                <ReviewSection hotelId={this.props.match.params.id}></ReviewSection>
            </div>
        )
    }

}