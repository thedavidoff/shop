import React, { useState } from "react";
import { connect } from "react-redux";
import {
  withStyles,
  makeStyles,
  Typography,
  IconButton,
  DialogTitle as MuiDialogTitle,
  Dialog,
  DialogContent,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import PhoneSVG from "../SVG/PhoneSVG";
import VodafoneSVG from "../SVG/VodafoneSVG";
import KyivstarSVG from "../SVG/KyivstarSVG";
import LifecellSVG from "../SVG/LifecellSVG";
import { getProducts } from "../../../redux/selectors";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography style={{ textAlign: "center", width: "calc(100% - 40px)" }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const useStyles = makeStyles((theme) => ({
  span: {
    fontSize: 14,
    lineHeight: 1,
    borderBottom: "1px dashed",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  tableContainer: {
    maxWidth: 510,
    marginBottom: 5,
  },
  dialogContent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 0,
    paddingBottom: 16,
  },
  empty: {
    backgroundColor: theme.palette.error.light,
  },
  notEmpty: {
    backgroundColor: theme.palette.success.light,
  },
  contacts: {
    "& a": {
      width: "100%",
      "&:hover": {
        backgroundColor: "rgba(13, 71, 161, 0.3);",
      },
    },
  },
}));

const ViewRest = ({ id, products }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClickClose = () => {
    setIsOpen(false);
  };

  const product = products.find((product) => product.id === id);

  return (
    product ? (
      <>
        <Typography
          component="span"
          className={classes.span}
          onClick={handleClickOpen}
          data-tip="Посмотреть наличие товара на складах."
        >
          Посмотреть наличие
        </Typography>
        <Dialog
          open={isOpen}
          onClose={handleClickClose}
          aria-labelledby="form-dialog-title"
          maxWidth="md"
        >
          <DialogTitle
            id="form-dialog-title"
            onClose={handleClickClose}
          >{`Наличие товара ${product.name} по складам:`}</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <TableContainer
              component={Paper}
              elevation={15}
              className={classes.tableContainer}
            >
              <Table className={classes.table} aria-label="Stock table">
                <TableBody>
                  {product.inventory.map((item, index) => (
                    <TableRow
                      key={index}
                      className={item > 0 ? classes.notEmpty : classes.empty}
                    >
                      <TableCell align="right">
                        {index === 0 && "г. Харьков, ул. Алчевских, 36"}
                        {index === 1 && "г. Харьков, пр. Независимости, 5"}
                        {index === 2 && "г. Харьков, ул. Короленко, 6"}
                      </TableCell>
                      <TableCell align="left">
                        <i>
                          {item === 0 && "под заказ"}
                          {item > 0 && item <= 5 && "есть"}
                          {item > 5 &&
                            item < 10 &&
                            "есть в достаточном количестве"}
                          {item >= 10 && "есть в большом количестве"}
                        </i>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography style={{ marginTop: 24 }}>
              Контактные данные:
            </Typography>
            <TableContainer
              component={Paper}
              elevation={15}
              className={classes.tableContainer}
            >
              <Table className={classes.contacts} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      <Button
                        component="a"
                        href="tel:057 728-30-08"
                        startIcon={<PhoneSVG />}
                      >
                        (057) 728-30-08
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        component="a"
                        href="tel:095 00-00-428"
                        startIcon={<VodafoneSVG />}
                      >
                        095 00-00-428
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">
                      <Button
                        component="a"
                        href="tel:067 00-00-428"
                        startIcon={<KyivstarSVG />}
                      >
                        067 00-00-428
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        component="a"
                        href="tel:093 00-00-428"
                        startIcon={<LifecellSVG />}
                      >
                        093 00-00-428
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      </>
    ) : null
  );
};

const mapStateToProps = (state) => {
  return {
    products: getProducts(state),
  };
};

export default connect(mapStateToProps, null)(ViewRest);
