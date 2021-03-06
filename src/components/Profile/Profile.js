import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";
import Helmet from "react-helmet";
import { makeStyles, AppBar, Tabs, Tab, Paper } from "@material-ui/core";
import * as PropTypes from "prop-types";

import ProfileForm from "../Forms/ProfileForm/ProfileForm";
import {
  setInitialValuesForProfileForm,
  updateProfile,
} from "../../redux/authReducer";
import Preloader from "../UI/Preloader/Preloader";
import WishList from "./WishList/WishList";
import {
  getInitialValues,
  getIsAnonymous,
  getIsAuth,
  getNoticeType,
  getProfile,
} from "../../redux/selectors";
import Notice from "../UI/Notice/Notice";
import Snackbar from "../UI/Snackbar/Snackbar";
import TabPanel from "../UI/TabPanel/TabPanel";

const useStyles = makeStyles(() => ({
  root: {
    padding: 15,
  },
  header: {
    borderRadius: "4px 4px 0 0",
  },
}));

const linkProps = (index) => {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
};

const LinkTab = (props) => {
  return <Tab component={NavLink} {...props} />;
};

const Profile = ({
  isAuth,
  isAnonymous,
  profile,
  initialValues,
  noticeType,
  index,
  updateProfile,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    dispatch(setInitialValuesForProfileForm());
  }, [isAuth, dispatch]);

  useEffect(() => {
    setValue(index);
  }, [index]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Общие | Профиль</title>
        <link
          rel="canonical"
          href="/profile?tab=regdata"
        />
      </Helmet>
      {noticeType && <Snackbar type={noticeType} />}
      {index === 0 && (isEmpty(isAuth) || isAnonymous) ? (
        <Notice type="accessDenied" />
      ) : (
        <div className={classes.root}>
          <Paper elevation={15}>
            <AppBar position="static" className={classes.header}>
              <Tabs
                value={index || value}
                onChange={handleChange}
                aria-label="Nav tabs"
              >
                <LinkTab
                  label="Общие"
                  to="/profile?tab=regdata"
                  {...linkProps(0)}
                />
                <LinkTab
                  label="Список желаний"
                  to="/profile?tab=wishlist"
                  {...linkProps(1)}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              {isLoaded(isAuth) && !isEmpty(isAuth) ? (
                <ProfileForm
                  onSubmit={updateProfile}
                  initialValues={initialValues}
                />
              ) : (
                <Preloader type="bigProfile" />
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {isLoaded(profile) && !isEmpty(isAuth) ? (
                <WishList />
              ) : (
                <Preloader type="bigProfile" />
              )}
            </TabPanel>
          </Paper>
        </div>
      )}
    </>
  );
};

Profile.propTypes = {
  isAuth: PropTypes.object,
  isAnonymous: PropTypes.bool,
  profile: PropTypes.object,
  initialValues: PropTypes.object,
  noticeType: PropTypes.string,
  index: PropTypes.number,
  updateProfile: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isAuth: getIsAuth(state),
    isAnonymous: getIsAnonymous(state),
    profile: getProfile(state),
    initialValues: getInitialValues(state),
    noticeType: getNoticeType(state),
  };
};

export default connect(mapStateToProps, { updateProfile })(Profile);
