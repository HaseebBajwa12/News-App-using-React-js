
import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize=15;
  state={
    progress:0
  }
  setprogress=(progress)=>{
    this.setState({progress:progress})

  }
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        height={2}
        color='#f11946'
        progress={this.state.progress}
       
      />
        <Switch>
          <Route exact path="/">
          <News setprogress={this.setprogress} key='general' pageSize={this.pageSize} country='in' category='general'/>
          </Route>
          <Route exact path="/Business">
          <News setprogress={this.setprogress} key='business' pageSize={this.pageSize} country='in' category='business'/>
          </Route>
          <Route  exact path="/Entertainment">
          <News  setprogress={this.setprogress} key='entertainment' pageSize={this.pageSize} country='in' category='entertainment'/>
          </Route>
          <Route exact path="/Health">
          <News setprogress={this.setprogress} key='health' pageSize={this.pageSize} country='in' category='health'/>
          </Route>
          <Route exact path="/General">
          <News setprogress={this.setprogress} key='general' pageSize={this.pageSize} country='in' category='general'/>
          </Route>
          <Route exact path="/Science">
          <News setprogress={this.setprogress} key='science' pageSize={this.pageSize} country='in' category='science'/>
          </Route>
          <Route exact path="/Sports">
          <News setprogress={this.setprogress} key='sports' pageSize={this.pageSize} country='in' category='sports'/>
          </Route>
          <Route exact path="/Technology">
          <News setprogress={this.setprogress}  key='technology' pageSize={this.pageSize} country='in' category='technology'/>
          </Route>
        </Switch>
        </Router>
      </div>
    )
  }
}
