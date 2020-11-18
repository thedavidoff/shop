import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Login from "./components/Login/Login";
import ProductsContainer from "./components/Products/ProductsContainer";
import ProductPage from "./components/Products/Product/ProductPage/ProductPageContainer";
import Order from "./components/Header/Cart/Order/Order";
import Profile from "./components/Profile/Profile";

const Routes = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const tab = query.get("tab");

  let index;
  if (tab === "regdata") index = 0;
  if (tab === "wishlist") index = 1;

  return (
    <Switch>
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/" render={() => <ProductsContainer />} />
      <Route path="/video_cards/:id" render={() => <ProductPage />} />
      <Route exact path="/order" render={() => <Order />} />
      <Route exact path="/profile" render={() => <Profile index={index} />} />
    </Switch>
  );
};

export default Routes;
