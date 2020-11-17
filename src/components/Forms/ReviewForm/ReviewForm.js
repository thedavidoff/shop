import React, { useState } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  FormControlLabel,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import { getIsAnonymous, getRating } from "../../../redux/selectors";
import { setRating } from "../../../redux/reviewsReducer";
import { input, radio, textarea } from "../renderFields";
import { required } from "../validate";
import Snackbar from "../../UI/Snackbar/Snackbar";

const labels = {
  1: "Ужасно",
  2: "Плохо",
  3: "Нейтрально",
  4: "Хорошо",
  5: "Отлично",
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 15,
    "& p": {
      margin: "15px 0",
      fontSize: 12,
    }
  },
  form: {
    padding: "15px 30px",
  },
  tr: {
    "& td": {
      padding: "8px 15px",
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
  isAnonymous,
  rating,
  setRating,
  pristine,
  submitting,
  handleSubmit,
  sendReviewFailed,
}) => {
  const classes = useStyles();
  const [hover, setHover] = useState(-1);

  return (
    <Paper elevation={15} className={classes.root}>
      {sendReviewFailed && <Snackbar type="sendReviewFailed" />}
      <form onSubmit={handleSubmit} className={classes.form}>
        <Table>
          <TableBody>
            {isAnonymous && (
              <TableRow>
                <TableCell>
                  <b>Ваше Имя:</b>
                </TableCell>
                <TableCell>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    label={null}
                    component={input}
                    validate={required}
                    style={{ marginTop: 0 }}
                  />
                </TableCell>
              </TableRow>
            )}
            <TableRow className={classes.tr}>
              <TableCell>
                <b>Выберите оценку:</b>
              </TableCell>
              <TableCell>
                <FormControlLabel
                  style={{ marginLeft: 0 }}
                  control={
                    <>
                      <input
                        name="rating"
                        type="number"
                        value={rating}
                        hidden
                        readOnly
                      />
                      <Rating
                        name="rating"
                        value={rating}
                        onChange={(_, value) => {
                          setRating(value || 0);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                      />
                      <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>
                    </>
                  }
                  label={null}
                />
              </TableCell>
            </TableRow>
            <TableRow className={classes.tr}>
              <TableCell>
                <b>Достоинства:</b>
              </TableCell>
              <TableCell style={{ position: "relative" }}>
                <Field
                  id="advantages"
                  name="advantages"
                  placeholder="Что Вам понравилось"
                  component={textarea}
                />
              </TableCell>
            </TableRow>
            <TableRow className={classes.tr}>
              <TableCell>
                <b>Недостатки:</b>
              </TableCell>
              <TableCell style={{ position: "relative" }}>
                <Field
                  id="disadvantages"
                  name="disadvantages"
                  placeholder="Что не оправдало ожиданий"
                  component={textarea}
                />
              </TableCell>
            </TableRow>
            <TableRow className={classes.tr}>
              <TableCell>
                <b>Комментарий:</b>
              </TableCell>
              <TableCell style={{ position: "relative" }}>
                <Field
                  id="comment"
                  name="comment"
                  placeholder="Другая информация или вопросы о товаре"
                  component={textarea}
                />
              </TableCell>
            </TableRow>
            <TableRow className={classes.tr}>
              <TableCell>
                <b>Место покупки:</b>
              </TableCell>
              <TableCell>
                <Field name="buyType" component={radio} />
              </TableCell>
            </TableRow>
            <TableRow className={classes.tr}>
              <TableCell />
              <TableCell>
                <Typography>
                  Перед публикацией отзыва рекомендуем ознакомиться с правилами
                  размещения отзывов и комментариев.
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  type="submit"
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
  destroyOnUnmount: true,
})(ReviewForm);

const mapStateToProps = (state) => {
  return {
    isAnonymous: getIsAnonymous(state),
    rating: getRating(state),
    sendReviewFailed: state.reviews.sendReviewFailed,
    initialValues: {
      rating: getRating(state),
      buyType: "3",
    },
  };
};

export default connect(mapStateToProps, { setRating })(ReviewForm);
