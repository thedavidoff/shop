import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import StarRatingComponent from "react-star-rating-component";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";

import styles from "./ReviewForm.module.css";
import { getRating } from "../../../redux/selectors";
import { setRating } from "../../../redux/reviewsReducer";
import { input, radio, textarea } from "../renderFields";
import RadioButton from "../../UI/RadioButton/RadioButton";
import { validateRating } from "../validate";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 15,
    "& p": {
      margin: "15px 0",
      fontSize: 12,
    },
  },
  form: {
    padding: "15px 30px",
  },
  tr: {
    "& th": {
      padding: "8px 16px",
    },
    "& td": {
      padding: "8px 16px",
    },
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    textTransform: "none",
    fontSize: 14,
    "&:hover": { backgroundColor: theme.palette.primary.dark },
  },
}));

let ReviewForm = ({
  rating,
  setRating,
  pristine,
  submitting,
  handleSubmit,
}) => {
  const classes = useStyles();
  let [fakeRating, setFakeRating] = useState(rating);
  const onStarClick = (nextValue) => setRating(nextValue);
  const onStarHover = (nextValue) => {
    return setFakeRating(nextValue);
  };
  const onStarHoverOut = () => {
    return setFakeRating(rating);
  };

  return (
    <Paper elevation={15} className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Table>
          <TableBody>
            <TableRow className={classes.tr}>
              <TableCell component="th">Выберите оценку:</TableCell>
              <TableCell>
                <StarRatingComponent
                  name="rate"
                  value={fakeRating || rating}
                  starColor="red"
                  emptyStarColor="#adadad"
                  onStarClick={onStarClick}
                  onStarHover={onStarHover}
                  onStarHoverOut={onStarHoverOut}
                  className={styles.stars}
                />
                <Field
                  id="rating"
                  type="hidden"
                  name="rating"
                  component={input}
                  validate={[validateRating]}
                />
              </TableCell>
            </TableRow>
            <TableRow className={classes.tr}>
              <TableCell component="th">Достоинства:</TableCell>
              <TableCell>
                <Field
                  id="advantages"
                  name="advantages"
                  placeholder="Что Вам понравилось"
                  component={textarea}
                />
              </TableCell>
            </TableRow>
            <TableRow className={classes.tr}>
              <TableCell component="th">Недостатки:</TableCell>
              <TableCell>
                <Field
                  id="disadvantages"
                  name="disadvantages"
                  placeholder="Что не оправдало ожиданий"
                  component={textarea}
                />
              </TableCell>
            </TableRow>
            <TableRow className={classes.tr}>
              <TableCell component="th">Комментарий:</TableCell>
              <TableCell>
                <Field
                  id="comment"
                  name="comment"
                  placeholder="Другая информация или вопросы о товаре"
                  component={textarea}
                />
              </TableCell>
            </TableRow>
            <TableRow className={classes.tr}>
              <TableCell component="th">Место покупки:</TableCell>
              <TableCell>
                <Field name="buyType" component={radio}>
                  <RadioButton value="1" label="- у Вас в магазине" />
                  <RadioButton value="2" label="- в другом магазине" />
                </Field>
                <Typography>
                  Перед публикацией отзыва рекомендуем ознакомиться с правилами
                  размещения отзывов и комментариев.
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  type="submit"
                  onClick={() => setFakeRating(0)}
                  className={classes.button}
                  disabled={pristine || submitting}
                >
                  Отправить
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </Paper>
  );
};

ReviewForm = reduxForm({
  form: "ReviewForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(ReviewForm);

const mapStateToProps = (state) => {
  return {
    rating: getRating(state),
    initialValues: {
      rating: getRating(state),
      buyType: "3",
    },
  };
};

export default connect(mapStateToProps, { setRating })(ReviewForm);
