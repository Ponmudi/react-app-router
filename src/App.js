import React, { Component } from 'react';
import {BrowserRouter as Router, Route, NavLink, Redirect, Prompt} from 'react-router-dom';
import './App.css';

const User = (props)=> {
  console.log({props})
  return (
  <div>Welcome User {props.name}
  </div>
  );
};

class App extends Component {
  state = {
    loggedIn: false 
  };

  changeState = ()=>{
    this.setState( prevState=> ({
      loggedIn: !prevState.loggedIn})
    )}

  render() {
    //console.log(this.state.loggedIn)
    return (
      <Router>
        <div className="App"><ul>
          <li><NavLink to="/" exact activeStyle={ {color: "Green"} }>Home</NavLink></li>
          <li><NavLink to="/about" exact activeStyle={ {color: "Green"} } >About</NavLink></li>
          <li><NavLink to="/user/john" exact activeStyle={ {color: "Green"} } >User John</NavLink></li>
          <li><NavLink to="/user/peter" exact activeStyle={ {color: "Green"} } >User Peter</NavLink></li>
        </ul>
        <Prompt when={!this.state.loggedIn} 
         message={(location)=>{
          return location.pathname.startsWith('/user') ? 'Are you sure?' : true;
         }}
       />

          <Route path="/" exact strict render={()=>{
            return <div><h4>Home</h4></div>
          }} />
          <Route path="/about" exact strict render={()=>{
            return <div><h4>About</h4></div>
          }} />
          <Route path="/user/:name" exact strict render={({match})=>{
            return this.state.loggedIn ? (<User name={match.params.name} />) : (<Redirect to={"/"} />)
          }} />
          <br />
          <input onClick={this.changeState.bind(this)} type="button" value={this.state.loggedIn? 'Log Out':'Log In'} />
          
        </div>
      </Router>
    );
  }
}

export default App;
