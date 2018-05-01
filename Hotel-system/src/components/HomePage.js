import React, { Component } from 'react';
import { getHotels, deleteHotel } from '../api/remote';
import HotelList from './HotelList';
import { Link } from 'react-router-dom';
export default class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hotels: []
        }
        //delete step 7/7
        this.deleteHotel = this.deleteHotel.bind(this);
    }

    componentDidMount() {
        this.getData()
    }

    //подавам дефолтни параметри заради пагинатора
    async getData(page = Number(this.props.match.params.page) || 1) {
        const res = await getHotels(page)
        this.setState({ hotels: res })
    }

    // добавям заради пагинатора да се рефрешва след промяна на props
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.page !== this.props.match.params.page) {
            this.getData(Number(nextProps.match.params.page))
        }
    }

    //delete step 2/7
    async deleteHotel(id) {
        const res = await deleteHotel(id)
        //delete step 6/7
        this.setState({ hotels: this.state.hotels.filter(h => h.id != id) });
        this.getData();

    }

    render() {
        const page = Number(this.props.match.params.page) || 1;

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">

                        <h1>Home page</h1>
                        {this.state.hotels.length === 0 ? <p>Loading...</p> :
                            //delete step 3/7
                            <HotelList hotels={this.state.hotels} deleteHotel={this.deleteHotel} />}

                        <div className="pagination">
                            {page > 1 && <Link to={'/view/' + (page - 1)}>&lt;</Link>}
                            <Link to={'/view/' + (page + 1)}>&gt;</Link>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}