import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import Board from "./components/board.js";
import "./index.css";

class Game extends React.Component {
  state = {
    height: 8,
    width: 8,
    mines: 10,
  };

  render() {
    const { height, width, mines } = this.state;
    return (
      <div className="game">
        <Board height={height} width={width} mines={mines} />
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
