import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './Layout';
import Drivers from './components/Drivers/Drivers';
import NewDriver from './components/NewDriver/NewDriver';
import UpdateDriver from './components/UpdateDriver/UpdateDriver';
import Search from './components/Search/Search';
import Login from './components/Authentication/Login/Login';
import SignUp from './components/Authentication/Register/SignUp';
import Cookies from 'universal-cookie';
import APIService from './containers/APIService';
import Aux from './Aux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.cookies = new Cookies();
    this.state = {
      drivers: null,
      error: null,
      isLoaded: false,
      redirect: null,
      myCookie: this.cookies.get('myToken'),
      loginSignUP: false,
    };
  }

  componentDidMount() {
    APIService.getAllDrivers()
      .then((res) => {
        this.setState({
          drivers: res.data.results,
          isLoaded: true,
          redirectionState: true,
        });
      })
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  }

  componentDidUpdate(prevProps, thisProps) {
    if (prevProps.history.location.state === true) {
      prevProps.history.location.state = null;
      APIService.getAllDrivers()
        .then((res) => {
          this.setState({
            drivers: res.data.results,
            isLoaded: true,
            redirectionState: true,
            redirect: null,
          });
        })
        .catch((err) => {
          this.setState({
            error: err,
          });
        });
    }
  }

  deleteClickedHandler = (id) => {
    APIService.deleteUser(id).then((res) => {
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
    });
  };

  render() {
    return (
      <div className='App'>
        {this.cookies.get('myToken') ? (
          <Layout>
            {this.state.redirect ? this.state.redirect : null}
            <Switch>
              <Route
                path='/api/v1/drivers/new'
                component={() => {
                  return (
                    <Container>
                      <br />
                      <NewDriver />
                    </Container>
                  );
                }}
              />
              <Route
                path='/api/v1/drivers/:id'
                component={() => {
                  let { id } = useParams();
                  return <UpdateDriver indID={id} {...this.props} />;
                }}
              />

              <Route
                path='/search'
                exact
                search='?search'
                component={() => {
                  return <Search {...this.props} />;
                }}
              />

              <Route
                path='/api/v1/drivers'
                component={() => {
                  return (
                    <Aux>
                      {this.state.isLoaded && this.state.drivers ? (
                        <Aux>
                          <br />
                          <Container>
                            <Row>
                              <Drivers
                                drivers={this.state.drivers}
                                deleteClicked={(id) => {
                                  return this.deleteClickedHandler(id);
                                }}
                              />
                            </Row>
                          </Container>
                        </Aux>
                      ) : (
                        <div>Loading...</div>
                      )}
                    </Aux>
                  );
                }}
              />
            </Switch>
          </Layout>
        ) : (
          <Aux>
            <Switch>
              <Route
                path='/login'
                component={() => {
                  return (
                    <Aux>
                      <Login />
                    </Aux>
                  );
                }}
              />

              <Route
                path='/signup'
                component={() => {
                  return (
                    <Aux>
                      <SignUp />
                    </Aux>
                  );
                }}
              />
              <Route
                path='/'
                component={() => {
                  return (
                    <Aux>
                      <Login />
                    </Aux>
                  );
                }}
              />
            </Switch>
          </Aux>
        )}
      </div>
    );
  }
}

export default withRouter(App);
