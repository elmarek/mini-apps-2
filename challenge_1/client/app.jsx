import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isLoaded: false,
      value: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault(e);
    fetch(`/events?q=${this.state.value}&_page&_limit=20`)
      .then((data) => data.json())
      .then((events) => {
        this.setState({
          events: events,
          isLoaded: true,
        });
      })
      .catch((err) => console.log("error getting events: ", err));
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div>
          {this.state.events.map((event) => {
            return <div key={event.description}>{event.description}</div>;
          })}
        </div>
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            <p>Search Event: </p>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
