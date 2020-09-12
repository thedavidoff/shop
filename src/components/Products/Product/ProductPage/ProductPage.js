import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import ReactTooltip from "react-tooltip";
import * as PropTypes from "prop-types";
import Helmet from "react-helmet";

import styles from "./ProductPage.module.css";
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

const ProductPage = ({ product }) => {
  const handleClick = () => {
    ReactTooltip.hide()
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${product && product.name} | купить`}</title>
        <link
          rel="canonical"
          href={`http://localhost:3000/shop/video_cards/${product && product.id}`}
        />
      </Helmet>
      <ReactTooltip className={stylesTooltip.tooltip} />
      {product ? (
        <>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.contentBlock}>
            <Slider product={product} />
            <div className={styles.productInfo}>
              <ul>
                <li
                  className={styles.warranty}
                  data-tip="Мы даем такой срок гарантии, который можем безоговорочно обеспечить, не вводя клиента в заблуждение и не заманивая нереальными гарантийными сроками."
                >{`Гарантия: ${product.warranty} мес.`}</li>
                <li
                  className={styles.warrantyReturn}
                  data-tip="В соответствии с Законом Украины 'О защите прав потребителей' наши покупатели имеют право обменять или вернуть новый товар, который не был в употреблении и не имеет следов использования, в течение первых 14 дней после покупки, а также если его возврат не протеворечит другим статьям, описанным в ЗУ ОЗПП"
                >
                  Обмен/возврат: 14 дней
                </li>
                <li
                  className={styles.viewRest}
                  data-tip="Посмотреть наличие товара на складах."
                  onClick={handleClick}
                >
                  <ViewRest id={product.id} />
                </li>
                <li
                  className={styles.notify}
                  data-tip="Уведомить об изменении наличия или цены на e-mail."
                >
                  Уведомить
                </li>
              </ul>
              {product.totalRating > 0 && (
                <Rating
                  totalRating={product.totalRating}
                  ratingsCount={product.ratingsCount}
                />
              )}
              <div className={styles.price}>{`${product.price} грн`}</div>
              <BuyButton id={product.id} status={product.status} />
              <ul>
                <li className={styles.sku}>{`Код товара: ${product.sku}`}</li>
                <li className={styles.addToCompare}>
                  <span>Добавить к сравнению</span>
                </li>
                <li className={styles.addToWishList}>
                  <AddToWishListButton id={product.id} />
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.productBlock}>
            <ul className={styles.tabs}>
              <li>
                <Link smooth="true" to="#specs">
                  Описание
                </Link>
              </li>
              <li>
                <Link smooth="true" to="#similar">
                  Похожие товары
                </Link>
              </li>
              <li>
                <Link
                  smooth="true"
                  to="#reviews"
                >{`Отзывы (${product.reviewsCount})`}</Link>
              </li>
            </ul>

            <DeliveryPayBlock />
            <SpecificationsBlock product={product} />
            <ReviewsContainer id={product.id} />
          </div>
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
