import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';
import Drivers from './components/Drivers/Drivers';
import { Container, Row } from 'react-bootstrap';
import React from 'react';
import axios from './axios';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Aux from './Aux';
import NewDriver from './components/NewDriver/NewDriver';
import { useParams } from 'react-router-dom';
import UpdateDriver from './components/UpdateDriver/UpdateDriver';
import Search from './components/Search/Search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers: null,
      error: null,
      isLoaded: false,
      redirect: null,
    };
  }

  componentDidMount() {
    axios
      .get('/api/v1/drivers')
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
      axios
        .get('/api/v1/drivers')
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
    axios.delete(`/api/v1/drivers/${id}`).then((res) => {
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

            <Route
              path='/'
              component={() => {
                return (
                  <h1>WELCOME TO PAGE This is for creating new drivers</h1>
                );
              }}
            />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
