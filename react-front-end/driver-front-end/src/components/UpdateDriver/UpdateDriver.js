import React, { Component } from 'react';
import Aux from '../../Aux';
import { Form, Button, Container } from 'react-bootstrap';
import classes from './UpdateDriver.module.css';
import { Redirect } from 'react-router-dom';
import APIService from '../../containers/APIService';

export default class UpdateDriver extends Component {
  state = {
    data: {
      name: '',
      salary: '',
      route: '',
      redirect: null,
    },
  };
  componentDidMount() {
    APIService.retrieveUpdateIndividualDriver(this.props.indID).then((res) => {
      this.setState({
        data: res.data,
      });
    });
  }

  //METHOD:
  changedInputHandler = (e) => {
    let data = { ...this.state.data };
    data[e.target.name] = e.target.value;
    this.setState({
      data: data,
    });
  };
  formSubmittedHandler = (e) => {
    e.preventDefault();

    const request = {
      name: this.state.data.name,
      route: this.state.data.route,
      salary: this.state.data.salary,
    };

    APIService.updateIndividualDriver(this.props.indID, request).then((res) => {
      this.setState({
        redirect: true,
      });
    });
  };

  render() {
    let content = 'Loading....';
    if (this.state.data) {
      content = (
        <Container>
          <Form
            onSubmit={this.formSubmittedHandler}
            className={classes.UpdateDriver}
          >
            <Form.Group controlId='formBasicName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter name'
                value={this.state.data.name}
                onChange={this.changedInputHandler}
              />
            </Form.Group>
            <Form.Group controlId='formBasicSalary'>
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type='number'
                name='salary'
                placeholder='Enter salary'
                value={this.state.data.salary}
                onChange={this.changedInputHandler}
              />
            </Form.Group>
            <Form.Group controlId='formBasicName'>
              <Form.Label>Route</Form.Label>
              <Form.Control
                type='text'
                name='route'
                placeholder='Enter route'
                value={this.state.data.route}
                onChange={this.changedInputHandler}
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Container>
      );
    }
    if (this.state.redirect) {
      content = (
        <Redirect
          to={{
            pathname: '/api/v1/drivers',
            state: true,
          }}
        />
      );
      <Redirect />;
    }
    return <Aux>{content}</Aux>;
  }
}
