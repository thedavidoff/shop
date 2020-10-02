import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import SearchList from "./SearchList";
import {
  makeStyles,
  Dialog,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  IconButton,
  Typography,
  withStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";

const delay = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: "visible",
  },
  span: {
    fontSize: 14,
    lineHeight: 1,
    borderBottom: "1px dashed",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 0,
    paddingBottom: 16,
    "& p": {
      fontSize: 12,
    },
  },
  list: {
    "& li": {
      display: "inline-block",
      width: "auto",
      margin: "5px 10px 5px 0",
      padding: 0,
      fontSize: 16,
      borderBottom: "1px dashed",
      "&:hover": {
        cursor: "pointer",
        color: theme.palette.secondary.main,
      },
    },
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: "16px 24px",
  },
  title: {
    paddingRight: 40,
    textAlign: "center",
    whiteSpace: "nowrap",
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    color: theme.palette.grey[500],
    "&:hover": { backgroundColor: "rgba(0, 0, 0, .15)" },
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography className={classes.title}>{children}</Typography>
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

const City = ({ city, newCity, handleSelectCity }) => {
  const classes = useStyles();
  const [searchString, setSearchString] = useState("");
  const [filter, setFilter] = useState("");
  const [debouncedSetFilter] = useDebouncedCallback(
    (filter) => setFilter(filter),
    delay
  );

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
    setSearchString("");
    debouncedSetFilter("");
  }, [handleSelectCity, debouncedSetFilter]);

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClickClose = () => {
    setIsOpen(false);
  };

  const handleChangeSearch = (e) => {
    const { value } = e.target;
    setSearchString(value);
    debouncedSetFilter(value);
  };

  return (
    <>
      <Typography
        component="span"
        className={classes.span}
        onClick={handleClickOpen}
        data-tip="Посмотреть наличие товара на складах."
      >
        {newCity || city || ""}
      </Typography>
      <Dialog
        open={isOpen}
        onClose={handleClickClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        PaperProps={{
          classes: {
            root: classes.root,
          },
        }}
      >
        <DialogTitle
          id="form-dialog-title"
          onClose={handleClickClose}
        >{`Сейчас указан: ${newCity || city}`}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography>Чтобы изменить город:</Typography>
          <TextField
            label="Начните вводить название"
            size="small"
            value={searchString}
            variant="filled"
            onChange={handleChangeSearch}
            autoFocus
          />

          <Typography>или выберите из списка:</Typography>
          <SearchList handleSelectCity={handleSelectCity} filter={filter} />
          <List className={classes.list}>
            <ListItem disableGutters onClick={handleSelectCity}>
              Киев (Киевская обл)
            </ListItem>
            <ListItem disableGutters onClick={handleSelectCity}>
              Харьков (Харьковская обл)
            </ListItem>
            <br />
            <ListItem disableGutters onClick={handleSelectCity}>
              Одесса (Одесская обл)
            </ListItem>
            <ListItem disableGutters onClick={handleSelectCity}>
              Днепр (Днепропетровская обл)
            </ListItem>
            <br />
            <ListItem disableGutters onClick={handleSelectCity}>
              Львов (Львовская обл)
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default City;
