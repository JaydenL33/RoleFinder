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
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// import Close from "@material-ui/icons/Close";
import Face from "@material-ui/icons/Face";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import style from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.js";

const useStyles = makeStyles(style);

function SectionLogin(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const onUsernameChange = username => {
    setUsername(username);
  };
  const onPasswordChange = password => {
    setPassword(password);
  };
  const handleLogin = () => {
    props.login(username, password);
  };
  const handleKeyPress = key => {
    if (key === "Enter") {
      handleLogin();
    }
  };
  const classes = useStyles();
  return (
    <div>
      <Card plain className={classes.modalLoginCard}>
        <DialogContent
          id="login-modal-slide-description"
          className={classes.modalBody}
        >
          <form>
            <CardBody className={classes.cardLoginBody}>
              <CustomInput
                id="login-modal-first"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: e => onUsernameChange(e.target.value),
                  startAdornment: (
                    <InputAdornment position="start">
                      <Face className={classes.icon} />
                    </InputAdornment>
                  ),
                  placeholder: "Username..."
                }}
              />
              <CustomInput
                id="login-modal-pass"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: e => onPasswordChange(e.target.value),
                  onKeyPress: e => handleKeyPress(e.key),
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon className={classes.icon}>lock_outline</Icon>
                    </InputAdornment>
                  ),
                  placeholder: "Password..."
                }}
              />
            </CardBody>
          </form>
        </DialogContent>
        <DialogActions
          className={`${classes.modalFooter} ${classes.justifyContentCenter}`}
        >
          <Button color="primary" simple size="lg" onClick={handleLogin}>
            Get started
          </Button>
        </DialogActions>
      </Card>
    </div>
  );
}

SectionLogin.propTypes = {
  login: PropTypes.func
};

export default SectionLogin;
