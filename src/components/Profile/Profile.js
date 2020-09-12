import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { NavLink } from "react-router-dom";
import Helmet from "react-helmet";
import * as PropTypes from "prop-types";

import styles from "./Profile.module.css";
import ProfileForm from "../Forms/ProfileForm/ProfileForm";
import {
  setInitialValuesForProfileForm,
  updateProfile,
} from "../../redux/authReducer";
import Preloader from "../UI/Preloader/Preloader";
import Notices from "../UI/Notices/Notices";
import WishList from "./WishList/WishList";
import {
  getInitialValues,
  getIsAuth,
  getNoticeType,
  getProfile,
} from "../../redux/selectors";

const Profile = ({
  isAuth,
  profile,
  initialValues,
  noticeType,
  index,
  updateProfile,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialValuesForProfileForm());
  }, [isAuth, dispatch]);

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
      {noticeType && <Notices type={noticeType} />}
      {isLoaded(isAuth) && isEmpty(isAuth) ? (
        <Notices type="accessDenied" />
      ) : (
        <div className={styles.profile}>
          <Tabs selectedIndex={index} onSelect={() => null}>
            <TabList className={styles.profileTabs}>
              <Tab>
                <NavLink className={styles.tabLink} to="/profile?tab=regdata">
                  Общие
                </NavLink>
              </Tab>
              <Tab>
                <NavLink className={styles.tabLink} to="/profile?tab=wishlist">
                  Список желаний
                </NavLink>
              </Tab>
            </TabList>
            <div className={styles.profileBody}>
              <TabPanel>
                {isLoaded(isAuth) && !isEmpty(isAuth) ? (
                  <ProfileForm
                    onSubmit={updateProfile}
                    initialValues={initialValues}
                  />
                ) : (
                  <Preloader type="bigProfile" />
                )}
              </TabPanel>
              <TabPanel>
                {isLoaded(profile) && !isEmpty(profile) ? (
                  <WishList />
                ) : (
                  <Preloader type="bigProfile" />
                )}
              </TabPanel>
            </div>
          </Tabs>
        </div>
      )}
    </>
  );
};

Profile.propTypes = {
  isAuth: PropTypes.object,
  profile: PropTypes.object,
  initialValues: PropTypes.object,
  noticeType: PropTypes.string,
  index: PropTypes.number,
  updateProfile: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isAuth: getIsAuth(state),
    profile: getProfile(state),
    initialValues: getInitialValues(state),
    noticeType: getNoticeType(state),
  };
};

export default connect(mapStateToProps, { updateProfile })(Profile);
