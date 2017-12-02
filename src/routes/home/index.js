import { h, Component } from "preact";
import { route } from "preact-router";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import swal from "sweetalert2";
import fire from "../../components/fire";

import style from "./style";

class Home extends Component {
  state = {
    name: "",
    pin: ""
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
  }

  handleNameChange(name) {
    const { cookies } = this.props;

    cookies.set("name", name, { path: "/" });
    this.setState({ name });
  }

  handlePinChange(pin) {
    const { cookies } = this.props;

    cookies.set("pin", pin, { path: "/" });
    this.setState({ pin });
  }

  checkUser = () => {
    fire
      .database()
      .ref("Users/" + this.state.name)
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          //console.log(snapshot.val());
          if (snapshot.val().pin == this.state.pin) {
            console.log("Old User.");
            this.loginWithPin();
          } else {
            this.setState({ name: "", pin: "" });
            swal("Oops...", "Something went wrong! PIN is incorrect.", "error");
            console.log("Login Error.");
            return;
          }
        } else {
          this.registerNewUser();
          console.log("New User.");
          this.loginWithPin();
        }
      });
  };

  registerNewUser = () => {
    fire
      .database()
      .ref("Users/" + this.state.name)
      .set({
        name: this.state.name,
        pin: this.state.pin,
        lastLogin: Date.now(),
        state: "Logon"
      });
  };

  loginWithPin = () => {
    route("/lobby/" + window.btoa(this.state.name));
  };

  handleEnter = () => {
    this.checkUser();
  };

  handleChange = e => {
    if (e.target.getAttribute("type") == "name") {
      this.handleNameChange(e.target.value);
    } else if (e.target.getAttribute("type") == "pin") {
      this.handlePinChange(e.target.value);
    }
  };

  render({}, { name, pin }) {
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
                  <p class="subtitle">Let's start!</p>
                  <figure class="avatar">
                    <img
                      class={style.corners}
                      src={
                        "https://api.adorable.io/avatars/150/" + name + ".png"
                      }
                    />
                  </figure>
                  <br />
                  <form>
                    <div class="field">
                      <div class="control has-icons-left">
                        <span class="icon is-small is-left">
                          <i class="fa fa-user" />
                        </span>
                        <input
                          class="input"
                          type="name"
                          placeholder="Your Name"
                          autofocus=""
                          value={name}
                          onInput={this.handleChange}
                        />
                      </div>
                    </div>
                    <div class="field">
                      <div class="control has-icons-left">
                        <span class="icon is-small is-left">
                          <i class="fa fa-key" />
                        </span>
                        <input
                          class="input"
                          type="pin"
                          placeholder="Your PIN"
                          value={pin}
                          onInput={this.handleChange}
                        />
                      </div>
                    </div>
                    <a onClick={this.handleEnter} class="button is-success">
                      &nbsp;Enter&nbsp;
                    </a>&nbsp;&nbsp;
                    <a class="button is-warning">Observe</a>
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

export default withCookies(Home);
