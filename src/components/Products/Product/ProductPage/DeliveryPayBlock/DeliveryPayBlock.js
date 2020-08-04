import React from "react";

import styles from "./DeliveryPayBlock.module.css";

const DeliveryPayBlock = () => {
  return (
    <div className={styles.deliveryPayBlock}>
      <div className={styles.deliveryColumn}>
        <h3>Доставка:</h3>
        <ul>
          <li>самовывоз: бесплатно</li>
          <li>по Харькову: 70 грн</li>
          <li>по Украине</li>
          <li>адресная доставка в регионы</li>
          <li>оплата при получении товара</li>
        </ul>
      </div>
      <div className={styles.payColumn}>
        <h3>Оплата:</h3>
        <ul>
          <li>наличная</li>
          <li>безналичная</li>
          <li>эл. платежи</li>
          <li>рассрочка</li>
          <li>Apple Pay</li>
          <li>Google Pay</li>
        </ul>
      </div>
    </div>
  );
};

export default DeliveryPayBlock;
