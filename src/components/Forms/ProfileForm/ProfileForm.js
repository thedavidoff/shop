import React, { useEffect, useState } from "react";
import { Field, reduxForm, autofill } from "redux-form";
import ReactTooltip from "react-tooltip";
import { useDispatch } from "react-redux";

import styles from "../LoginForm/LoginForm.module.css";
import stylesTooltip from "../../UI/Tooltip/Tooltip.module.css";
import { email, required, gender } from "../validate";
import { inputProfile, selectProfile } from "../renderFields";
import Preloader from "../../UI/Preloader/Preloader";
import Popup from "../../UI/Popup/Popup";
import SearchCity from "../../Profile/SearchCity/SearchCity";

let ProfileForm = ({ pristine, submitting, handleSubmit, initialValues }) => {
  let [newCity, setNewCity] = useState("");
  let [isClose, setIsClose] = useState(false);

  const dispatch = useDispatch();

  const handleSelectCity = (e) => {
    setNewCity(e.target.innerHTML);
    setIsClose(!isClose);
    dispatch(autofill("ProfileForm", "city", e.target.innerHTML));
  };

  useEffect(() => {
    setIsClose(false);
  }, [isClose]);

  const handleClick = () => {
    ReactTooltip.hide();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.loginForm} ${styles.profileForm}`}
    >
      <h5>Данные о покупателе:</h5>

      <ReactTooltip className={stylesTooltip.tooltip} />

      <table>
        <tbody>
          <tr data-tip="Отображается в отзывах. Изменить можно только один раз, после регистрации.">
            <td>
              Логин<span>*</span>:
            </td>
            <td>
              <Field
                name="login"
                type="text"
                disabled={initialValues ? !initialValues.canChangeLogin : false}
                component={inputProfile}
                validate={[required]}
                loadedSuccess={initialValues}
              />
            </td>
          </tr>
          <tr data-tip="Нужна для оформления и доставки заказов. Будет скрыта от других пользователей.">
            <td>
              Фамилия<span>*</span>:
            </td>
            <td>
              <Field
                name="lastName"
                type="text"
                component={inputProfile}
                validate={[required]}
                loadedSuccess={initialValues}
              />
            </td>
          </tr>
          <tr>
            <td>
              Имя<span>*</span>:
            </td>
            <td>
              <Field
                id="firstName"
                name="firstName"
                type="text"
                component={inputProfile}
                validate={[required]}
                loadedSuccess={initialValues}
              />
            </td>
          </tr>
          <tr data-tip="Нужно для отправки заказов Новой Почтой. Будет скрыто от других пользователей.">
            <td>Отчество:</td>
            <td>
              <Field
                name="patronymic"
                type="text"
                component={inputProfile}
                loadedSuccess={initialValues}
              />
            </td>
          </tr>
          <tr data-tip="Для учета Ваших предпочтений в акциях и розыгрышах.">
            <td>
              Пол<span>*</span>:
            </td>
            <td>
              <Field
                name="gender"
                component={selectProfile}
                validate={[gender]}
              />
              {!initialValues && <Preloader type="inputProfile" />}
            </td>
          </tr>
          <tr>
            <td>Уровень цен:</td>
            <td>
              <Field
                id="priceLevel"
                name="priceLevel"
                type="text"
                disabled={true}
                component={inputProfile}
                loadedSuccess={initialValues}
              />
              <div className={styles.priceLevelInfo}>
                Данная сумма является весьма примерной и не является фискальной.
              </div>
            </td>
          </tr>
          <tr data-tip="Данная сумма является весьма примерной и не является фискальной. В ней учитываються лишь успешные заказы через сайт c этого аккаунта.">
            <td>Сумма покупок:</td>
            <td>
              <Field
                name="amountOfPurchases"
                type="text"
                disabled={true}
                component={inputProfile}
                loadedSuccess={initialValues}
              />
            </td>
          </tr>
          <tr data-tip="Нужен для отправки пароля, информации о заказах, ссылок на оплату и прочего. Будет скрыт от других пользователей.">
            <td>
              E-mail<span>*</span>:
            </td>
            <td>
              <Field
                name="email"
                type="text"
                component={inputProfile}
                validate={[email]}
                loadedSuccess={initialValues}
              />
            </td>
          </tr>
          <tr data-tip="Отправка на указанный e-mail информации о сделанных заказах.">
            <td>Получать e-mail о заказах:</td>
            <td>
              <Field
                name="receiveEmailAboutOrders"
                component={inputProfile}
                type="checkbox"
                loadedSuccess={initialValues}
              />
            </td>
          </tr>
          <tr data-tip="Нужен для связи с Вами по поводу заказов. Будет скрыт от других пользователей.">
            <td>
              Телефон<span>*</span>:
            </td>
            <td>
              <Field
                name="phone"
                type="text"
                component={inputProfile}
                validate={[required]}
                loadedSuccess={initialValues}
              />
            </td>
          </tr>
          <tr data-tip="Перезвонить после общения с оператором для возможности оценки разговора. Отключение распространяется только на номер, указанный в профиле, и требует подтверждения телефона.">
            <td>Перезванивать с оценкой оператора:</td>
            <td>
              <Field
                name="callBackWithAnOperatorRating"
                component={inputProfile}
                type="checkbox"
                loadedSuccess={initialValues}
              />
            </td>
          </tr>
          <tr data-tip="Отправка на указанный e-mail копий SMS/Viber сообщений для указанного номера.">
            <td>Дублировать SMS/Viber на email:</td>
            <td>
              <Field
                name="duplicateSmsViberToEmail"
                component={inputProfile}
                type="checkbox"
                loadedSuccess={initialValues}
              />
            </td>
          </tr>
          <tr data-tip="Нужен для отправки заказов службами доставки, отображении возможных видов оплаты и прочего.">
            <td>
              Город<span>*</span>:
            </td>
            <td>
              <Field
                name="city"
                type="hidden"
                component={inputProfile}
                loadedSuccess={initialValues}
              />
              <div onClick={handleClick}>
                <Popup
                  text={
                    newCity ||
                    (initialValues && initialValues.city) ||
                    (initialValues && !initialValues.city && "Выберите город")
                  }
                  isClose={isClose}
                >
                  <SearchCity
                    city={initialValues && initialValues.city}
                    newCity={newCity}
                    handleSelectCity={handleSelectCity}
                  />
                </Popup>
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <span>*</span> - обязательно
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button disabled={pristine || submitting}>Сохранить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

ProfileForm = reduxForm({
  form: "ProfileForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(ProfileForm);

export default ProfileForm;
