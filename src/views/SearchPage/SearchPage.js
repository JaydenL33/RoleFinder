import React from "react";
// nodejs library to set properties for components
// import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import TagsInput from "react-tagsinput";
import { primaryColor, hexToRgb } from "assets/jss/material-kit-pro-react.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import ExitToApp from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";
// import Explore from "@material-ui/icons/Explore";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
// import CustomInput from "components/CustomInput/CustomInput.js";

import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.js";
import headersStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/headersStyle.js";
import teamsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
import loginStyle from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.js";

// Sections for this page
// import SectionProduct from "./Sections/SectionProduct.js";
import SectionRole from "./Sections/SectionRole.js";
import SectionLogin from "./Sections/SectionLogin.js";
import SectionProfile from "./Sections/SectionProfile.js";
// import SectionWork from "./Sections/SectionWork.js";

import accentureLogoWhite from "assets/img/Acc_Logo_White.png";

// import { searchResults } from "variables/general.js";
const apiURL = "http://localhost:5000/";

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const styles = theme => ({
  ...landingPageStyle,
  ...headersStyle(theme),
  ...teamsStyle,
  ...loginStyle(theme),
  accentureLogo: {
    width: "20%"
  },
  keywordsBox: {
    padding: "0px",
    margin: "0px",
    boxShadow: "0px",
    border: "1px solid rgba(" + hexToRgb(primaryColor[0]) + ", .54)",
    borderColor: primaryColor[0]
  },
  selectFormControl: {
    paddingBottom: "0px"
  },
  mainRaiseAdjust: {
    marginTop: "0px"
  },
  resultsContainer: {
    position: "relative",
    height: "100vh",
    maxHeight: "1600px",
    // backgroundPosition: "50%",
    backgroundSize: "cover"
  }
});

const useStyles = makeStyles(styles);

