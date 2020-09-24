import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { makeStyles, Link } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as PropTypes from "prop-types";

import { getWishList } from "../../../redux/selectors";
import { addToWishList } from "../../../redux/authReducer";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  notAdded: {
    fontSize: 13,
    opacity: 0.7,
    "&:hover": { cursor: "pointer", opacity: 1 },
  },
  isAdded: {
    fontSize: 13,
    "&:hover": { cursor: "default" },
  },
  notAddedIcon: {
    marginRight: 3,
    color: theme.palette.error.main,
    verticalAlign: "middle",
  },
  isAddedIcon: {
    marginRight: 3,
    color: theme.palette.primary.main,
    verticalAlign: "middle",
  },
  link: {
    color: "#000",
    textDecoration: "underline",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  span: {
    fontSize: 14,
    lineHeight: 1,
    borderBottom: "1px dashed",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
}));

const AddToWishListButton = ({ id, wishList, addToWishList }) => {
  const classes = useStyles();

  let isAdded = false;
  let style = null;

  if (
    (wishList && wishList.includes(id)) ||
    (Array.isArray(id) && id.every((item) => wishList.indexOf(item) > -1))
  ) {
    isAdded = true;
    style = { opacity: 1, cursor: "default" };
  }

  const handleClick = () => {
    if (Array.isArray(id)) {
      if (wishList.length === 0) {
        id.map((id) => addToWishList(id));
      } else {
        const arrA = wishList.filter((item) => !id.includes(item));
        const arrB = id.filter((item) => !wishList.includes(item));
        const result = arrA.concat(arrB);
        result.map((id) => addToWishList(id));
      }
    } else addToWishList(id);
  };

  return (
    <div style={style} onClick={!isAdded ? handleClick : undefined}>
      {isAdded ? (
        <div className={classes.isAdded}>
          <FavoriteIcon
            className={classes.isAddedIcon}
            style={{ fontSize: 25 }}
          />
          Уже в{" "}
          <Link
            component={NavLink}
            to="/profile?tab=wishlist"
            className={classes.link}
          >
            списке желаний
          </Link>
        </div>
      ) : (
        <div className={classes.notAdded}>
          <FavoriteIcon
            className={classes.notAddedIcon}
            style={{ fontSize: 25 }}
          />
          <Typography component="span" className={classes.span}>В список желаний</Typography>
        </div>
      )}
    </div>
  );
};

AddToWishListButton.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  wishList: PropTypes.array,
  addToWishList: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    wishList: getWishList(state),
  };
};

export default connect(mapStateToProps, { addToWishList })(AddToWishListButton);
