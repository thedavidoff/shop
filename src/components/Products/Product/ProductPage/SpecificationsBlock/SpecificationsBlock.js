import React from "react";
import PropTypes from "prop-types";

import styles from "./SpecificationsBlock.module.css";

const SpecificationsBlock = ({ product }) => {

  return (
    <div className={styles.specificationsBlock}>
      <h2 id="specs">{`Технические характеристики* ${product.name}:`}</h2>
      <table className={styles.specifications}>
        <tbody>
          {product.specifications.map((key, index) => {
            const { property, value, hide } = Object.values(key)[0];
            let link;
            if (typeof value === "string" && value.indexOf("http") >= 0) {
              link = value;
            }
            return (
              !hide && (<tr key={index}>
              <td>{property}</td>
              <td>{link ? <a href={link}>{link}</a> : value}</td>
            </tr>)
            );
          })}
        </tbody>
      </table>
      <div className={styles.messageInfo}>
        <p>
          * Характеристики и комплектация товара могут изменяться производителем
          без уведомления
        </p>
        <p>
          Если Вы заметили какую-либо ошибку на сайте, то выделите ее и нажмите
          комбинацию клавиш Ctrl+Enter или кнопку слева с текстом "Нашли ошибку?
          Ctrl+Enter".
        </p>
        <p>Все собранные ошибки мы будем стараться исправлять.</p>
      </div>
    </div>
  );
};

SpecificationsBlock.propTypes = {
  product: PropTypes.PropTypes.shape({
    name: PropTypes.string,
    specifications: PropTypes.array,
  }),
};

export default SpecificationsBlock;
