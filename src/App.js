import React, { useEffect } from "react";
import { makeStyles, Grid, Container } from "@material-ui/core";
import { connect } from "react-redux";

import "./App.css";
import { productsRequest } from "./redux/homeReducer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import Notices from "./components/UI/Notices/Notices";
import Routes from "./Routes";

const useStyles = makeStyles(() => ({
  sidebar: {
    minWidth: 220,
    flexBasis: 220,
  },
}));

const App = ({ rangePrices, productsRequest }) => {
  useEffect(() => {
    productsRequest();
  }, [productsRequest]);

  const classes = useStyles();

  return (
    <Container maxWidth="xl" disableGutters>
      <HeaderContainer />
      <Grid container>
        <Grid item className={classes.sidebar}>
          <Sidebar rangePrices={rangePrices} />
        </Grid>
        <Grid item xs>
          <Notices type="warning" />
          <Routes />
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.firebase.auth,
    rangePrices: state.homePage.rangePrices,
  };
};

export default connect(mapStateToProps, { productsRequest })(App);
