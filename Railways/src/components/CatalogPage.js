import React, { Component } from 'react';
import { getCatalog, getSearch } from '../api/remote';
//import { URLSearchParams } from 'url-search-params';
import toastr from 'toastr'
import { Link } from 'react-router-dom';


export default class CatalogPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trips: [],
            destination: "",
            origin: "",
            departure: "",
            error: ""

        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        const orgin = this.state.origin
        const destination = this.state.destination
        this.props.history.push(`search?origin=${this.state.origin}&destination=${this.state.destination}&date=07-01-18`);
        // this.props.history.push({
        //     pathname: '/search', query: { orgin, destination }
        // })
        const res = await getSearch(this.props.history.location.search)
        if (res.error) {
            this.setState({ error: res.error });
            toastr.error(this.state.error)
            console.log(res)
            return;
        }
        this.setState({ trips: res })
    }

    componentDidMount() {
        this.getData()
    }

    async getData() {
        const res = await getCatalog()
        this.setState({ trips: res })
    }


    render() {

        return (
            <div>
                <div className="train-logo">
                </div>
                <form onSubmit={this.onSubmitHandler} className="search-form">
                    <label>Destination:</label>
                    <input
                        type="text"
                        placeholder="Destination"
                        name="destination"
                        value={this.state.destination}
                        onChange={this.onChangeHandler} />
                    <label>Origin:</label>
                    <input
                        type="text"
                        placeholder="Origin"
                        name="origin"
                        value={this.state.origin}
                        onChange={this.onChangeHandler} />
                    <label>Time:</label>
                    <input
                        type="text"
                        placeholder="Time"
                        name="departure"
                        value={this.state.departure}
                        onChange={this.onChangeHandler} />

                    <input type="submit" className="search" value="Search" />
                </form>

                <section className="added-trains">
                    {this.state.trips.map(t => (
                        <Link to={'/details/'+ t._id} key={t._id} className="added-train">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/ICE_3_Oberhaider-Wald-Tunnel.jpg/1280px-ICE_3_Oberhaider-Wald-Tunnel.jpg" alt="" className="picture-added-train" />
                            <h3>{t.origin}</h3>
                            <span>{t.destination}</span>
                            <span>departs {t.time}</span>
                            <span>arrives {t.arrives}}</span>
                            <span>duration {t.duration}</span>
                        </Link>
                    ))}

                </section>

            </div >
        )
    }
}