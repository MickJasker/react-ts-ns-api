import * as React from 'react';
import './DepartureTimes.scss';
import axios from 'axios';
import * as moment from 'moment';

export interface Props {
  children?: React.ReactNode;
}

export interface State {
  departures: Array<Element>;
  station: String;
  error: String;
}

interface Departures {
  EindBestemming: String;
  RitNummer: number;
  TreinSoort: String;
  Vervoerder: String;
  VertrekTijd: Date;
  RouteTekst: String;
  VertrekSpoor: String;
  ReisTip: String;
}

export default class DepartureTimes extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getDepartureTimes = this.getDepartureTimes.bind(this);
  }
  componentWillMount() {
    this.setState({
      departures: [],
      error: ''
    });
  }

  public render() {
    return (
      <section className="departure-times">
        <h2>Vertrektijden</h2>
        <form onSubmit={this.getDepartureTimes}>
          <label>
            Station:
            <input type="text" name="name" onChange={this.handleChange} />
            <button>Laad data</button>
          </label>
        </form>
        <h5>{this.state.error}</h5>
        <ul>{this.state.departures}</ul>
      </section>
    );
  }

  private handleChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ station: e.currentTarget.value });
  }

  private getDepartureTimes(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios({
      url: 'http://localhost:5001/ns-app-666fc/us-central1/departureTimes',
      method: 'post',
      data: {
        station: this.state.station
      }
    })
      .then(response => {
        const departureTimes = response.data.map((dep: Departures) => (
          <li key={dep.RitNummer}>
            <h2 className="dest">{dep.EindBestemming}</h2>
            <h5 className="trainType">{dep.TreinSoort}</h5>
            <h2 className="trans">{dep.Vervoerder}</h2>
            <h2 className="time">{moment(dep.VertrekTijd).format('H:mm')}</h2>
            <h5 className="routeInfo">{dep.RouteTekst}</h5>
            <h2 className="spoor">{dep.VertrekSpoor}</h2>
            <h5 className="note">{dep.ReisTip}</h5>
          </li>
        ));
        this.setState({
          error: '',
          departures: departureTimes
        });
      })
      .catch(error => {
        this.setState({
          error: `Error: ${error.response.data.api.message}`
        });
      });
  }
}
