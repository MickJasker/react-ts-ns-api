import * as React from 'react';
import axios from 'axios';

export interface Props {
  children?: React.ReactNode;
}

export interface State {}

export default class MalfunctionsMaintenance extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    this.getMalfunctions();
  }
  render() {
    return (
      <section className="card">
        <h2>Storingen en werkzaamheden</h2>
      </section>
    );
  }

  private getMalfunctions() {
    axios({
      url: 'http://localhost:5001/ns-app-666fc/us-central1/malfunctions'
    }).then(response => {
      console.log(response.data.Gepland[0]);
    });
  }
}
