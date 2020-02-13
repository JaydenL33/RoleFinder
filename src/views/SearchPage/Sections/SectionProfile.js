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
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";

import style from "assets/jss/material-kit-pro-react/modalStyle.js";

const useStyles = makeStyles(style);

export default function SectionProfile() {
  const classes = useStyles();
  return (
    <div>
      <DialogContent
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
        <p>Woohoo, you're reading this text in a modal!</p>
      </DialogContent>
    </div>
  );
}
