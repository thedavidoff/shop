import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";

import Login from "./components/Login/Login";
import ProductsContainer from "./components/Products/ProductsContainer";
import ProductPage from "./components/Products/Product/ProductPage/ProductPageContainer";
import Order from "./components/Header/Cart/Order/Order";
import Profile from "./components/Profile/Profile";

const Routes = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const tab = query.get("tab");

  const min = +query.get("minPrice");
  const max = +query.get("maxPrice");

  let index;
  if (tab === "regdata") index = 0;
  if (tab === "wishlist") index = 1;

  return (
    <Switch>
      <Redirect exact path="/" to="/shop" />
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/shop" render={() => <ProductsContainer min={min} max={max} />} />
      <Route path="/shop/video_cards/:id" render={() => <ProductPage />} />
      <Route exact path="/order" render={() => <Order />} />
      {/*<PrivateRoute auth={auth} path="/profile" component={() => <Profile />} />*/}
      <Route exact path="/profile" render={() => <Profile index={index} />} />
    </Switch>
  );
};

export default Routes;
