import React, { Component } from 'react';
import Input from '../common/Input';
import { login } from '../../api/remote';
import toastr from 'toastr'

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        const res = await login(this.state.email, this.state.password);
        if (!res.success) {
            this.setState({ error: res });
            toastr.error(this.state.error.message)
            console.log(res)
            return;
        }
        localStorage.setItem('authToken', res.token);
        if (!res.success) {
            this.setState({ error: res });
            toastr.error(this.state.error.message)
            return;
        }
        this.props.history.push('/');
        toastr.success("Successfully login");
    }

    render() {

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Login</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="row space-top">
                        <div className="col-md-4">
                            <div className="form-group">
                                <Input
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeHandler}
                                    label="E-mail"
                                />
                                <div className="form-control-feedback">{(this.state.error) ? this.state.error.email : ""}</div>
                            </div>
                            <div className="form-group">
                                <Input
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChangeHandler}
                                    label="Password"
                                />
                                <div className="form-control-feedback">{(this.state.error) ? this.state.error.password : ""}</div>
                            </div>
                            <input type="submit" className="btn btn-primary" value="Login" />
                        </div>
                    </div>
                </form>

            </div >
        );
    }
}