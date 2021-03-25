import React, { Component } from 'react';
import queryString from 'query-string';
import axios from '../../axios';
import Aux from '../../Aux';
import { Container, Row } from 'react-bootstrap';
import Drivers from '../Drivers/Drivers';

export default class Search extends Component {
  state = {
    drivers: null,
  };
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    axios
      .get(`/api/v1/drivers?search=${values.search}`)
      .then((res) => {
        this.setState({
          drivers: res.data.results,
          isLoaded: true,
        });
        console.log(this.state.drivers);
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
