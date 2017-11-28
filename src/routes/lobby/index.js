import { h, Component } from "preact";
import { route } from "preact-router";

import style from "./style";

export default class Lobby extends Component {
  state = {
    room: ""
  };

  linkTo = path => () => {
    route(path);
  };

  goHome = this.linkTo("/");
  goToRoom = room => this.linkTo("/room/" + window.btoa(room));

  handleChange = e => {
    if (e.target.getAttribute("type") == "room") {
      this.setState({ room: e.target.value });
    }
  };

  render({ name }, { room }) {
    if (name == "anonymous") {
      this.goHome();
    } else {
      name = window.atob(name);
    }

    return (
      <div>
        <section class="hero is-fullheight">
          <div class="hero-body">
            <div class="container has-text-centered">
              <div class="column is-half is-offset-one-quarter">
                <div class="box">
                  <h4 class="title is-4">
                    <img src="../../assets/icons/favicon-16x16.png" />
                    &nbsp;Avalon Everywhere
                  </h4>
                  <p class="subtitle">Join -or- Create Room</p>
                  <figure class="avatar">
                    <img
                      class={style.corners}
                      src={
                        "https://api.adorable.io/avatars/150/" + name + ".png"
                      }
                    />
                  </figure>
                  <p class="subtitle">
                    Hello! <b>{name}</b>
                  </p>
                  <form>
                    <div class="field">
                      <div class="control has-icons-left">
                        <span class="icon is-small is-left">
                          <i class="fa fa-users" />
                        </span>
                        <input
                          class="input"
                          type="room"
                          placeholder="Your Room"
                          autofocus=""
                          value={room}
                          onInput={this.handleChange}
                        />
                      </div>
                    </div>
                    <a onClick={this.goToRoom(room)} class="button is-success">
                      &nbsp;Join&nbsp;
                    </a>&nbsp;&nbsp;
                    <a onClick={this.goToRoom(room)} class="button is-warning">
                      Create
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
