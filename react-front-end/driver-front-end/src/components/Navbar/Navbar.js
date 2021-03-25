import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Aux from '../../Aux';
import classes from './Navbar.module.css';

class Navbar_main extends React.Component {
  state = {
    redirect: null,
    value: '',
  };
  formSubmittedHandler = (event) => {
    event.preventDefault();
    this.props.history.push(`/search?search=${this.state.value}`);
  };

  onChangeHandler = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    return (
      <Aux>
        {this.state.redirect ? this.state.redirect : null}
        <Navbar bg='light' expand='lg' className={classes.Navbar}>
          <Navbar.Brand href='#home'>
            <NavLink to='/' exact>
              React-Bootstrap
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <NavLink to='/api/v1/drivers' style={{ marginRight: '20px' }}>
                Drivers
              </NavLink>

              <NavLink to='/api/v1/drivers/new' exact>
                New Driver
              </NavLink>
            </Nav>
            <Form onSubmit={this.formSubmittedHandler}>
              <FormControl
                type='text'
                placeholder='Search'
                className='mr-sm-2'
                onChange={this.onChangeHandler}
                style={{ width: '200px', float: 'left' }}
              />
              <Button variant='outline-success' type='submit'>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </Aux>
    );
  }
}

export default withRouter(Navbar_main);
