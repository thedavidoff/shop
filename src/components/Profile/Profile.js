import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { NavLink } from "react-router-dom";
import {
  makeStyles,
  AppBar,
  Box,
  Tabs,
  Tab,
  Paper,
} from "@material-ui/core";
import Helmet from "react-helmet";
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

const useStyles = makeStyles(() => ({
  root: {
    padding: 30,
  },
  header: {
    borderRadius: "4px 4px 0 0",
  },
}));

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box style={{ padding: "24px 0" }}>{children}</Box>}
    </div>
  );
};

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
          href="http://localhost:3000/profile?tab=regdata"
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
              {isLoaded(profile) && !isEmpty(profile) ? (
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
