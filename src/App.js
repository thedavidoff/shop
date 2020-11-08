import React, { useEffect } from "react";
import { makeStyles, Grid, Container } from "@material-ui/core";
import { InstantSearch } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";
import { connect } from "react-redux";

import { productsRequest } from "./redux/homeReducer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import Routes from "./Routes";
import Notice from "./components/UI/Notice/Notice";

const searchClient = algoliasearch(
  "I21C32G5C2",
  "85a7081843a79618290d2c0a18ddf6af"
);

const useStyles = makeStyles(() => ({
  sidebar: {
    minWidth: 220,
    flexBasis: 220,
  },
}));

const App = ({ productsRequest }) => {
  useEffect(() => {
    productsRequest();
  }, [productsRequest]);

  const classes = useStyles();

  return (
    <Container maxWidth="xl" disableGutters>
      <InstantSearch indexName="dev_NAME" searchClient={searchClient}>
        <HeaderContainer />
      </InstantSearch>
      <InstantSearch indexName="dev_NAME" searchClient={searchClient}>
        <Grid container>
          <Grid item className={classes.sidebar}>
            <Sidebar />
          </Grid>
          <Grid item xs>
            <Notice type="warning" />
            <Routes />
          </Grid>
        </Grid>
      </InstantSearch>
    </Container>
  );
};

export default connect(null, { productsRequest })(App);
