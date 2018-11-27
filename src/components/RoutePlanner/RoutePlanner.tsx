import * as React from 'react';
// import axios from 'axios';
import './RoutePlanner.scss';

export interface Props {
  children?: React.ReactNode;
}

export interface State {}

export default class RoutePlanner extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <section className="route-planner">
        <h2>Reisplanner</h2>
      </section>
    );
  }
}
