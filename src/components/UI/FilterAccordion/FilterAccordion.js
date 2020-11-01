import React from "react";
import {
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  accordion: {
    margin: "8px 0 !important",
    minHeight: "auto",
    backgroundColor: "transparent",
  },
  summary: {
    minHeight: "auto",
    padding: "0px 8px",
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  content: {
    margin: 0,
  },
  expanded: {
    margin: "0 !important",
    minHeight: "auto !important",
  },
  details: {
    padding: 0,
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 0,
    padding: 0,
    color: "#fff",
    "& svg": {
      fontSize: 16,
    },
  },
  heading: {
    fontSize: 12,
  },
}));

const FilterAccordion = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(props.isOpen);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion elevation={15} className={classes.accordion} expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id={props.id}
        classes={{
          root: classes.summary,
          content: classes.content,
          expanded: classes.expanded,
        }}
        IconButtonProps={{ classes: { root: classes.icon } }}
      >
        <Typography className={classes.heading}>{props.heading}</Typography>
      </AccordionSummary>
      <AccordionDetails
        classes={{
          root: classes.details,
        }}
      >
        {props.children}
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterAccordion;