export default function SearchPage({ ...rest }) {
  const [user, setUser] = React.useState({ userid: null });
  const [loginModal, setLoginModal] = React.useState(false);
  const [profileModal, setProfileModal] = React.useState(false);
  const [tags, setTags] = React.useState([]);
  const [multipleSelect, setMultipleSelect] = React.useState(null);
  const [checkedA, setCheckedA] = React.useState(false);
  const [checkedB, setCheckedB] = React.useState(false);
  const [favouritePage, setFavouritePage] = React.useState(false);
  const [tl, setTl] = React.useState(false);
  const [tl2, setTl2] = React.useState(false);
  const [results, setResults] = React.useState({});
  const handleTags = regularTags => {
    setTags(regularTags);
  };
  const handleMultiple = event => {
    setMultipleSelect(event.target.value);
  };
  const handleLogin = (username, password) => {
    // local dataset
    // setUser({ userid: 1 });

    fetch(apiURL + "login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: username,
        password
      })
    })
      .then(response => response.json())
      .then(auth => {
        // console.log(auth);
        if (auth.successful) {
          setUser({ userid: auth.userid });
        } else {
          alert(auth.message);
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  const handleLogout = () => {
    setUser({ userid: null });
  };
  const getProfile = () => {
    fetch(apiURL + "userinfo", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: user.userid
      })
    })
      .then(response => response.json())
      .then(res => {
        // console.log(res);
        res.successful &&
          setUser({
            ...user,
            name: res.name,
            strengths: res.strengths,
            interests: res.interests
          });
      })
      .catch(error => {
        alert(error);
      });
  };
  const saveProfile = profile => {
    //TODO
    // local dataset
    // setUser({ userid: 1 });
    // call flower counter API to retrieve all vineyards
    // fetch(apiURL + "login", {
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     profile
    //   })
    // })
    //   .then(response => response.json())
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(error => {
    //     alert(error);
    //   });
  };
  const addFavourite = jobid => {
    // console.log(user.userid, jobid);
    fetch(apiURL + "addfavourite", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: user.userid,
        jobid: jobid
      })
    })
      .then(response => response.json())
      .then(res => {
        // console.log(res);
        if (res.successful) {
          setTl(true);
          // use this to make the notification autoclose
          // setTimeout(() => {
          //   setTl(false);
          // }, 6000);
          searchRoleList(favouritePage);
        } else {
          alert("Fail");
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  const removeFavourite = jobid => {
    // console.log(user.userid, jobid);
    fetch(apiURL + "removefavourite", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: user.userid,
        jobid: jobid
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.successful) {
          setTl2(true);
          // use this to make the notification autoclose
          // setTimeout(() => {
          //   setTl2(false);
          // }, 6000);
          searchRoleList(favouritePage);
        } else {
          alert("Fail");
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  const searchRoleList = (use_favourites = false) => {
    // local dataset
    // setResults(searchResults);
    // console.log(tags);
    // call flower counter API to retrieve all vineyards
    if (user.userid) {
      fetch(apiURL + "jobsearch", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userid: user.userid,
          incountry: !checkedA,
          employeecareerlevelonly: !checkedB,
          keywords: tags,
          department: multipleSelect,
          use_favourites
        })
      })
        .then(response => response.json())
        .then(searchResults => {
          console.log(searchResults);
          setResults(searchResults);
        })
        .catch(error => {
          alert(error);
        });
    } else {
      setLoginModal(true);
    }
  };

  React.useEffect(() => {
    user.userid && setLoginModal(false);
    searchRoleList();
  }, [user.userid]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <Header
        color="transparent"
        brand="Accenture"
        links={
          <div className={classes.collapse}>
            <List className={classes.list + " " + classes.mlAuto}>
              <ListItem className={classes.listItem}>
                <Button
                  href="#pablo"
                  className={classes.navLink}
                  onClick={e => e.preventDefault()}
                  color="transparent"
                >
                  Home
                </Button>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Button
                  href="#pablo"
                  className={classes.navLink}
                  onClick={e => e.preventDefault()}
                  color="transparent"
                >
                  About
                </Button>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Button
                  href="#pablo"
                  className={classes.navLink}
                  onClick={e => e.preventDefault()}
                  color="transparent"
                >
                  Contact us
                </Button>
              </ListItem>
            </List>
            {user.userid ? (
              <List className={classes.list + " " + classes.mlAuto}>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={() => {
                      getProfile();
                      setProfileModal(true);
                    }}
                    color="transparent"
                  >
                    <AccountCircle /> Profile
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={() => handleLogout()}
                    color="transparent"
                  >
                    <ExitToApp /> Logout
                  </Button>
                </ListItem>
              </List>
            ) : (
              <List className={classes.list + " " + classes.mlAuto}>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={() => setLoginModal(true)}
                    color="transparent"
                  >
                    <AccountCircle /> Login
                  </Button>
                </ListItem>
              </List>
            )}
          </div>
        }
        fixed
        changeColorOnScroll={{
          height: 300,
          color: "primary"
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/bg13.jpg")} filter="dark">
        <div className={classes.conatinerHeader2}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={8}
              md={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <img
                src={accentureLogoWhite}
                alt="..."
                className={classes.accentureLogo}
              />
              <h1 className={classes.title}>Role Finder</h1>
              <h4>
                Now you have no excuses, it{"'"}s time to surprise your clients,
                your competitors, and why not, the world. You probably won
                {"'"}t have a better chance to show off all your potential if it
                {"'"}s not by designing a website for your own agency or web
                studio.
              </h4>
            </GridItem>
            <GridItem
              xs={12}
              sm={10}
              md={10}
              className={classNames(classes.mlAuto, classes.mrAuto)}
            >
              <Card raised className={classes.card}>
                <CardBody formHorizontal>
                  <form>
                    <GridContainer alignItems="center">
                      <GridItem xs={12} sm={4} md={4}>
                        <Card className={classes.keywordsBox}>
                          <TagsInput
                            value={tags}
                            onChange={handleTags}
                            tagProps={{
                              className: "react-tagsinput-tag primary"
                            }}
                            inputProps={{
                              className: "react-tagsinput-input",
                              placeholder: "Keywords"
                            }}
                          />
                        </Card>
                      </GridItem>
                      <GridItem xs={12} sm={2} md={2}>
                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="multiple-select"
                            className={classes.selectLabel}
                          >
                            DTE
                          </InputLabel>
                          <Select
                            // multiple
                            value={multipleSelect}
                            onChange={handleMultiple}
                            MenuProps={{
                              className: classes.selectMenu,
                              classes: { paper: classes.selectPaper }
                            }}
                            classes={{ select: classes.select }}
                            inputProps={{
                              name: "multipleSelect",
                              id: "multiple-select"
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              DTE
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelectedMultiple
                              }}
                              value="strategy"
                            >
                              Strategy
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelectedMultiple
                              }}
                              value="digital"
                            >
                              Digital
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelectedMultiple
                              }}
                              value="technology"
                            >
                              Technology
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelectedMultiple
                              }}
                              value="operations"
                            >
                              Operations
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelectedMultiple
                              }}
                              value="security"
                            >
                              Security
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelectedMultiple
                              }}
                              value="network"
                            >
                              Capability Network
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelectedMultiple
                              }}
                              value="communications"
                            >
                              Communications, Media & Technology
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelectedMultiple
                              }}
                              value="financial"
                            >
                              Financial Service
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelectedMultiple
                              }}
                              value="health"
                            >
                              Health & Public Service
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelectedMultiple
                              }}
                              value="resources"
                            >
                              Resources
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelectedMultiple
                              }}
                              value="products"
                            >
                              Products
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelectedMultiple
                              }}
                              value="other"
                            >
                              Other
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={3} md={3}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={checkedA}
                              onChange={event =>
                                setCheckedA(event.target.checked)
                              }
                              value="checkedA"
                              classes={{
                                switchBase: classes.switchBase,
                                checked: classes.switchChecked,
                                thumb: classes.switchIcon,
                                track: classes.switchBar
                              }}
                            />
                          }
                          classes={{
                            label: classes.label,
                            root: classes.labelRoot
                          }}
                          label="World-wide"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={checkedB}
                              onChange={event =>
                                setCheckedB(event.target.checked)
                              }
                              value="checkedB"
                              classes={{
                                switchBase: classes.switchBase,
                                checked: classes.switchChecked,
                                thumb: classes.switchIcon,
                                track: classes.switchBar
                              }}
                            />
                          }
                          classes={{
                            label: classes.label,
                            root: classes.labelRoot
                          }}
                          label="All Career Levels"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={3} md={3}>
                        <Button
                          block
                          color="primary"
                          className={classes.button}
                          onClick={() => {
                            setFavouritePage(false);
                            searchRoleList();
                          }}
                        >
                          Search Role
                        </Button>
                        <Button
                          block
                          color="primary"
                          className={classes.button}
                          simple
                          onClick={() => {
                            setFavouritePage(true);
                            searchRoleList(true);
                          }}
                        >
                          My Favourites
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </form>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div>
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal + " " + classes.modalLogin
          }}
          open={loginModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setLoginModal(false)}
          aria-labelledby="login-modal-slide-title"
          aria-describedby="login-modal-slide-description"
        >
          <DialogTitle
            id="login-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <CardHeader
              plain
              color="primary"
              className={`${classes.textCenter} ${classes.cardLoginHeader}`}
            >
              <Button
                simple
                className={classes.modalCloseButton}
                key="close"
                aria-label="Close"
                onClick={() => setLoginModal(false)}
              >
                <Close className={classes.modalClose} />
              </Button>
              <h5 className={classes.cardTitleWhite}>Log in</h5>
            </CardHeader>
          </DialogTitle>
          <SectionLogin login={handleLogin} />
        </Dialog>
      </div>
      <div>
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal
          }}
          open={profileModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setProfileModal(false)}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              simple
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              onClick={() => setProfileModal(false)}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>Profile</h4>
          </DialogTitle>
          {user.name ? (
            <SectionProfile saveProfile={saveProfile} user={user} />
          ) : null}

          <DialogActions className={classes.modalFooter}>
            <Button onClick={() => setProfileModal(false)} color="secondary">
              Close
            </Button>
            <Button color="primary">Save changes</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div
        className={classNames(
          classes.main,
          classes.mainRaised,
          classes.mainRaiseAdjust
        )}
      >
        <div className={classes.container}>
          {results.successful ? (
            <SectionRole
              results={results}
              addFavourite={addFavourite}
              removeFavourite={removeFavourite}
            />
          ) : null}
          {tl ? (
            <SnackbarContent
              // place="tl"
              color="primary"
              icon={Favorite}
              message={"Role Favourited"}
              // open={tl}
              // closeNotification={() => setTl(false)}
              close
            />
          ) : null}
          {tl2 ? (
            <SnackbarContent
              // place="tl"
              color="warning"
              icon={Close}
              message={"Favourite Removed"}
              // open={tl2}
              // closeNotification={() => setTl2(false)}
              close
            />
          ) : null}
        </div>
      </div>
      <Footer
        content={
          <div>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://www.accenture.com/au-en/careers/technology-academy-bootcamp?src=auFY20tech_bootcampotcgradconnection&c=car_au_techbootcamp_11061997&n=otc_1119"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.block}
                  >
                    Accenture Bootcamp
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a href="/" target="_blank" className={classes.block}>
                    About us
                  </a>
                </ListItem>
              </List>
            </div>
            <div className={classes.right}>
              &copy; {1900 + new Date().getYear()} , made with{" "}
              <Favorite className={classes.icon} /> by{" "}
              <a
                href="https://www.accenture.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Team 8
              </a>{" "}
              for a better web.
            </div>
          </div>
        }
      />
    </div>
  );
}
