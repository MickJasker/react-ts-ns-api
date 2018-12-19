import * as React from 'react';

export interface Props {
  children?: React.ReactNode;
}

export interface State {}

export default class RoutePlannerTravelPart extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <section className="RoutePlannerTravelPart">
        <h4>Part</h4>
      </section>
    );
  }
}
