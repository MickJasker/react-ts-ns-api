import * as React from 'react';
import axios from 'axios';
import './RoutePlanner.scss';
import * as moment from 'moment';
import RoutePlannerTravelPart from '../RoutePlannerTravelPart';

export interface Props {
  children?: React.ReactNode;
}

export interface State {
  fromStation: String;
  toStation: String;
  advices: Array<Element>;
}

interface JourneyAdvice {
  AantalOverstappen: Number;
  GeplandeReisTijd: String;
  ActueleReisTijd: String;
  Optimaal: Boolean;
  GeplandeVertrekTijd: Date;
  ActueleVertrekTijd: Date;
  GeplandeAankomstTijd: Date;
  ActueleAankomstTijd: Date;
  Status: string;
}

export default class RoutePlanner extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.planJourney = this.planJourney.bind(this);
  }

  componentWillMount() {
    this.setState({
      fromStation: '',
      toStation: '',
      advices: []
    });
  }

  public render() {
    return (
      <section className="route-planner card">
        <h2>Reisplanner</h2>
        <form onSubmit={this.planJourney}>
          <label>
            Van:
            <input
              type="text"
              name="fromStation"
              onChange={this.handleChange}
            />
            Naar:
            <input type="text" name="toStation" onChange={this.handleChange} />
            <button type="submit">Plan je reis</button>
          </label>
        </form>
        <div className="tabelVal">
          <h5>Reistijd</h5>
          <h5>Aantal overstappen</h5>
          <h5>Vertrektijd</h5>
        </div>

        <ul>{this.state.advices}</ul>
      </section>
    );
  }

  private handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    const partialState = {};
    partialState[name] = value;
    this.setState(partialState);
  }

  private planJourney(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios({
      url: 'http://localhost:5001/ns-app-666fc/us-central1/routePlanner',
      method: 'post',
      data: {
        from: this.state.fromStation,
        to: this.state.toStation
      }
    }).then(response => {
      const advices = response.data.map((advice: JourneyAdvice) => (
        <li key={moment(advice.ActueleAankomstTijd).unix()}>
          <h2 className="dest">{advice.ActueleReisTijd}</h2>
          <h5 className="trainType">{advice.AantalOverstappen}</h5>
          <h4 className="time">
            {moment(advice.ActueleVertrekTijd).format('H:mm')}
          </h4>
          <RoutePlannerTravelPart />
        </li>
      ));
      this.setState({
        advices: advices
      });
    });
  }
}
