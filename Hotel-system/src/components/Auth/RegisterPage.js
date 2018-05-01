import React, { Component } from 'react';
import Input from '../common/Input';
import { register } from '../../api/remote';
import toastr from 'toastr'

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            repeat: '',
            error: {
                message: false,
                errors: {
                    name: false,
                    email: false,
                    password: false
                }
            }
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        if (this.state.password !== this.state.repeat) {
            this.setState({
                error: {
                    message: 'Check the form for errors',
                    errors: {
                        repeat: "Passwords don't match"
                    }
                }
            });
            toastr.error("Passwords don't match")
            return;
        }
        const res = await register(this.state.name, this.state.email, this.state.password);
        if (!res.success) {
            this.setState({ error: res });
            console.log(res)
            toastr.error(this.state.error.message)
            return;
        }
        this.props.history.push('/login');
        toastr.success("Successfully registered")
    }

    render() {

        return (

            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Register</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>

                <form onSubmit={this.onSubmitHandler}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group has-success">
                                <Input
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChangeHandler}
                                    label="Name"
                                />
                                <div className="form-control-feedback">{(this.state.error) ? this.state.error.errors.name : ""}</div>
                            </div>
                            <div className="form-group has-success">
                                <Input
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeHandler}
                                    label="E-mail"
                                />
                                <div className="form-control-feedback">{(this.state.error) ? this.state.error.errors.email : ""}</div>
                            </div>
                            <div className="form-group has-success">
                                <Input
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChangeHandler}
                                    label="Password"
                                />
                                <div className="form-control-feedback">{(this.state.error) ? this.state.error.errors.password : ""}</div>
                            </div>
                            <div className="form-group has-success">
                                <Input
                                    name="repeat"
                                    type="password"
                                    value={this.state.repeat}
                                    onChange={this.onChangeHandler}
                                    label="Repeat password"
                                />
                                <div className="form-control-feedback">{(this.state.error) ? this.state.error.errors.name : ""}</div>
                            </div>
                            <input type="submit" className="btn btn-primary" value="Register" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}