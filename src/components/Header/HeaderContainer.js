import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

import styles from "./Header.module.css";
import home from "./../../assets/home.png";
import Cart from "./Cart/Cart";
import { getCountInCart, getTotalCost } from "../../redux/selectors";
import Search from "./Search/Search";
import Login from "../Login/Login";
import HeartSVG from "../UI/SVG/HeartSVG";

const HeaderContainer = (props) => {
  return (
    <header className={styles.mainHeader}>
      <NavLink to="/shop">
        <img src={home} className={styles.home} alt="Home" />
      </NavLink>
      <Search />
      <div>
        <Login />
        <NavLink to="/order" className={styles.orderLink}>
          <Cart
            countOfProductsInCart={props.countOfProductsInCart}
            totalCost={props.totalCost}
          />
        </NavLink>
      </div>
      <NavLink
        to="/profile?tab=wishlist"
        className={styles.wishList}
        data-tip="Список желаний."
      >
        <HeartSVG />
      </NavLink>
    </header>
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
