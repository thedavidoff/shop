import * as PropTypes from "prop-types";

export const tooltipMethods = {
  // show(e) {
  //   const width = window.innerWidth;
  //   const widthTooltip = 250;
  //   if (e.pageX < width - widthTooltip - 20 - 30) {
  //     return { top: e.pageY + 20 + "px", left: e.pageX + 20 + "px" };
  //   } else {
  //     return {
  //       top: e.pageY + 20 + "px",
  //       left: e.pageX - widthTooltip - 20 + "px",
  //     };
  //   }
  // },
  rating(totalRating, ratingsCount) {
    let rating;
    ratingsCount === 1 ? (rating = "оценки") : (rating = "оценок");
    return `${
      Number.isInteger(totalRating) ? totalRating + ".0" : totalRating
    } из 5 на основе ${ratingsCount} ${rating}`;
  },
};

export const Tooltip = ({ id }) => {
  switch (id) {
    // ProfileForm
    case "login":
      return "Отображается в отзывах. Изменить можно только один раз, после регистрации.";
    case "lastName":
      return "Нужна для оформления и доставки заказов. Будет скрыта от других пользователей.";
    case "patronymic":
      return "Нужно для отправки заказов Новой Почтой. Будет скрыто от других пользователей.";
    case "gender":
      return "Для учета Ваших предпочтений в акциях и розыгрышах.";
    case "amountOfPurchases":
      return "Данная сумма является весьма примерной и не является фискальной. В ней учитываються лишь успешные заказы через сайт c этого аккаунта.";
    case "email":
      return "Нужен для отправки пароля, информации о заказах, ссылок на оплату и прочего. Будет скрыт от других пользователей.";
    case "receiveEmailAboutOrders":
      return "Отправка на указанный e-mail информации о сделанных заказах.";
    case "phone":
      return "Нужен для связи с Вами по поводу заказов. Будет скрыт от других пользователей.";
    case "callBackWithAnOperatorRating":
      return "Перезвонить после общения с оператором для возможности оценки разговора. Отключение распространяется только на номер, указанный в профиле, и требует подтверждения телефона.";
    case "duplicateSmsViberToEmail":
      return "Отправка на указанный e-mail копий SMS/Viber сообщений для указанного номера.";
    case "city":
      return "Нужен для отправки заказов службами доставки, отображении возможных видов оплаты и прочего.";

    // Наличие товара
    case "есть в наличии":
      return "Товар в наличии на нашем складе";
    case "доступно под заказ (1-5 дней)":
      return "Товар есть у наших поставщиков. Стандартные сроки поставки от 1 до 5 дней";
    case "ожидается поставка":
      return "Товар в ближайшее время будет доступен к заказу";
    case "нет в наличии":
      return "Товар отсутствует у поставщиков. Возможно, товар больше не появится в продаже";

    // Product
    case "new":
      return "Новинка.";
    case "hit":
      return "Хит продаж.";

    // ProductInfo
    case "warranty":
      return "Мы даем такой срок гарантии, который можем безоговорочно обеспечить, не вводя клиента в заблуждение и не заманивая нереальными гарантийными сроками.";
    case "viewRest":
      return "Посмотреть наличие товара на складах.";
    case "notify":
      return "Уведомить об изменении наличия или цены на e-mail.";
    case "warrantyReturn":
      return "В соответствии с Законом Украины 'О защите прав потребителей' наши покупатели имеют право обменять или вернуть новый товар, который не был в употреблении и не имеет следов использования, в течение первых 14 дней после покупки, а также если его возврат не протеворечит другим статьям, описанным в ЗУ ОЗПП";

    // HeaderContainer
    case "wishList":
      return "Список желаний.";
    default:
      return id;
  }
};

Tooltip.propTypes = {
  id: PropTypes.string,
};
