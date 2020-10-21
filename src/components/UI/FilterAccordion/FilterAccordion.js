import React from "react";
import {
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(() => ({
  accordion: {
    margin: "8px 0 !important",
    minHeight: "auto",
    backgroundColor: "transparent",
  },
  summary: {
    minHeight: "auto",
    padding: "0px 8px",
    backgroundColor: "#fff",
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
  },
  icon: {
    marginRight: 0,
    padding: 0,
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
  const [expanded, setExpanded] = React.useState({
    brand: true,
    chip_maker: true,
    series: false,
    lineup: true,
    professional: false,
    memory_size: true,
    memory_type: true,
    memory_bus: true,
    directX: false,
    power_connectors: false,
    "d-sub": false,
    dvi: false,
    hdmi: false,
    displayPort: false,
    process_technology: false,
    recommended_psu: false,
    cooling_type: false,
    features: false,
    slot_type: false
  });

  const handleChange = (e) => {
    setExpanded({...expanded, [e.currentTarget.id]: !expanded[e.currentTarget.id]});
  };

  return (
    <Accordion className={classes.accordion} expanded={expanded[props.id]} onChange={handleChange}>
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
