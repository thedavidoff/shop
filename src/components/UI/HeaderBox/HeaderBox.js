import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles, Button, Grid } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as PropTypes from "prop-types";

import { toggleIsOpenSidebar } from "../../../redux/homeReducer";
import { getCountInCart, getTotalCost } from "../../../redux/selectors";
import Cart from "../../Header/Cart/Cart";
import DarkTooltip from "../Tooltip/DarkTooltip";
import Login from "../../Login/Login";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    display: "flex",
    flexBasis: 290,
  },
  button: {
    fontSize: 40,
    marginLeft: 15,
    "&:hover": { backgroundColor: "rgba(0, 0, 0, .1)" },
  },
  buttonRoot: {
    minWidth: 70,
  },
  home: {
    color: theme.palette.primary.dark,
  },
  wishList: {
    color: theme.palette.error.light,
  },
}));

const HeaderBox = (props) => {
  const classes = useStyles();

  return (
    <Grid container justify="flex-start" style={{ width: 290 }}>
      <Grid item className={classes.gridItem}>
        <Login />
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Cart
          countOfProductsInCart={props.countOfProductsInCart}
          totalCost={props.totalCost}
        />
        <DarkTooltip title="Список желаний" placement="bottom">
          <Button
            component={Link}
            to="/profile?tab=wishlist"
            className={classes.button}
            classes={{ root: classes.buttonRoot }}
          >
            <FavoriteIcon
              className={classes.wishList}
              style={{ fontSize: 40 }}
            />
          </Button>
        </DarkTooltip>
      </Grid>
    </Grid>
  );
};

HeaderBox.propTypes = {
  countOfProductsInCart: PropTypes.number,
  totalCost: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    countOfProductsInCart: getCountInCart(state),
    totalCost: getTotalCost(state),
  };
};

export default connect(mapStateToProps, { toggleIsOpenSidebar })(HeaderBox);
