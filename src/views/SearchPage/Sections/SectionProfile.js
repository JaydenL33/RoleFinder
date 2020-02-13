/*!

=========================================================
* Material Kit PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import TagsInput from "react-tagsinput";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";

// core components
import Primary from "components/Typography/Primary";

import style from "assets/jss/material-kit-pro-react/modalStyle.js";

const useStyles = makeStyles(style);

function SectionProfile(props) {
  const {
    user: { name, strengths, interests }
  } = props;
  const [tags, setTags] = React.useState(interests);
  const handleTags = regularTags => {
    setTags(regularTags);
  };
  const classes = useStyles();
  return (
    <div>
      <DialogContent
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
        <h4 className={classes.cardTitle}>{name}</h4>
        <br />
        <div className={classes.textAlignLeft}>
          <Primary>
            <h6 className={classes.cardCategory}>Your Strengths</h6>
          </Primary>
          <div className={classes.cardDescription}>{strengths}</div>
          <Primary>
            <h6 className={classes.cardCategory}>Your Interests</h6>
          </Primary>
          <div className={classes.cardDescription}>{interests}</div>
          <TagsInput
            value={tags}
            onChange={handleTags}
            tagProps={{
              className: "react-tagsinput-tag primary"
            }}
            inputProps={{
              className: "react-tagsinput-input",
              placeholder: "Add Interests"
            }}
          />
        </div>
      </DialogContent>
    </div>
  );
}

SectionProfile.propTypes = {
  user: PropTypes.object
};

export default SectionProfile;
