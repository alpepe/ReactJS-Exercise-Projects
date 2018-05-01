import React, { Component } from 'react';
import Input from '../common/Input';
import { createHotel } from '../../api/remote';
import toastr from 'toastr';

export default class CreatePage extends Component {
    constructor (props){
        super(props);

        this.state={
            name:'',
            location:'',
            description:'',
            rooms:'',
            image:'',
            parkingSlots:''
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        const res = await createHotel({
            name:this.state.name,
            location:this.state.location,
            description:this.state.description,
            numberOfRooms: Number(this.state.rooms),
            image:this.state.image,
            parkingSlots:this.state.parkingSlots
        })
        if (!res.success) {
            this.setState({ error: res });
            toastr.error(this.state.error.message)
            console.log(res)
            return;
        }
        this.props.history.push('/');
    }


    render(){
        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Create Hotel</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="row space-top">
                        <div className="col-md-4">
                            <div className="form-group">
                                <Input
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChangeHandler}
                                    label="Name"
                                />
                                <div className="form-control-feedback">{(this.state.error) ? this.state.error.errors.name : ""}</div>
                            </div>
                            <div className="form-group">
                                <Input
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChangeHandler}
                                    label="Location"
                                />
                                <div className="form-control-feedback">{(this.state.error) ? this.state.error.errors.location : ""}</div>
                            </div>
                            <div className="form-group">
                                <Input
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChangeHandler}
                                    label="Description"
                                />
                                <div className="form-control-feedback">{(this.state.error) ? this.state.error.errors.description : ""}</div>
                            </div>
                            <div className="form-group">
                                <Input
                                    name="image"
                                    value={this.state.image}
                                    onChange={this.onChangeHandler}
                                    label="Image"
                                />
                                <div className="form-control-feedback">{(this.state.error) ? this.state.error.errors.image : ""}</div>
                            </div>
                            <div className="form-group">
                                <Input
                                    name="rooms"
                                    value={this.state.rooms}
                                    onChange={this.onChangeHandler}
                                    label="Number Of Rooms"
                                />
                                <div className="form-control-feedback">{(this.state.error) ? this.state.error.errors.rooms : ""}</div>
                            </div>
                            <div className="form-group">
                                <Input
                                    name="parkingSlots"
                                    type="number"
                                    value={this.state.parkingSlots}
                                    onChange={this.onChangeHandler}
                                    label="Parking Slots"
                                />
                                <div className="form-control-feedback">{(this.state.error) ? this.state.error.errors.parkingSlots : ""}</div>
                            </div>
                            <input type="submit" className="btn btn-primary" value="Login" />
                        </div>
                    </div>
                </form>

            </div >
        )
    }
}
