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
  Button,
  useMediaQuery,
} from "@material-ui/core";

import { getIsAnonymous, getReviews } from "../../../redux/selectors";
import { required } from "../validate";
import { radio, reviewInput, textarea } from "../renderFields";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 15,
    marginLeft: 30,
    "& p": {
      fontSize: 12,
    },
  },
  form: {
    padding: "15px 30px",
  },
  tr: {
    [theme.breakpoints.down("xs")]: {
      marginBottom: 8,
    },
    "& td": {
      padding: "8px 15px",
      [theme.breakpoints.down("xs")]: {
        padding: 0,
      },
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

let ReviewAnswerForm = ({
  isAnonymous,
  pristine,
  submitting,
  handleSubmit,
}) => {
  const classes = useStyles();
  const w400 = useMediaQuery("(max-width: 399px)");
  const w750 = useMediaQuery("(max-width: 749px)");

  return (
    <Paper elevation={15} className={classes.root}>
      <form
        onSubmit={handleSubmit}
        className={classes.form}
        style={w400 ? { padding: 15 } : null}
      >
        <Table>
          <TableBody>
            {isAnonymous && (
              <TableRow
                className={w750 ? classes.tr : null}
                style={
                  w750 ? { display: "flex", flexDirection: "column" } : null
                }
              >
                <TableCell>
                  <b>Ваше Имя:</b>
                </TableCell>
                <TableCell>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    label={null}
                    component={reviewInput}
                    validate={required}
                    style={{ width: "100%", marginTop: 0 }}
                  />
                </TableCell>
              </TableRow>
            )}
            <TableRow
              className={classes.tr}
              style={w750 ? { display: "flex", flexDirection: "column" } : null}
            >
              <TableCell>
                <b>Комментарий:</b>
              </TableCell>
              <TableCell>
                <Field
                  name="comment"
                  placeholder="Укажите Ваш ответ"
                  component={textarea}
                  validate={[required]}
                />
              </TableCell>
            </TableRow>
            <TableRow
              className={classes.tr}
              style={w750 ? { display: "flex", flexDirection: "column" } : null}
            >
              <TableCell>
                <b>Место покупки:</b>
              </TableCell>
              <TableCell>
                <Field name="buyType" component={radio} />
              </TableCell>
            </TableRow>
            <TableRow
              className={classes.tr}
              style={w750 ? { display: "flex", flexDirection: "column" } : null}
            >
              {w750 ? null : <TableCell />}
              <TableCell>
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
    isAnonymous: getIsAnonymous(state),
    reviews: getReviews(state),
    initialValues: {
      buyType: "3",
    },
  };
};

export default connect(mapStateToProps)(ReviewAnswerForm);
