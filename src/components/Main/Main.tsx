import * as React from 'react';
import DepartureTimes from '../DepartureTimes';
import './Main.scss';

export interface Props {
  children?: React.ReactNode;
}

export interface State {}

export default class Main extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <main>
        <DepartureTimes />
      </main>
    );
  }
}
