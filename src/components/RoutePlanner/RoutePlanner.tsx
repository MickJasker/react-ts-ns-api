import * as React from 'react';
import axios from 'axios';
import './RoutePlanner.scss';
import * as moment from 'moment';

export interface Props {
  children?: React.ReactNode;
}

export interface State {
  fromStation: string;
  toStation: string;
  advices: Array<Element>;
}

interface JourneyAdvice {
  AantalOverstappen: number;
  GeplandeReisTijd: string;
  ActueleReisTijd: string;
  Optimaal: boolean;
  GeplandeVertrekTijd: Date;
  ActueleVertrekTijd: Date;
  GeplandeAankomstTijd: Date;
  ActueleAankomstTijd: Date;
  Status: string;
  ReisDeel: Array<TravelPart>;
}

interface TravelPart {
  VervoerType: string;
  RitNummer: number;
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
      <section className="route-planner departure-times">
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
    })
      .then(response => {
        const advices = response.data.map((advice: JourneyAdvice) => (
          <li key={moment(advice.ActueleAankomstTijd).unix()}>
            <h2 className="dest">{advice.ActueleReisTijd}</h2>
            <h5 className="trainType">{advice.AantalOverstappen}</h5>
            <h4 className="time">
              {moment(advice.ActueleVertrekTijd).format('H:mm')}
            </h4>
            <ul>
              {advice.ReisDeel.map((travelPart: TravelPart) => (
                <li key={travelPart.RitNummer}>
                  <h5>{travelPart.VervoerType}</h5>
                </li>
              ))}
            </ul>
          </li>
        ));
        this.setState({
          advices: advices
        });
      });
  }
}
