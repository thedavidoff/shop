import React from "react";
import { Field, reduxForm } from "redux-form";
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

import { getRating } from "../../../redux/selectors";
import { setRating } from "../../../redux/reviewsReducer";
import { input, radio, textarea } from "../renderFields";
import RadioButton from "../../UI/RadioButton/RadioButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

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
  const [hover, setHover] = React.useState(-1);

  // let [fakeRating, setFakeRating] = useState(rating);
  // const onStarClick = (nextValue) => setRating(nextValue);
  // const onStarHover = (nextValue) => {
  //   return setFakeRating(nextValue);
  // };
  // const onStarHoverOut = () => {
  //   return setFakeRating(rating);
  // };
  // console.log(fakeRating, rating);
  return (
    <Paper elevation={15} className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Table>
          <TableBody>
            <TableRow className={classes.tr}>
              <TableCell component="th">Выберите оценку:</TableCell>
              <TableCell>
                <FormControlLabel
                  style={{marginLeft: 0}}
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
