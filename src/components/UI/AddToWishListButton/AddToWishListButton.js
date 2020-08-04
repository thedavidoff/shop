import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmpty, isLoaded } from "react-redux-firebase";
import PropTypes from "prop-types";

import styles from "./AddToWishListButton.module.css";
import HeartSVG from "../SVG/HeartSVG";
import { getWishList } from "../../../redux/selectors";
import { addToWishList } from "../../../redux/authReducer";

const AddToWishListButton = ({ isAuth, id, wishList, addToWishList }) => {
  let isAdded = false;
  let style = null;
  if (wishList && wishList.includes(id)) {
    isAdded = true;
    style = { opacity: 1, cursor: "inherit" };
  }

  const handleClick = () => {
    addToWishList(id);
  };

  return (
    <div
      style={style}
      className={styles.addToWishListButton}
      onClick={!isAdded ? handleClick : undefined}
    >
      {isLoaded(isAuth) && !isEmpty(isAuth) && (
        <>
          <HeartSVG width="20" height="20" color={isAdded ? "#2196f3" : "#be1622"} />
          {isAdded ? (
            <>
              Уже в <NavLink to="/profile?tab=wishlist">списке желаний</NavLink>
            </>
          ) : (
            <span>В список желаний</span>
          )}
        </>
      )}
    </div>
  );
};

AddToWishListButton.propTypes = {
  isAuth: PropTypes.object,
  id: PropTypes.number,
  wishList: PropTypes.array,
  addToWishList: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.firebase.auth,
    wishList: getWishList(state),
  };
};

export default connect(mapStateToProps, { addToWishList })(AddToWishListButton);
