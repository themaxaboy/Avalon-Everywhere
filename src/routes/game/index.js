import { h, Component } from "preact";
import { route } from "preact-router";

import style from "./style";

export default class Game extends Component {
  state = {
    data: "456"
  };

  linkTo = path => () => {
    route(path);
  };

  goHome = this.linkTo("/");

  render({ room }, { data }) {
    if (room == "anonymous") {
      this.goHome();
    } else {
      room = window.atob(room);
    }

    return (
      <div class={style.wrapper}>
        <section class="hero is-fullheight">
          <div class="hero-body">
            <div class="container has-text-centered">
              <div class="column is-half is-offset-one-quarter">
                <div class="box">
                  <h4 class="title is-4">Avalon Everywhere</h4>
                  <p class="subtitle">Wait for players</p>
                  <article class="media">
                    <div class="media-left">
                      <figure class="avatar">
                        <img
                          class={style.corners}
                          src={
                            "https://api.adorable.io/avatars/150/" +
                            data +
                            ".png"
                          }
                        />
                      </figure>
                    </div>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>John Smith</strong>
                        </p>
                      </div>
                    </div>
                    <div class="media-right">
                      <div class="content">
                        <p>
                        <span class="tag is-primary is-medium">Ready</span>
                        </p>
                      </div>
                    </div>
                  </article>
                  
                  <br />
                  <p class="subtitle">
                    Room No. <b>{room}</b>
                  </p>
                  <form>
                    <a class="button">&nbsp;Start&nbsp;</a>&nbsp;&nbsp;
                    <a class="button">Close</a>
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
