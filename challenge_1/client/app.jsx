import React, { Component }  from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

window.React = React;

// export class MyComponent extends Component {
//   MyComponent.propTypes = {
//     data: PropTypes.array.isRequired,
//   };

//   render() {
//     let commentNodes = this.props.data.map(function(comment, index) {
//       return <div key={index}>{comment.comment}</div>;
//     });

//     return (
//       <div id="project-comments" className="commentList">
//         <ul>{commentNodes}</ul>
//       </div>
//     );
//   }
// }

class App extends React.Component {



  constructor(props) {
    super(props);
    App.propTypes = {
      url: PropTypes.string.isRequired,
      perPage: PropTypes.number.isRequired,
    };
    this.state = {
      events: [],
      isLoaded: false,
      value: "",
      pageCount: 10,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault(e);
    fetch(`/events?q=${this.state.value}&_page&_limit=10`)
      .then((data) => data.json())
      .then((events) => {
        this.setState({
          events: events,
          isLoaded: true,
        });
      })
      .then(() => {
        this.setState({
          eventPage: this.state.events[0].description,
          pageNumber: 0,
        })})
      .catch((err) => console.log("error getting events: ", err));
  }


  handlePageClick () {
    let newPage = this.state.pageNumber + 1;
    this.setState({
      pageNumber: {newPage},
      eventPage: this.state.events[{newPage}].description,
    });
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <div>
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
       <p></p>
        <div>
          {/* {this.state.events.map((event) => {
            return (<div><div key={event.description}>{event.description}</div><p></p></div>);
          })} */}
          {this.state.events[0].description}
        </div>
        <div>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
        </div>)

    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            <p>Search Hitorical Events: </p>
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

ReactDOM.render(<App  url={'http://localhost:3000'} perPage={1}/>, document.getElementById("react-paginate"));
