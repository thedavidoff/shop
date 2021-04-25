import React, { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  makeStyles,
  Grid,
  Container,
  Hidden,
  Drawer,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { InstantSearch } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";

import { productsRequest, toggleIsOpenSidebar } from "./redux/homeReducer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import Notice from "./components/UI/Notice/Notice";
import HeaderBox from "./components/UI/HeaderBox/HeaderBox";
import Routes from "./Routes";

const searchClient = algoliasearch(
  "US0VQUY41A",
  "2b31cc8833e2307117c0616ae917810b"
);

const useStyles = makeStyles((theme) => ({
  headerBoxWrapper: {
    padding: 15,
    color: "#fff",
    backgroundColor: theme.palette.primary.light,
  },
  sidebar: {
    minWidth: 220,
    flexBasis: 220,
    [theme.breakpoints.down("xs")]: {
      minWidth: "auto",
      flexBasis: "auto",
    },
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    position: "relative",
  },
  drawerContainer: {
    overflow: "auto",
  },
  closeButton: {
    "&:hover": { backgroundColor: "rgba(0, 0, 0, .1)" },
  },
  closeButtonRoot: {
    minWidth: 50,
    position: "absolute",
    top: 0,
    right: 10,
  },
  closeButtonIcon: {
    fontSize: 40,
    color: theme.palette.primary.dark,
  },
  home: {
    color: theme.palette.primary.dark,
  },
}));

const App = ({
  isOpenSidebar,
  productsRequest,
  toggleIsOpenSidebar,
  window,
}) => {
  const classes = useStyles();

  useEffect(() => {
    productsRequest();
  }, [productsRequest]);

  const toggleDrawer = (open) => () => {
    toggleIsOpenSidebar(open);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <HashRouter basename="/">
      <Container maxWidth="xl" disableGutters>
        <InstantSearch indexName="shop" searchClient={searchClient}>
          <HeaderContainer />
          <Grid container>
            <Grid item className={classes.sidebar}>
              <Hidden smUp implementation="css">
                <Drawer
                  container={container}
                  anchor="left"
                  open={isOpenSidebar}
                  onClose={toggleDrawer(false)}
                  variant="temporary"
                  ModalProps={{ keepMounted: true }}
                  className={classes.drawer}
                  classes={{ paper: classes.drawerPaper }}
                >
                  <div className={classes.drawerContainer}>
                    <div className={classes.headerBoxWrapper}>
                      <HeaderBox />
                      <Button
                        className={classes.closeButton}
                        classes={{ root: classes.closeButtonRoot }}
                        onClick={toggleDrawer(false)}
                      >
                        <CloseIcon className={classes.closeButtonIcon} />
                      </Button>
                    </div>
                    <Sidebar />
                  </div>
                </Drawer>
              </Hidden>
              <Hidden xsDown implementation="css">
                <Drawer
                  open
                  onClose={toggleDrawer(false)}
                  variant="permanent"
                  className={classes.drawer}
                  classes={{ paper: classes.drawerPaper }}
                >
                  <div className={classes.drawerContainer}>
                    <Sidebar />
                  </div>
                </Drawer>
              </Hidden>
            </Grid>
            <Grid item xs>
              <Notice type="warning" />
              <Routes />
            </Grid>
          </Grid>
        </InstantSearch>
      </Container>
    </HashRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    isOpenSidebar: state.homePage.isOpenSidebar,
  };
};

export default connect(mapStateToProps, {
  productsRequest,
  toggleIsOpenSidebar,
})(App);
