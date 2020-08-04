import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmpty, isLoaded } from "react-redux-firebase";
import PropTypes from "prop-types";

import styles from "./AddToWishListButton.module.css";
import HeartSVG from "../SVG/HeartSVG";
import { getWishList } from "../../../redux/selectors";
import { addToWishList } from "../../../redux/authReducer";

const AddToWishListButton = ({ id, isAuth, wishList, addToWishList }) => {
  let isAdded = false;
  let style = null;

  if ((wishList && wishList.includes(id)) || (Array.isArray(id) && wishList.length === id.length)) {
    isAdded = true;
    style = { opacity: 1, cursor: "inherit" };
  }

  const handleClick = () => {
    if (Array.isArray(id)) {
      if (wishList.length === 0) {
        id.map((id) => addToWishList(id));
      } else {
        const arrA = wishList.filter((k) => !id.includes(k));
        const arrB = id.filter((k) => !wishList.includes(k));
        const result = arrA.concat(arrB);
        result.map((id) => addToWishList(id));
      }
    } else addToWishList(id);
  };

  return (
    <div
      style={style}
      className={styles.addToWishListButton}
      onClick={!isAdded ? handleClick : undefined}
    >
      {isLoaded(isAuth) && !isEmpty(isAuth) && (
        <>
          <HeartSVG
            width="20"
            height="20"
            color={isAdded ? "#2196f3" : "#be1622"}
          />
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
