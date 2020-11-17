import React from "react";
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  list: {
    "& li": {
      paddingTop: 2,
      paddingBottom: 2,
      fontSize: 14,
    },
  },
  gridItem: {
    padding: "15px 32px",
  },
  title: {
    fontSize: 15,
  },
}));

const DeliveryPayBlock = () => {
  const classes = useStyles();

  return (
    <Paper elevation={15}>
      <Grid container>
        <Grid item xs={6} className={classes.gridItem}>
          <Typography component="h3" className={classes.title}>
            <b>Доставка:</b>
          </Typography>
          <List className={classes.list}>
            <ListItem>самовывоз: бесплатно</ListItem>
            <ListItem>по Харькову: 70 грн</ListItem>
            <ListItem>по Украине</ListItem>
            <ListItem>адресная доставка в регионы</ListItem>
            <ListItem>оплата при получении товара</ListItem>
          </List>
        </Grid>
        <Grid item xs={6} className={classes.gridItem}>
          <Typography component="h3" className={classes.title}>
            <b>Оплата:</b>
          </Typography>
          <List className={classes.list}>
            <ListItem>наличная</ListItem>
            <ListItem>безналичная</ListItem>
            <ListItem>эл. платежи</ListItem>
            <ListItem>рассрочка</ListItem>
            <ListItem>Apple Pay</ListItem>
            <ListItem>Google Pay</ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DeliveryPayBlock;
