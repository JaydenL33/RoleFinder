import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { primaryColor, hexToRgb } from "assets/jss/material-kit-pro-react.js";
// @material-ui/icons
// import  from "@material-ui/icons/";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
import Subject from "@material-ui/icons/Subject";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

// import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Muted from "components/Typography/Muted.js";
import Button from "components/CustomButtons/Button.js";
import Primary from "components/Typography/Primary";
import Pagination from "components/Pagination/Pagination.js";

import technologyDTE from "assets/img/technology.png";

import teamsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
import teamStyle from "assets/jss/material-kit-pro-react/views/landingPageSections/teamStyle.js";
import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";

const style = theme => ({
  ...teamsStyle,
  ...teamStyle,
  ...modalStyle(theme),
  modalRootExample: {
    "& > div:first-child": {
      display: "none"
    },
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  textAlignLeft: {
    textAlign: "left"
  },
  justifyContentCenter: {
    "& > ul": {
      justifyContent: "center!important"
    }
  }
});

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(style);

function SectionRole(props) {
  const {
    results: { totalhits, hits },
    addFavourite
  } = props;
  const hitsPerPage = 3;
  const totalPages = Math.ceil(totalhits / hitsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [roleKey, setRoleKey] = React.useState();
  const [scrollingModal, setScrollingModal] = React.useState(false);
  const classes = useStyles();
  console.log(currentPage, hits);

  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Here are our recommendations</h2>
      <div>
        <GridContainer>
          {totalhits &&
            hits.map((role, index) => {
              let lowerIndex = (currentPage - 1) * hitsPerPage;
              let uppperIndex = currentPage * hitsPerPage;
              if (index >= lowerIndex && index < uppperIndex) {
                return (
                  <GridItem xs={12} sm={6} md={4} key={index}>
                    <Card profile>
                      <CardAvatar profile>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img src={technologyDTE} alt="..." />
                        </a>
                      </CardAvatar>
                      <CardBody>
                        <h4 className={classes.cardTitle}>{role.title}</h4>
                        <Muted>
                          <h6 className={classes.cardCategory}>
                            {role.location}
                          </h6>
                        </Muted>
                        <br />
                        <div className={classes.textAlignLeft}>
                          <Primary>
                            <h6 className={classes.cardCategory}>
                              PROJECT DATE
                            </h6>
                          </Primary>
                          <div className={classes.cardDescription}>
                            {role.startdate + " - " + role.enddate}
                          </div>
                          <Primary>
                            <h6 className={classes.cardCategory}>
                              CAREER LEVEL
                            </h6>
                          </Primary>
                          <div className={classes.cardDescription}>
                            {role.careerLevelTo + " - " + role.careerLevelFrom}
                          </div>
                          <Primary>
                            <h6 className={classes.cardCategory}>
                              KEY STRENGTHS
                            </h6>
                          </Primary>
                          <div className={classes.cardDescription}>
                            {role.quadrant1 + ", " + role.quadrant2}
                          </div>
                          <Primary>
                            <h6 className={classes.cardCategory}>STATUS</h6>
                          </Primary>
                          <div className={classes.cardDescription}>
                            {role.status}
                          </div>
                        </div>
                      </CardBody>
                      <CardFooter profile className={classes.justifyContent}>
                        <Button
                          color="primary"
                          round
                          simple
                          onClick={() => {
                            setRoleKey(index);
                            setScrollingModal(true);
                          }}
                        >
                          <Subject /> More
                        </Button>
                        <Button
                          justIcon
                          round
                          color="primary"
                          onClick={() => {
                            addFavourite(hits[index].jobid);
                          }}
                        >
                          <Favorite style={{ color: "#FFFFFF" }} />
                        </Button>
                        <Button justIcon round color="primary" simple>
                          <Close />
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                );
              } else {
                return null;
              }
            })}
        </GridContainer>
      </div>
      <div className={classes.justifyContentCenter}>
        <Pagination
          pages={[
            {
              text: "First",
              onClick: () => setCurrentPage(1)
            },
            {
              disabled: currentPage <= 1,
              text: "Previous",
              onClick: () => setCurrentPage(currentPage - 1)
            },
            // { text: 1 },
            { active: true, text: currentPage },
            // { text: 3 },
            {
              disabled: currentPage === totalPages,
              text: "Next",
              onClick: () => setCurrentPage(currentPage + 1)
            },
            {
              disabled: totalPages <= 1,
              text: "Last",
              onClick: () => setCurrentPage(totalPages)
            }
          ]}
        />
      </div>

      <div>
        <Dialog
          // onClick={() => setScrollingModal(false)}
          classes={{
            root: `${classes.modalRoot} ${classes.modalRootExample}`,
            paper: classes.modal + " " + classes.modalLarge
          }}
          open={scrollingModal}
          TransitionComponent={Transition}
          keepMounted
          // onClose={() => setScrollingModal(false)}
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
              onClick={() => setScrollingModal(false)}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>Role Details</h4>
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            {hits[roleKey] ? hits[roleKey].description : <p>Loading...</p>}
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button onClick={() => setScrollingModal(false)} color="secondary">
              Close
            </Button>
            <Button color="primary">Apply</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

SectionRole.propTypes = {
  results: PropTypes.object,
  addFavourite: PropTypes.func
};

export default SectionRole;
