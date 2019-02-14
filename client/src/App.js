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
            nickname="Chris the Corgi"
            avatar="http://placecorgi.com/589/598"
            caption="woof woof vale!"
            image="http://placecorgi.com/1600/1600"
          />
          <Post
            nickname="Dan the Dog"
            avatar="http://placecorgi.com/178/180"
            caption="woof woof"
            image="http://placecorgi.com/1756/1925"
          />

          {/* more posts */}
        </section>
      </div>
    );
  }
}

export default App;
