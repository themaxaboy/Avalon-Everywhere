import { h, Component } from "preact";
import Card from "preact-material-components/Card";
import Textfield from "preact-material-components/Textfield";
import Button from "preact-material-components/Button";
import "preact-material-components/Card/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/Textfield/style.css";
import "preact-material-components/Button/style.css";
import "preact-material-components/Theme/style.css";
import style from "./style";

export default class Home extends Component {
  render() {
    return (
      <div class={style.home}>
        <center>
          <h1>Welcome to Avalon Everywhere</h1>
        </center>
        <Card>
          <Card.Primary>
            <Card.Title>
              <b>Login</b>
            </Card.Title>
          </Card.Primary>
          <Card.SupportingText>
            <Textfield
              helptext="Use the old name to reconnect"
              label="Username"
            />
            <Textfield type="password" label="Enter a Pin" />
          </Card.SupportingText>
          <Card.Actions>
            <Button raised ripple>
              Play
            </Button>
            &nbsp;
            <Button raised className="mdc-theme--secondary-bg">
              Observe
            </Button>
          </Card.Actions>
        </Card>
      </div>
    );
  }
}
