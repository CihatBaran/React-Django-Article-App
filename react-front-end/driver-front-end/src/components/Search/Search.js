import React, { Component } from 'react';
import queryString from 'query-string';

import Aux from '../../Aux';
import { Container, Row } from 'react-bootstrap';
import Drivers from '../Drivers/Drivers';
import APIService from './../../containers/APIService';

export default class Search extends Component {
  state = {
    drivers: null,
  };
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);

    APIService.searchGetByName(values.search)
      .then((res) => {
        this.setState({
          drivers: res.data.results,
          isLoaded: true,
        });
      })
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  }
  render() {
    let content = <div>Loading...</div>;

    if (this.state.drivers) {
      content = (
        <Aux>
          <br />
          <Container>
            <Row>
              <Drivers drivers={this.state.drivers} />
            </Row>
          </Container>
        </Aux>
      );
      if (this.state.drivers.length === 0) {
        content = 'No Data Found';
      }
    }

    return <Aux>{content}</Aux>;
  }
}
