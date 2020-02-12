/*eslint-disable*/ import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import TagsInput from "react-tagsinput";
import {
  primaryColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// import CustomInput from "components/CustomInput/CustomInput.js";

import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.js";
import headersStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/headersStyle.js";
import teamsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";

// Sections for this page
// import SectionProduct from "./Sections/SectionProduct.js";
import SectionTeam from "./Sections/SectionTeam.js";
// import SectionWork from "./Sections/SectionWork.js";

import accentureLogoWhite from "assets/img/Acc_Logo_White.png";

import { roleList } from "variables/general.js";
const apiURL = "http://localhost:5000/";

const styles = theme => ({
  ...landingPageStyle,
  ...headersStyle(theme),
  ...teamsStyle,
  accentureLogo: {
    width: "20%"
  },
  keywordsBox: {
    padding:"0px",
    margin:"0px",
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
  const [tags, setTags] = React.useState([]);
  const [multipleSelect, setMultipleSelect] = React.useState([]);
  const [checkedA, setCheckedA] = React.useState(false);
  const [checkedB, setCheckedB] = React.useState(false);
  const [results,setResults] = React.useState([]);
  const handleTags = regularTags => {
    setTags(regularTags);
  };
  const handleMultiple = event => {
    setMultipleSelect(event.target.value);
  };
  const requestRoleList = () => {
    // local dataset
    setResults(roleList);

    // call flower counter API to retrieve all vineyards
    // fetch(apiURL + "jobsearch", {
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     userid: 1
    //   })
    // })
    //   .then(response => response.json())
    //   .then(roleList => {
    //     setResults(roleList);
    //   })
    //   .catch(error => {
    //     alert(error);
    //   });
  };

  React.useEffect(()=>{
    requestRoleList()
  }, [requestRoleList])

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
        links={<div className={classes.collapse}>
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
              <List className={classes.list + " " + classes.mlAuto}>
                <ListItem className={classes.listItem}>
                  <Button
                    color="transparent"
                    href="https://twitter.com/"
                    target="_blank"
                    className={classes.navLink + " " + classes.navLinkJustIcon}
                  >
                    <i className={"fab fa-twitter"} />
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    color="transparent"
                    href="https://www.facebook.com/"
                    target="_blank"
                    className={classes.navLink + " " + classes.navLinkJustIcon}
                  >
                    <i className={"fab fa-facebook"} />
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    color="transparent"
                    href="https://www.instagram.com/"
                    target="_blank"
                    className={classes.navLink + " " + classes.navLinkJustIcon}
                  >
                    <i className={"fab fa-instagram"} />
                  </Button>
                </ListItem>
              </List>
            </div>}
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
                Now you have no excuses, it{"'"}s time to surprise your
                clients, your competitors, and why not, the world. You
                probably won
                  {"'"}t have a better chance to show off all your potential if
                  it{"'"}s not by designing a website for your own agency or web
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
                        {/* <CustomInput
                          id="title"
                          inputProps={{
                            placeholder: "Keywords"
                          }}
                          formControlProps={{
                            fullWidth: true,
                            className: classes.formControl
                          }}
                        /> */}
                        <Card className={classes.keywordsBox}>
                          <TagsInput
                            value={tags}
                            onChange={handleTags}
                            tagProps={{ className: "react-tagsinput-tag primary" }}
                            inputProps={{
                              className: 'react-tagsinput-input',
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
                            multiple
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
                                selected:
                                  classes.selectMenuItemSelectedMultiple
                              }}
                              value="2"
                            >
                              Strategy
                              </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected:
                                  classes.selectMenuItemSelectedMultiple
                              }}
                              value="3"
                            >
                              Consulting
                              </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected:
                                  classes.selectMenuItemSelectedMultiple
                              }}
                              value="4"
                            >
                              Digital
                              </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected:
                                  classes.selectMenuItemSelectedMultiple
                              }}
                              value="5"
                            >
                              Technology
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
                        >
                          Search Role
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
      <div className={classNames(classes.main, classes.mainRaised, classes.mainRaiseAdjust)}>
        <div className={classes.container}>
          {/* <SectionProduct /> */}
          <SectionTeam results={results} />
          {/* <SectionWork /> */}
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
                    className={classes.block}
                  >
                    Accenture Bootcamp
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="/"
                    target="_blank"
                    className={classes.block}
                  >
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
