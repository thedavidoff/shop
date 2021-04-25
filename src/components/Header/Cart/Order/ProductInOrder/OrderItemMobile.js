import React from "react";
import { NavLink } from "react-router-dom";
import {
  makeStyles,
  Paper,
  TableRow,
  TableCell,
  Button,
  Link,
  TextField,
  IconButton,
  Table,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import * as PropTypes from "prop-types";

import AddToWishListButton from "../../../../UI/AddToWishListButton/AddToWishListButton";
import DarkTooltip from "../../../../UI/Tooltip/DarkTooltip";

const useStyles = makeStyles((theme) => ({
  orderItemMobile: {
    marginBottom: 15,
  },
  photoLinkCell: {
    marginRight: 20,
    padding: "0 15px",
    "& img": {
      width: 100,
    },
  },
  nameLink: {
    "& a": {
      fontSize: 14,
      color: "#000",
      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
  },
  quantity: {
    width: 100,
  },
  price: {
    textAlign: "center",
    color: theme.palette.secondary.dark,
  },
  delete: {
    textAlign: "center",
    "& button:hover": { backgroundColor: "rgba(0, 0, 0, .2)" },
  },
}));

const OrderItemMobile = ({
  id,
  quantity,
  changeQuantity,
  deleteCartItem,
  product: { photoInOrder, name, price },
}) => {
  const classes = useStyles();

  const handleChange = (e) => changeQuantity(e.target.value, id);

  return (
    <Paper elevation={15} className={classes.orderItemMobile}>
      <Table className={classes.table}>
        <TableRow>
          <TableCell>
            <Button
              component={NavLink}
              to={`/video_cards/${id}`}
              className={classes.photoLink}
            >
              <img src={photoInOrder} alt={name} />
            </Button>
          </TableCell>
          <TableCell className={classes.nameLink}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Link component={NavLink} to={`/video_cards/${id}`}>
                <b>{name}</b>
              </Link>
              <AddToWishListButton id={id} />
            </div>
          </TableCell>
        </TableRow>
        <TableRow classes={{ root: classes.row }}>
          <TableCell className={classes.quantity}>
            <TextField
              type="number"
              inputProps={{ min: "1" }}
              defaultValue={quantity}
              onChange={handleChange}
            />
          </TableCell>
          <TableCell className={classes.price}>
            <b>{`${quantity * price} грн`}</b>
          </TableCell>
          <TableCell className={classes.delete}>
            <DarkTooltip
              title="Удаление данного товара из корзины"
              placement="top"
            >
              <IconButton
                aria-label="delete"
                onClick={() => deleteCartItem(id)}
                color="primary"
              >
                <DeleteIcon />
              </IconButton>
            </DarkTooltip>
          </TableCell>
        </TableRow>
      </Table>
    </Paper>
  );
};

OrderItemMobile.propTypes = {
  id: PropTypes.number,
  quantity: PropTypes.number,
  changeQuantity: PropTypes.func,
  deleteCartItem: PropTypes.func,
  photoInOrder: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};

export default OrderItemMobile;
