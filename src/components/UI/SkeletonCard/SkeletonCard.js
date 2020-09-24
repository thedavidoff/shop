import React from "react";
import { makeStyles, Grid, List, ListItem } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(() => ({
  root: {
    width: 300,
    margin: 10,
    padding: 15,
    textAlign: "left",
  },
  media: {
    position: "relative",
    display: "flex",
    height: 233,
    marginBottom: 5,
  },
  hit: {
    position: "absolute",
    width: 20,
    height: 20,
    bottom: 0,
    left: 0,
  },
  new: {
    position: "absolute",
    width: 20,
    height: 20,
    bottom: 0,
    left: 25,
  },
  list: {
    padding: 0,
  },
  listItem: {
    padding: 0,
  },
  skeleton: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
}));

const SkeletonCard = ({ id }) => {
  const classes = useStyles();

  const StyledSkeleton = (props) => {
    return (
      <Skeleton
        animation={false}
        variant={props.variant || "text"}
        {...props}
        className={classes.skeleton}
      >
        {props.children}
      </Skeleton>
    );
  };

  return (
    <Grid className={classes.root} id={id} container>
      <Grid className={classes.media} item xs>
        <StyledSkeleton variant="rect" width={270} height={233} />
      </Grid>
      <Grid item xs={12}>
        <StyledSkeleton style={{ marginBottom: 20 }} />
      </Grid>
      <Grid style={{ marginBottom: 15 }} item xs>
        <StyledSkeleton />
        <StyledSkeleton width="90%" />
        <StyledSkeleton width="80%" />
      </Grid>
      <Grid container>
        <Grid item xs>
          <List className={classes.list}>
            <ListItem className={classes.listItem} disableGutters>
              <StyledSkeleton
                width="50%"
                height={50}
                style={{ marginBottom: 15 }}
              />
            </ListItem>
            <ListItem className={classes.listItem} disableGutters>
              <StyledSkeleton width="60%" />
            </ListItem>
            <ListItem className={classes.listItem} disableGutters>
              <StyledSkeleton width="80%" />
            </ListItem>
            <ListItem className={classes.listItem} disableGutters>
              <StyledSkeleton width="40%" />
            </ListItem>
            <ListItem className={classes.listItem} disableGutters>
              <StyledSkeleton width="85%" />
            </ListItem>
            <ListItem className={classes.listItem} disableGutters>
              <StyledSkeleton width="70%" />
            </ListItem>
            <ListItem className={classes.listItem} disableGutters>
              <StyledSkeleton width="90%" />
            </ListItem>
          </List>
        </Grid>
        <Grid style={{ flexBasis: 100, maxWidth: 100 }} item xs>
          <StyledSkeleton width={100} height={77} variant="rect" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SkeletonCard;
