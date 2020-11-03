import React, { useEffect } from "react";
import { makeStyles, Grid, Container } from "@material-ui/core";
import { connect } from "react-redux";

import { productsRequest } from "./redux/homeReducer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import Routes from "./Routes";
import Notice from "./components/UI/Notice/Notice";

const useStyles = makeStyles(() => ({
  sidebar: {
    minWidth: 240,
    flexBasis: 240,
  },
}));

const App = ({ productsRequest }) => {
  useEffect(() => {
    productsRequest();
  }, [productsRequest]);

  const classes = useStyles();

  return (
    <Container maxWidth="xl" disableGutters>
      <HeaderContainer />
      <Grid container>
        <Grid item className={classes.sidebar}>
          <Sidebar />
        </Grid>
        <Grid item xs>
          <Notice type="warning" />
          <Routes />
        </Grid>
      </Grid>
    </Container>
  );
};

export default connect(null, { productsRequest })(App);
