import * as React from 'react';
import './Header.scss';

export interface Props {
  children?: React.ReactNode;
}

export interface State {}

export default class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <header>
        <h1>NS-api</h1>
      </header>
    );
  }
}
