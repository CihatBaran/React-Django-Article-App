import React from 'react';
import NavbarMain from './components/Navbar/Navbar';
import Aux from './Aux';

export default function Layout(props) {
  return (
    <Aux>
      <NavbarMain />
      {props.children}
    </Aux>
  );
}
