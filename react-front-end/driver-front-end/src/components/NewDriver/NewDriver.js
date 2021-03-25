import React from 'react';
import { Form, Button } from 'react-bootstrap';
import classes from './NewDriver.module.css';
import axios from '../../axios';
import { withRouter, Redirect } from 'react-router-dom';

class NewDriver extends React.Component {
  constructor() {
    super();
    this.state = {
      driver: {
        name: '',
        salary: '',
        route: '',
      },
      redirect: null,
    };
  }

  handleNameChange = (event) => {
    let driver = { ...this.state.driver };
    driver[event.target.name] = event.target.value;
    this.setState({ driver: driver });
  };

  formSubmittedHandler = (event) => {
    event.preventDefault();
    axios.post('/api/v1/drivers/new', this.state.driver).then((res) => {
      if (res.status === 201) {
        this.setState({
          redirect: true,
        });
      }
    });
  };

  render() {
    let content = (
      <Form
        onSubmit={this.formSubmittedHandler}
        className={classes.NewDriverPostForm}
      >
        <Form.Group controlId='formBasicName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            placeholder='Enter name'
            onChange={this.handleNameChange}
          />
        </Form.Group>
        <Form.Group controlId='formBasicSalary'>
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type='number'
            name='salary'
            placeholder='Enter salary'
            onChange={this.handleNameChange}
          />
        </Form.Group>
        <Form.Group controlId='formBasicName'>
          <Form.Label>Route</Form.Label>
          <Form.Control
            type='text'
            name='route'
            placeholder='Enter route'
            onChange={this.handleNameChange}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    );
    if (this.state.redirect) {
      content = (
        <Redirect
          to={{
            pathname: '/api/v1/drivers',
            state: true,
          }}
        />
      );
    }
    return <div>{content}</div>;
  }
}

export default withRouter(NewDriver);
