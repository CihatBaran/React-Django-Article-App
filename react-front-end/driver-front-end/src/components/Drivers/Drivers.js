import React from 'react';
import { Table } from 'react-bootstrap';
import Driver from './Driver/Driver';

export default function Drivers(props) {
  return (
    <Table striped bordered hover size='sm'>
      <thead>
        <tr className='align-middle'>
          <th>#Seq</th>
          <th>Name</th>
          <th>Salary</th>
          <th>Route</th>
          <th>Start Date of Employment</th>
          <th>Salary Status</th>
          <th>Delete</th>
          <th>Update</th>
        </tr>
      </thead>
      <tbody>
        {props.drivers
          ? props.drivers.map((driver, index) => {
              return (
                <Driver
                  key={index}
                  driver={driver}
                  id={index + 1}
                  deleteClicked={() => {
                    return props.deleteClicked(driver.id);
                  }}
                />
              );
            })
          : null}
      </tbody>
    </Table>
  );
}
