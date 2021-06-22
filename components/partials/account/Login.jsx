import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '../../../store/auth/action';

import { Form, Input, notification } from 'antd';
import { connect } from 'react-redux';
import SearchmezRepository from "~/repositories/SearchmezRepository";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
    }

    static getDerivedStateFromProps(props) {
        if (props.isLoggedIn === true) {
            Router.push('/');
        }
        return false;
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleLoginSubmit = e => {

        console.log('test');
        this.setState({ submitted: true });
        const { email, password,rememberme, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(email && password)) {
            return;
        }
        const responseData = SearchmezRepository.login(email,password,rememberme);
        if (responseData) {
            console.log(responseData);
        } else {
            return;
        }
        return;
        this.props.dispatch(login());
        Router.push('/');

    };
    handleLoginSubmit123(e) {
        e.preventDefault();



        this.setState({ loading: true });
        console.log(this.state);
        // userService.login(username, password)
        //     .then(
        //         user => {
        //             const { from } = this.props.location.state || { from: { pathname: "/" } };
        //             this.props.history.push(from);
        //         },
        //         error => this.setState({ error, loading: false })
        //     );
        return;
        this.props.dispatch(login());
        Router.push('/');
    }

    render() {
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={this.handleLoginSubmit.bind(this)}>
                        <ul className="ps-tab-list">
                            <li className="active">
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/account/register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">
                                <h5>Log In Your Account</h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Username or email address"
                                            name="email"
                                            onChange={this.handleChange}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your password!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            placeholder="Password..."
                                            name="password"
                                            onChange={this.handleChange}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <div className="ps-checkbox">
                                        <input
                                            className="form-control"
                                            type="checkbox"
                                            id="rememberme"
                                            name="rememberme"
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="rememberme">
                                            Rememeber me
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Login
                                    </button>
                                </div>
                            </div>
                            {/*<div className="ps-form__footer">*/}
                            {/*    <p>Connect with:</p>*/}
                            {/*    <ul className="ps-list--social">*/}
                            {/*        <li>*/}
                            {/*            <a*/}
                            {/*                className="facebook"*/}
                            {/*                href="#"*/}
                            {/*                onClick={e =>*/}
                            {/*                    this.handleFeatureWillUpdate(e)*/}
                            {/*                }>*/}
                            {/*                <i className="fa fa-facebook"></i>*/}
                            {/*            </a>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <a*/}
                            {/*                className="google"*/}
                            {/*                href="#"*/}
                            {/*                onClick={e =>*/}
                            {/*                    this.handleFeatureWillUpdate(e)*/}
                            {/*                }>*/}
                            {/*                <i className="fa fa-google-plus"></i>*/}
                            {/*            </a>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <a*/}
                            {/*                className="twitter"*/}
                            {/*                href="#"*/}
                            {/*                onClick={e =>*/}
                            {/*                    this.handleFeatureWillUpdate(e)*/}
                            {/*                }>*/}
                            {/*                <i className="fa fa-twitter"></i>*/}
                            {/*            </a>*/}
                            {/*        </li>*/}
                            {/*        <li>*/}
                            {/*            <a*/}
                            {/*                className="instagram"*/}
                            {/*                href="#"*/}
                            {/*                onClick={e =>*/}
                            {/*                    this.handleFeatureWillUpdate(e)*/}
                            {/*                }>*/}
                            {/*                <i className="fa fa-instagram"></i>*/}
                            {/*            </a>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</div>*/}
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return state.auth;
};
export default connect(mapStateToProps)(Login);
