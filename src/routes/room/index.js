import { h, Component } from "preact";
import { route } from "preact-router";

import style from "./style";

export default class Room extends Component {
  state = {
    data: "456",
    players: 1
  };

  linkTo = path => () => {
    route(path);
  };

  goHome = this.linkTo("/");

  render({ room }, { data, players }) {
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
                  <table class="table is-narrow is-fullwidth">
                    <tbody>
                      <tr>
                        <td>
                          <figure class="avatar">
                            <img
                              class={style.corners}
                              src={
                                "https://api.adorable.io/avatars/20/a" +
                                data +
                                ".png"
                              }
                            />
                          </figure>
                        </td>
                        <td>
                          <figure class="avatar">
                            <img
                              class={style.corners}
                              src={
                                "https://api.adorable.io/avatars/20/b" +
                                data +
                                ".png"
                              }
                            />
                          </figure>
                        </td>
                        <td>
                          <figure class="avatar">
                            <img
                              class={style.corners}
                              src={
                                "https://api.adorable.io/avatars/20/c" +
                                data +
                                ".png"
                              }
                            />
                          </figure>
                        </td>
                        <td>
                          <figure class="avatar">
                            <img
                              class={style.corners}
                              src={
                                "https://api.adorable.io/avatars/20/d" +
                                data +
                                ".png"
                              }
                            />
                          </figure>
                        </td>
                        <td>
                          <figure class="avatar">
                            <img
                              class={style.corners}
                              src={
                                "https://api.adorable.io/avatars/20/e" +
                                data +
                                ".png"
                              }
                            />
                          </figure>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <nav class="level is-mobile">
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">Room No.</p>
                        <p class="title is-5">{room}</p>
                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <div>
                        <p class="heading">Players</p>
                        <p class="title is-5">{players}/5</p>
                      </div>
                    </div>
                  </nav>
                  <form>
                    <a class="button is-success">&nbsp;Start&nbsp;</a>&nbsp;&nbsp;
                    <a class="button is-danger">Close</a>
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
