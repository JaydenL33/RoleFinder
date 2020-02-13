import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component for creating beautiful carousel

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
// import  from "@material-ui/icons/";

// core components
import Header from "components/Header/Header.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardFooter from "components/Card/CardFooter.js";
import Muted from "components/Typography/Muted.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import headersStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/headersStyle.js";
import teamsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";

import office from "assets/img/bg13.jpg";
import cardProfile1Square from "assets/img/faces/card-profile1-square.jpg";
import cardProfile2Square from "assets/img/faces/card-profile2-square.jpg";
import cardProfile4Square from "assets/img/921305.svg";
import accentureLogoWhite from "assets/img/Acc_Logo_White.png";

const styles = theme => ({
  ...headersStyle(theme),
  ...teamsStyle,
  //   card: {
  //     marginBottom: "100px"
  //   },
  //   cardBody: {
  //     paddingBottom: "0px"
  //   },
  //   cardForm: {
  //     paddingTop: "10px"
  //   },

  accentureLogo: {
    width: "50%"
  },
  selectFormControl: {
    paddingBottom: "0px"
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
  const [checkedA, setCheckedA] = React.useState(false);
  const [multipleSelect, setMultipleSelect] = React.useState([]);
  const handleMultiple = event => {
    setMultipleSelect(event.target.value);
  };
  const classes = useStyles();
  return (
    // we've set the className to cd-section so we can make smooth scroll to it
    <div className="cd-section" {...rest}>
      {/* HEADER 2 START */}
      <div>
        <Header
          absolute
          brand="Accenture"
          color="transparent"
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
            </div>
          }
        />
        <div
          className={classes.pageHeader}
          style={{ backgroundImage: `url("${office}")` }}
        >
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
                      <GridContainer>
                        <GridItem xs={12} sm={4} md={4}>
                          <CustomInput
                            id="title"
                            inputProps={{
                              placeholder: "Role Title"
                            }}
                            formControlProps={{
                              fullWidth: true,
                              className: classes.formControl
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={3} md={3}>
                          <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                          >
                            <InputLabel
                              htmlFor="multiple-select"
                              className={classes.selectLabel}
                            >
                              Departments
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
                                Departments
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
                        <GridItem xs={12} sm={2} md={2}>
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
                            label="Worldwide"
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
        </div>
      </div>
      <div>
        <div className={classes.team + " " + classes.resultsContainer}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={4} md={4}>
                <Card profile>
                  <CardAvatar profile>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img src={cardProfile1Square} alt="..." />
                    </a>
                  </CardAvatar>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Technology Consultant</h4>
                    <Muted>
                      <h6 className={classes.cardCategory}>
                        Accenture Consulting
                      </h6>
                    </Muted>
                    <p className={classes.description}>
                      Don{"'"}t be scared of the truth because we need to
                      restart the human foundation in truth And I love you like
                      Kanye loves Kanye I love Rick Owens’ bed design but the
                      back is...
                    </p>
                  </CardBody>
                  <CardFooter profile className={classes.justifyContent}>
                    <Button justIcon round color="linkedin">
                      <i className="fab fa-linkedin-in" />
                    </Button>
                    <Button justIcon round color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button justIcon round color="dribbble">
                      <i className="fab fa-dribbble" />
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <Card profile>
                  <CardAvatar profile>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img src={cardProfile2Square} alt="..." />
                    </a>
                  </CardAvatar>
                  <CardBody>
                    <h4 className={classes.cardTitle}>George West</h4>
                    <Muted>
                      <h6 className={classes.cardCategory}>BACKEND HACKER</h6>
                    </Muted>
                    <p className={classes.description}>
                      Don{"'"}t be scared of the truth because we need to
                      restart the human foundation in truth And I love you like
                      Kanye loves Kanye I love Rick Owens’ bed design but the
                      back is...
                    </p>
                  </CardBody>
                  <CardFooter profile className={classes.justifyContent}>
                    <Button justIcon round color="dribbble">
                      <i className="fab fa-dribbble" />
                    </Button>
                    <Button justIcon round color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <Card profile>
                  <CardAvatar profile>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img src={cardProfile4Square} alt="..." />
                    </a>
                  </CardAvatar>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Gina Andrew</h4>
                    <Muted>
                      <h6 className={classes.cardCategory}>WEB DESIGNER</h6>
                    </Muted>
                    <p className={classes.description}>
                      Don{"'"}t be scared of the truth because we need to
                      restart the human foundation in truth And I love you like
                      Kanye loves Kanye I love Rick Owens’ bed design but the
                      back is...
                    </p>
                  </CardBody>
                  <CardFooter profile className={classes.justifyContent}>
                    <Button justIcon round color="dribbble">
                      <i className="fab fa-dribbble" />
                    </Button>
                    <Button justIcon round color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button justIcon round color="pinterest">
                      <i className="fab fa-pinterest" />
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      {/* HEADER 2 END */}
    </div>
  );
}
