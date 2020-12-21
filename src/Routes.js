import React, { lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

const Login = lazy(() => import("./components/Login/Login"));
const ProductsContainer = lazy(() =>
  import("./components/Products/ProductsContainer")
);
const ProductPage = lazy(() =>
  import("./components/Products/Product/ProductPage/ProductPageContainer")
);
const Order = lazy(() => import("./components/Header/Cart/Order/Order"));
const Profile = lazy(() => import("./components/Profile/Profile"));

const Routes = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const tab = query.get("tab");

  let index;
  if (tab === "regdata") index = 0;
  if (tab === "wishlist") index = 1;

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Switch>
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/" render={() => <ProductsContainer />} />
        <Route path="/video_cards/:id" render={() => <ProductPage />} />
        <Route exact path="/order" render={() => <Order />} />
        <Route exact path="/profile" render={() => <Profile index={index} />} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
