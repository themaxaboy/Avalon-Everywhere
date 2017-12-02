import { h, Component } from "preact";
import { Router } from "preact-router";
import Helmet from "preact-helmet";

// import Header from "./header";
import Home from "async!../routes/home";
import Room from "async!../routes/room";
import Lobby from "async!../routes/lobby";
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <Helmet
          meta={[
            {
              charset: "utf-8"
            }
          ]}
        />
        <Helmet
          meta={[
            {
              name: "viewport",
              content:
                "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            }
          ]}
        />
        <Helmet
          link={[
            {
              rel: "stylesheet",
              href:
                "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
              async: "true"
            }
          ]}
        />
        <Helmet
          link={[
            {
              rel: "stylesheet",
              href:
                "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.1/css/bulma.min.css",
              async: "true"
            }
          ]}
        />
        <Helmet
          link={[
            {
              rel: "stylesheet",
              href:
                "https://unpkg.com/bulmaswatch@0.5.2/lumen/bulmaswatch.min.css",
              async: "true"
            }
          ]}
        />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Room path="/room/" room="anonymous" />
          <Room path="/room/:room" />
          <Lobby path="/lobby/" name="anonymous" />
          <Lobby path="/lobby/:name" />
        </Router>
      </div>
    );
  }
}
