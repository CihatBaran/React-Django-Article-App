import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Driver(props) {
  return (
    <tr>
      <td className='align-middle'>{props.id}</td>
      <td className='align-middle'>{props.driver.name}</td>
      <td className='align-middle'>{props.driver.salary} &#36;</td>
      <td className='align-middle'>{props.driver.route}</td>
      <td className='align-middle'>{props.driver.start_date_of_employment}</td>
      <td className='align-middle'>{props.driver.salary_status}</td>
      <td className='align-middle'>
        <NavLink to={`/api/v1/drivers/${props.driver.id}`}>
          <Button className='btn btn-primary btn-sm'>Update</Button>
        </NavLink>
      </td>
      <td className='align-middle'>
        <Button className='btn btn-danger btn-sm' onClick={props.deleteClicked}>
          Delete
        </Button>
      </td>
    </tr>
  );
}
