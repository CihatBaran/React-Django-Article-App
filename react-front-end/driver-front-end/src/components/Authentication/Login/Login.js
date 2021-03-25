import React, { Component } from 'react';
import './../Authentication.css';
import { Container, Row, Col, Alert } from 'react-bootstrap';

import Aux from '../../../Aux';

import Cookies from 'universal-cookie';
import { withRouter, NavLink, Redirect } from 'react-router-dom';
import APIService from '../../../containers/APIService';

class Login extends Component {
  state = {
    user: {
      username: '',
      password: '',
    },
    err: null,
    redirect: null,
  };
  cookies = new Cookies();

  loginSubmitHandler = (e) => {
    e.preventDefault();
    const request = {
      username: this.state.user.username,
      password: this.state.user.password,
    };

    APIService.loginUser(request)
      .then((res) => {
        this.cookies.set('myToken', res.data.token);

        this.setState({
          err: null,
          redirect: (
            <Redirect
              to={{
                pathname: '/api/v1/drivers',
                state: true,
              }}
            />
          ),
        });

        this.props.history.push('/api/v1/drivers');
      })
      .catch((err) => {
        this.setState({
          err: err,
        });
      });
  };

  changeInputHandler = (e) => {
    const newUser = { ...this.state.user };
    newUser[e.target.name] = e.target.value;
    this.setState({
      user: newUser,
    });
  };

  render() {
    return (
      <Aux>
        {this.state.redirect ? this.state.redirect : null}
        <Container className='mt-4'>
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <form onSubmit={this.loginSubmitHandler}>
                <h3>Log in</h3>
                {this.state.err ? (
                  <Alert variant='danger' style={{ fontSize: '10px' }}>
                    <Alert.Heading>Please check your credential</Alert.Heading>
                  </Alert>
                ) : null}

                <div className='form-group'>
                  <label>Username</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter username'
                    name='username'
                    onChange={this.changeInputHandler}
                  />
                </div>

                <div className='form-group'>
                  <label>Password</label>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Enter password'
                    name='password'
                    onChange={this.changeInputHandler}
                  />
                </div>

                <button type='submit' className='btn btn-dark btn-lg btn-block'>
                  Sign in
                </button>
                <NavLink
                  to='/signup'
                  className={`btn btn-info btn-lg btn-block`}
                >
                  Register
                </NavLink>
              </form>
            </Col>
          </Row>
        </Container>
      </Aux>
    );
  }
}

export default withRouter(Login);
