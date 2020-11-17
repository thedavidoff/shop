import React, { useState } from "react";
import Helmet from "react-helmet";
import ReactTooltip from "react-tooltip";
import {
  List,
  ListItem,
  makeStyles,
  Typography,
  Grid,
  AppBar,
  Tabs,
  Tab,
} from "@material-ui/core";
import * as PropTypes from "prop-types";

import BuyButton from "../../../UI/BuyButton/BuyButton";
import Slider from "./Slider/Slider";
import DeliveryPayBlock from "./DeliveryPayBlock/DeliveryPayBlock";
import SpecificationsBlock from "./SpecificationsBlock/SpecificationsBlock";
import ReviewsContainer from "../Reviews/ReviewsContainer";
import Preloader from "../../../UI/Preloader/Preloader";
import stylesTooltip from "../../../UI/Tooltip/Tooltip.module.css";
import Rating from "../../../UI/Rating/Rating";
import AddToWishListButton from "../../../UI/AddToWishListButton/AddToWishListButton";
import ViewRest from "../../../UI/ViewRest/ViewRest";
import ForwardLink from "../../../UI/ForwardLink/ForwardLink";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: "0 15px",
    height: 30,
    fontSize: 16,
    lineHeight: "30px",
    color: "#fff",
    background: theme.palette.primary.light,
    borderRadius: "4px 4px 0 0",
  },
  slider: {
    marginBottom: 8,
  },
  productInfo: {
    padding: "15px 15px 15px 30px",
  },
  list: {
    padding: 0,
  },
  listItem: {
    marginBottom: 8,
    padding: 0,
    "& span": {
      fontSize: 14,
      cursor: "default",
    },
  },
  viewRest: {
    lineHeight: 1.5,
    "& span": {
      fontSize: 14,
    },
  },
  price: {
    paddingBottom: 5,
    color: "#c20000",
    fontSize: 22,
    lineHeight: 1,
  },
  sku: {
    display: "block",
    marginTop: 42,
    color: "darkgray",
  },
  addToCompare: {
    lineHeight: 1,
    borderBottom: "1px dashed",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.secondary.main,
      cursor: "pointer",
    },
  },
}));

const a11yProps = (index) => {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
};

const LinkTab = (props) => {
  return (
    <Tab
      component={ForwardLink}
      label={null}
      to={props.to}
      smooth="true"
      {...props}
    />
  );
};

const ProductPage = ({ product }) => {
  const classes = useStyles();
  const handleClick = () => {
    ReactTooltip.hide();
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${product && product.name} | купить`}</title>
        <link
          rel="canonical"
          href={`http://localhost:3000/video_cards/${
            product && product.id
          }`}
        />
      </Helmet>
      <ReactTooltip className={stylesTooltip.tooltip} />
      {product ? (
        <>
          <Typography component="h1" className={classes.title}>
            {product.name}
          </Typography>
          <Grid container>
            <Grid item className={classes.slider}>
              <Slider product={product} />
            </Grid>
            <Grid item className={classes.productInfo}>
              <List className={classes.list}>
                <ListItem className={classes.listItem} disableGutters>
                  <Typography
                    component="span"
                    data-tip="Мы даем такой срок гарантии, который можем безоговорочно обеспечить, не вводя клиента в заблуждение и не заманивая нереальными гарантийными сроками."
                  >
                    {`Гарантия: ${product.warranty} мес.`}
                  </Typography>
                </ListItem>
                <ListItem className={classes.listItem} disableGutters>
                  <Typography
                    component="span"
                    data-tip="В соответствии с Законом Украины 'О защите прав потребителей' наши покупатели имеют право обменять или вернуть новый товар, который не был в употреблении и не имеет следов использования, в течение первых 14 дней после покупки, а также если его возврат не протеворечит другим статьям, описанным в ЗУ ОЗПП"
                  >
                    Обмен/возврат: 14 дней
                  </Typography>
                </ListItem>
                <ListItem
                  className={`${classes.listItem} ${classes.viewRest}`}
                  onClick={handleClick}
                  data-tip="Посмотреть наличие товара на складах."
                  disableGutters
                >
                  <ViewRest id={product.id} />
                </ListItem>
                {product.totalRating > 0 && (
                  <Rating
                    totalRating={product.totalRating}
                    ratingsCount={product.ratingsCount}
                  />
                )}
                <div className={classes.price}>{`${product.price} грн`}</div>
                <BuyButton id={product.id} status={product.status} />
                <ListItem
                  className={`${classes.listItem} ${classes.sku}`}
                  disableGutters
                >
                  <Typography component="span">
                    {`Код товара: ${product.sku}`}
                  </Typography>
                </ListItem>
                <ListItem className={classes.listItem} disableGutters>
                  <Typography
                    component="span"
                    className={`${classes.span} ${classes.addToCompare}`}
                  >
                    Добавить к сравнению
                  </Typography>
                </ListItem>
                <ListItem className={classes.listItem} disableGutters>
                  <AddToWishListButton id={product.id} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <AppBar position="static">
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="Nav Tabs"
            >
              <LinkTab label="Описание" to="#specs" {...a11yProps(0)} />
              <LinkTab
                label={`Отзывы (${product.reviewsCount})`}
                to="#reviews"
                {...a11yProps(1)}
              />
            </Tabs>
          </AppBar>
          <DeliveryPayBlock />
          <SpecificationsBlock product={product} />
          <ReviewsContainer id={product.id} />
        </>
      ) : (
        <Preloader type="productPage" />
      )}
    </>
  );
};

ProductPage.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    warranty: PropTypes.number,
    totalRating: PropTypes.number,
    ratingsCount: PropTypes.number,
    price: PropTypes.number,
    id: PropTypes.number,
    status: PropTypes.string,
    sku: PropTypes.number,
    reviewsCount: PropTypes.number,
  }),
};

export default ProductPage;
