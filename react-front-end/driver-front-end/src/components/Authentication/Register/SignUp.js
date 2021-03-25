import React, { Component } from 'react';
import { Container, Col, Row, Alert } from 'react-bootstrap';
import './../Authentication.css';
import { NavLink, withRouter, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import APIService from '../../../containers/APIService';

class SignUp extends Component {
  state = {
    user: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
    },
    err: null,
  };

  cookies = new Cookies();

  signUpSubmitHandler = (e) => {
    e.preventDefault();
    let request = {};

    if (this.state.user.password === this.state.user.cpassword) {
      request = {
        username: this.state.user.username,
        password: this.state.user.password,
      };
    }

    APIService.createNewUser(request)
      .then((res) => {})
      .then((res) => {
        APIService.createNewToken(request).then((res) => {
          this.cookies.set('myToken', res.data.token);
          this.setState({
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
        });
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
      <Container className='main'>
        {this.state.redirect ? this.state.redirect : null}
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <form onSubmit={this.signUpSubmitHandler}>
              <h3>Register</h3>

              {this.state.err ? (
                <Alert variant='danger' style={{ fontSize: '10px' }}>
                  <Alert.Heading>
                    Please check passwords should be same or username
                  </Alert.Heading>
                </Alert>
              ) : null}

              <div className='form-group'>
                <label className='label'>Username</label>
                <input
                  type='text'
                  className='form-control'
                  name='username'
                  placeholder='Username'
                  onChange={this.changeInputHandler}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Email</label>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Enter email'
                  name='email'
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
                  required
                />
              </div>

              <div className='form-group'>
                <label>Confirm Passowrd</label>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Confirm password'
                  name='cpassword'
                  onChange={this.changeInputHandler}
                  required
                />
              </div>

              <button type='submit' className='btn btn-dark btn-lg btn-block'>
                Register
              </button>
              <NavLink to='/login' className={`btn btn-info btn-lg btn-block`}>
                Login
              </NavLink>
              <p className='forgot-password text-right'>
                Already registered log in?
              </p>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(SignUp);
