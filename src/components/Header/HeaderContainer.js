import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles, AppBar, Toolbar, Grid, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as PropTypes from "prop-types";

import Login from "../Login/Login";
import Search from "./Search/Search";
import Cart from "./Cart/Cart";
import DarkTooltip from "../UI/Tooltip/DakTooltip";
import { getCountInCart, getTotalCost } from "../../redux/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: "space-between",
  },
  button: {
    "&:hover": { backgroundColor: "rgba(0, 0, 0, .1)" },
  },
  home: {
    color: theme.palette.primary.dark,
  },
  wishList: {
    color: theme.palette.error.light,
  },
}));

const HeaderContainer = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.header}>
        <Grid container justify="flex-end">
          <Grid item style={{ display: "flex", flexBasis: 311 }}>
            <Login />
          </Grid>
          <Grid item xs={12} style={{ display: "flex" }}>
            <Button
              component={Link}
              to="/shop"
              className={classes.button}
              style={{ margin: "0 58px" }}
            >
              <HomeIcon className={classes.home} style={{ fontSize: 40 }} />
            </Button>
            <Search />
            <Cart
              countOfProductsInCart={props.countOfProductsInCart}
              totalCost={props.totalCost}
            />
            <DarkTooltip title="Список желаний" placement="bottom">
              <Button
                component={Link}
                to="/profile?tab=wishlist"
                className={classes.button}
                style={{ fontSize: 40, marginLeft: 16 }}
              >
                <FavoriteIcon
                  className={classes.wishList}
                  style={{ fontSize: 40 }}
                />
              </Button>
            </DarkTooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

HeaderContainer.propTypes = {
  countOfProductsInCart: PropTypes.number,
  totalCost: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    countOfProductsInCart: getCountInCart(state),
    totalCost: getTotalCost(state),
  };
};

export default connect(mapStateToProps)(HeaderContainer);
