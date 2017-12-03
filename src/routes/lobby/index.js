import { h, Component } from "preact";
import { route } from "preact-router";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import swal from "sweetalert2";
import fire from "../../components/fire";

import style from "./style";

class Lobby extends Component {
  state = {
    room: "",
    name: ""
  };

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  componentWillMount() {
    const { cookies } = this.props;

    this.state = {
      name: cookies.get("name") || "",
      pin: cookies.get("pin") || ""
    };

    console.log("cookies : " + JSON.stringify(this.state));

    if (this.state.name == "") {
      this.goHome();
    }
  }

  handleRoomChange(room) {
    const { cookies } = this.props;

    cookies.set("room", room, { path: "/" });
    this.setState({ room });
  }

  linkTo = path => () => {
    route(path);
  };

  goHome = this.linkTo("/");

  handleChange = e => {
    if (e.target.getAttribute("type") == "room") {
      this.handleRoomChange(e.target.value);
    }
  };

  handleJoin = () => {
    if (this.state.room == "" || this.state.room == undefined) {
      swal("Oops...", "Something went wrong! Room is incorrect.", "error");
      return;
    } else {
      fire
        .database()
        .ref("Room/" + this.state.room)
        .once("value")
        .then(snapshot => {
          if (snapshot.val()) {
            route("/room/" + window.btoa(this.state.room));
          } else {
            swal(
              "Oops...",
              "Something went wrong! Room is incorrect.",
              "error"
            );
            this.setState({ room: "" });
          }
        });
    }
  };

  handleCreate = () => {
    let room = Date.now()
      .toString()
      .slice(7, 13);
    fire
      .database()
      .ref("Room/" + room)
      .set({
        
        Mission: 0,
        Round: 0,
        MissionInfo: {
          1: "",
          2: "",
          3: "",
          4: "",
          5: ""
        },
        Role: {
          Merlin: ""
        },
        Score: {
          Resistance: 0,
          Spy: 0
        },
        Users: {
          [this.state.name]: "Admin"
        },
        Status: "Waiting"
      });

    route("/room/" + window.btoa(room));
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
                    <a onClick={this.handleJoin} class="button is-success">
                      &nbsp;Join&nbsp;
                    </a>&nbsp;&nbsp;
                    <a onClick={this.handleCreate} class="button is-warning">
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

export default withCookies(Lobby);
