import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  makeStyles,
  useMediaQuery,
  AppBar,
  Toolbar,
  Grid,
  Button,
  Hidden,
  Badge,
} from "@material-ui/core";
import {
  Home as HomeIcon,
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@material-ui/icons";
import { InstantSearch } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";
import * as PropTypes from "prop-types";

import { toggleIsOpenSidebar } from "../../redux/homeReducer";
import { getCountInCart } from "../../redux/selectors";
import Search from "./Search/Search";
import HeaderBox from "../UI/HeaderBox/HeaderBox";
import Login from "../Login/Login";

const searchClient = algoliasearch(
  "US0VQUY41A",
  "2b31cc8833e2307117c0616ae917810b"
);

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    backgroundColor: theme.palette.primary.light,
    zIndex: 1201,
  },
  header: {
    paddingTop: 15,
    paddingBottom: 15,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 15,
      paddingRight: 15,
    },
    justifyContent: "space-between",
  },
  buttonsWrapper: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "space-between",
      width: "100%",
    },
  },
  button: {
    height: 70,
    [theme.breakpoints.down("xs")]: {
      height: 56,
    },
    "&:hover": { backgroundColor: "rgba(0, 0, 0, .1)" },
  },
  buttonRoot: {
    minWidth: 70,
    [theme.breakpoints.down("xs")]: {
      minWidth: 50,
    },
  },
  buttonIcon: {
    fontSize: 40,
    color: theme.palette.primary.dark,
  },
  wishList: {
    color: theme.palette.error.light,
  },
}));

const HeaderContainer = (props) => {
  const classes = useStyles();
  const w960 = useMediaQuery("(max-width: 959px)");
  const w600 = useMediaQuery("(max-width: 599px)");

  const toggleDrawer = (open) => () => {
    props.toggleIsOpenSidebar(open);
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.header}>
        <Grid container>
          {w960 && ! w600 ? (
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <Login />
            </Grid>
          ) : null}
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: w600 ? "column-reverse" : "inherit",
            }}
          >
            <InstantSearch indexName="shop" searchClient={searchClient}>
              <Search />
            </InstantSearch>

            <div
              className={classes.buttonsWrapper}
              style={w960 ? null : { order: -1 }}
            >
              {w600 ? (
                <>
                  <Button
                    component={Link}
                    to="/"
                    className={classes.button}
                    classes={{ root: classes.buttonRoot }}
                    style={{ order: 1 }}
                  >
                    <HomeIcon className={classes.buttonIcon} />
                  </Button>
                  <Button
                    className={classes.button}
                    classes={{ root: classes.buttonRoot }}
                    onClick={toggleDrawer(true)}
                    style={{ order: 0 }}
                  >
                    <MenuIcon className={classes.buttonIcon} />
                  </Button>
                </>
              ) : (
                <Button
                  component={Link}
                  to="/"
                  className={classes.button}
                  classes={{ root: classes.buttonRoot }}
                  style={w960 ? { order: 1 } : { margin: "0 55px" }}
                >
                  <HomeIcon className={classes.buttonIcon} />
                </Button>
              )}
              {w960 ? (
                <Button
                  component={Link}
                  to="/order"
                  className={classes.button}
                  classes={{ root: classes.buttonRoot }}
                  style={{ order: 2 }}
                >
                  <Badge
                    badgeContent={props.countOfProductsInCart}
                    color="error"
                  >
                    <ShoppingCartIcon className={classes.buttonIcon} />
                  </Badge>
                </Button>
              ) : null}
            </div>

            <Hidden smDown implementation="css">
              <HeaderBox />
            </Hidden>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

HeaderContainer.propTypes = {
  countOfProductsInCart: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    countOfProductsInCart: getCountInCart(state),
  };
};

export default connect(mapStateToProps, { toggleIsOpenSidebar })(
  HeaderContainer
);
