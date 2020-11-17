import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Field, reduxForm, autofill } from "redux-form";
import ReactTooltip from "react-tooltip";
import {
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";

import stylesTooltip from "../../UI/Tooltip/Tooltip.module.css";
import { email, required, gender } from "../validate";
import { checkboxProfile, inputProfile } from "../renderFields";
import Preloader from "../../UI/Preloader/Preloader";
import Select from "../../UI/Select/Select";
import City from "../../Profile/SearchCity/City";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
  },
  table: {
    "& tr": {
      verticalAlign: "baseline",
    },
    "& td": {
      padding: "2px 6px",
      width: "50%",
      borderBottom: "none",
    },
  },
  required: {
    color: theme.palette.error.main,
  },
  priceLevelInfo: {
    color: "#597391",
    fontSize: 12,
    lineHeight: 1,
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    textTransform: "none",
    padding: "3px 15px",
    fontSize: 14,
    "&:hover": { backgroundColor: theme.palette.primary.dark },
  },
}));

let ProfileForm = ({ pristine, submitting, handleSubmit, initialValues }) => {
  const classes = useStyles();
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

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <Typography component="h2" className={classes.title}>
        Данные о покупателе:
      </Typography>

      <ReactTooltip className={stylesTooltip.tooltip} />

      <Table size="small" className={classes.table} aria-label="Wishlist table">
        <TableBody>
          <TableRow data-tip="Отображается в отзывах. Изменить можно только один раз, после регистрации.">
            <TableCell align="right">
              Логин
              <Typography component="span" className={classes.required}>
                *
              </Typography>
              :
            </TableCell>
            <TableCell>
              <Field
                name="login"
                type="text"
                disabled={initialValues ? !initialValues.canChangeLogin : false}
                component={inputProfile}
                validate={required}
                loadedSuccess={initialValues}
              />
            </TableCell>
          </TableRow>
          <TableRow data-tip="Нужна для оформления и доставки заказов. Будет скрыта от других пользователей.">
            <TableCell align="right">
              Фамилия
              <Typography component="span" className={classes.required}>
                *
              </Typography>
              :
            </TableCell>
            <TableCell>
              <Field
                name="lastName"
                type="text"
                component={inputProfile}
                validate={required}
                loadedSuccess={initialValues}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">
              Имя
              <Typography component="span" className={classes.required}>
                *
              </Typography>
              :
            </TableCell>
            <TableCell>
              <Field
                id="firstName"
                name="firstName"
                type="text"
                component={inputProfile}
                validate={required}
                loadedSuccess={initialValues}
              />
            </TableCell>
          </TableRow>
          <TableRow data-tip="Нужно для отправки заказов Новой Почтой. Будет скрыто от других пользователей.">
            <TableCell align="right">Отчество:</TableCell>
            <TableCell>
              <Field
                name="patronymic"
                type="text"
                component={inputProfile}
                loadedSuccess={initialValues}
              />
            </TableCell>
          </TableRow>
          <TableRow data-tip="Для учета Ваших предпочтений в акциях и розыгрышах.">
            <TableCell align="right">
              Пол
              <Typography component="span" className={classes.required}>
                *
              </Typography>
              :
            </TableCell>
            <TableCell>
              <Field
                name="gender"
                label={null}
                component={Select}
                validate={gender}
                style={{ position: "relative" }}
              >
                <option value={0}>Выбрать пол</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </Field>
              {!initialValues && <Preloader type="inputProfile" />}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Уровень цен:</TableCell>
            <TableCell>
              <Field
                id="priceLevel"
                name="priceLevel"
                type="text"
                disabled={true}
                component={inputProfile}
                loadedSuccess={initialValues}
              />
              <div className={classes.priceLevelInfo}>
                Данная сумма является весьма примерной и не является фискальной.
              </div>
            </TableCell>
          </TableRow>
          <TableRow data-tip="Данная сумма является весьма примерной и не является фискальной. В ней учитываються лишь успешные заказы через сайт c этого аккаунта.">
            <TableCell align="right">Сумма покупок:</TableCell>
            <TableCell>
              <Field
                name="amountOfPurchases"
                type="text"
                disabled={true}
                component={inputProfile}
                loadedSuccess={initialValues}
              />
            </TableCell>
          </TableRow>
          <TableRow data-tip="Нужен для отправки пароля, информации о заказах, ссылок на оплату и прочего. Будет скрыт от других пользователей.">
            <TableCell align="right">
              E-mail
              <Typography component="span" className={classes.required}>
                *
              </Typography>
              :
            </TableCell>
            <TableCell>
              <Field
                name="email"
                type="text"
                component={inputProfile}
                validate={email}
                loadedSuccess={initialValues}
              />
            </TableCell>
          </TableRow>
          <TableRow data-tip="Отправка на указанный e-mail информации о сделанных заказах.">
            <TableCell align="right">Получать e-mail о заказах:</TableCell>
            <TableCell>
              <Field
                name="receiveEmailAboutOrders"
                component={checkboxProfile}
                loadedSuccess={initialValues}
                label={null}
              />
            </TableCell>
          </TableRow>
          <TableRow data-tip="Нужен для связи с Вами по поводу заказов. Будет скрыт от других пользователей.">
            <TableCell align="right">
              Телефон
              <Typography component="span" className={classes.required}>
                *
              </Typography>
              :
            </TableCell>
            <TableCell>
              <Field
                name="phone"
                type="number"
                component={inputProfile}
                validate={required}
                loadedSuccess={initialValues}
              />
            </TableCell>
          </TableRow>
          <TableRow data-tip="Перезвонить после общения с оператором для возможности оценки разговора. Отключение распространяется только на номер, указанный в профиле, и требует подтверждения телефона.">
            <TableCell align="right">
              Перезванивать с оценкой оператора:
            </TableCell>
            <TableCell>
              <Field
                name="callBackWithAnOperatorRating"
                component={checkboxProfile}
                loadedSuccess={initialValues}
              />
            </TableCell>
          </TableRow>
          <TableRow data-tip="Отправка на указанный e-mail копий SMS/Viber сообщений для указанного номера.">
            <TableCell align="right">Дублировать SMS/Viber на email:</TableCell>
            <TableCell>
              <Field
                name="duplicateSmsViberToEmail"
                component={checkboxProfile}
                loadedSuccess={initialValues}
              />
            </TableCell>
          </TableRow>
          <TableRow data-tip="Нужен для отправки заказов службами доставки, отображении возможных видов оплаты и прочего.">
            <TableCell align="right">
              Город
              <Typography component="span" className={classes.required}>
                *
              </Typography>
              :
            </TableCell>
            <TableCell>
              <City
                city={initialValues && initialValues.city}
                newCity={newCity}
                handleSelectCity={handleSelectCity}
              />
              <Field
                name="city"
                type="hidden"
                component={inputProfile}
                loadedSuccess={initialValues}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography component="span" className={classes.required}>
                *
              </Typography>{" "}
              - обязательно
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell>
              <Button
                variant="contained"
                size="small"
                type="submit"
                className={classes.button}
                disabled={pristine || submitting}
              >
                Сохранить
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </form>
  );
};

ProfileForm = reduxForm({
  form: "ProfileForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(ProfileForm);

export default ProfileForm;
