import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Post from "./components/Post";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <section className="App-main">
          <Post
            nickname="Scott"
            avatar="https://i.imgur.com/CjDXC37.jpg"
            caption="Moving the community!"
            image="https://i.imgur.com/QgvRzU3.jpg"
          />
          <Post
            nickname="Blanca"
            avatar="https://randomuser.me/api/portraits/women/46.jpg"
            caption="Hola! Visitng Madrid!"
            image="https://www.esmadrid.com/sites/default/files/styles/content_type_full/public/editorial/GranViaMadrid_1398771941838_1401274516.173.jpg"
          />

          {/* more posts */}
        </section>
      </div>
    );
  }
}

export default App;
