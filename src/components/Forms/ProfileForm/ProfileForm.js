import React from "react";
import { Field, reduxForm } from "redux-form";
import ReactTooltip from "react-tooltip";

import styles from "../LoginForm/LoginForm.module.css";
import stylesTooltip from "../../UI/Tooltip/Tooltip.module.css";
import { email, required } from "../validate";
import { inputProfile } from "../renderFields";
import Preloader from "../../UI/Preloader/Preloader";

let ProfileForm = ({ pristine, submitting, handleSubmit, initialValues }) => {
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
              <Field name="gender" component="select">
                <option value={0}>Выбрать пол</option>
                <option value={1}>Мужской</option>
                <option value={2}>Женский</option>
              </Field>
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
              <div className={styles.priceLevelInfo}>Данная сумма является весьма примерной и не является фискальной.</div>
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
                type="text"
                component={inputProfile}
                loadedSuccess={initialValues}
              />
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