import React from "react";
import { connect } from "react-redux";
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

import { getReviews } from "../../../redux/selectors";
import { required } from "../validate";
import { radio, textarea } from "../renderFields";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 15,
    marginLeft: 30,
    "& p": {
      margin: "15px 0",
      fontSize: 12,
    },
  },
  form: {
    padding: "15px 30px",
  },
  tr: {
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

let ReviewAnswerForm = ({ pristine, submitting, handleSubmit, ...props }) => {
  const classes = useStyles();
  return (
    <Paper elevation={15} className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Table>
          <TableBody>
            <TableRow className={classes.tr}>
              <TableCell>
                <b>Комментарий:</b>
              </TableCell>
              <TableCell style={{ position: "relative" }}>
                <Field
                  name="comment"
                  placeholder="Укажите Ваш ответ"
                  component={textarea}
                  validate={[required]}
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
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography>
                  Перед публикацией комментария рекомендуем ознакомиться с
                  правилами размещения отзывов и комментариев.
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

ReviewAnswerForm = reduxForm({
  form: "ReviewAnswerForm",
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  destroyOnUnmount: true,
})(ReviewAnswerForm);

const mapStateToProps = (state) => {
  return {
    reviews: getReviews(state),
    initialValues: {
      buyType: "3",
    },
  };
};

export default connect(mapStateToProps)(ReviewAnswerForm);
