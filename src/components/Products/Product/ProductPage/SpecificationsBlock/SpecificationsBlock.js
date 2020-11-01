import React from "react";
import {
  makeStyles,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";
import * as PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 32,
  },
  title: {
    fontSize: 15,
    marginBottom: 15,
  },
  tableRow: {
    "&:nth-child(odd)": {
      background: "#d3e2f0"
    },
    "& td": {
      fontSize: 13,
      lineHeight: 1,
    },
  },
  info: {
    margin: "30px 15px",
    padding: 16,
    background: "#fff6c6",
    border: "1px solid #d2ddec",
    "& p": {
      marginBottom: 8,
      fontSize: 12,
      color: theme.palette.primary.main,
    },
  },
}));

const SpecificationsBlock = ({ product }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h2" id="specs" className={classes.title}>
        <b>{`Технические характеристики* ${product.name}:`}</b>
      </Typography>
      <Table size="small">
        <TableBody>
          {product.specifications.map((key, index) => {
            const { property, value, hide } = Object.values(key)[0];
            let link;
            if (typeof value === "string" && value.indexOf("http") >= 0) {
              link = value;
            }
            return (
              !hide && (
                <TableRow key={index} className={classes.tableRow}>
                  <TableCell>{property}</TableCell>
                  <TableCell>
                    {link ? <a href={link}>{link}</a> : value}
                  </TableCell>
                </TableRow>
              )
            );
          })}
        </TableBody>
      </Table>
      <Paper elevation={15} className={classes.info}>
        <Typography>
          * Характеристики и комплектация товара могут изменяться производителем
          без уведомления
        </Typography>
        <Typography>
          Если Вы заметили какую-либо ошибку на сайте, то выделите ее и нажмите
          комбинацию клавиш Ctrl+Enter или кнопку слева с текстом "Нашли ошибку?
          Ctrl+Enter".
        </Typography>
        <Typography>
          Все собранные ошибки мы будем стараться исправлять.
        </Typography>
      </Paper>
    </div>
  );
};

SpecificationsBlock.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    specifications: PropTypes.array,
  }),
};

export default SpecificationsBlock;
