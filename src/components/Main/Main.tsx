import * as React from 'react';
import DepartureTimes from '../DepartureTimes';
import './Main.scss';
import RoutePlanner from '../RoutePlanner';
import MalfunctionsMaintenance from '../MalfunctionsMaintenance';

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
        <RoutePlanner />
        <DepartureTimes />
        <MalfunctionsMaintenance />
      </main>
    );
  }
}
