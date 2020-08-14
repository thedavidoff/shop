import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";
import { productsRequest } from "./redux/homeReducer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import Notices from "./components/UI/Notices/Notices";
import Routes from "./Routes";

class App extends Component {
  componentDidMount() {
    this.props.productsRequest();
  }

  render() {
    return (
      <div className="App">
        <HeaderContainer />
        <Sidebar rangePrices={this.props.rangePrices} />
        <div className="body">
          <Notices type="Друзья! Посещение наших магазинов возможно только в медицинской маске или респираторе. Берегите себя и окружающих!" />
          <Routes />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rangePrices: state.homePage.rangePrices,
  };
};

export default connect(mapStateToProps, { productsRequest })(App);
