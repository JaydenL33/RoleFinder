/*!

=========================================================
* Material Kit PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim
* Edited by Aaron Su

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router";

import "assets/scss/material-kit-pro-react.scss?v=1.8.0";

// pages for this product
// import AboutUsPage from "views/AboutUsPage/AboutUsPage.js";
// import BlogPostPage from "views/BlogPostPage/BlogPostPage.js";
// import BlogPostsPage from "views/BlogPostsPage/BlogPostsPage.js";
// import ComponentsPage from "views/ComponentsPage/ComponentsPage.js";
// import ContactUsPage from "views/ContactUsPage/ContactUsPage.js";
// import EcommercePage from "views/EcommercePage/EcommercePage.js";
// import LandingPage from "views/LandingPage/LandingPage.js";
// import PresentationPage from "views/PresentationPage/PresentationPage.js";
// import PricingPage from "views/PricingPage/PricingPage.js";
// import ProfilePage from "views/ProfilePage/ProfilePage.js";
// import ProductPage from "views/ProductPage/ProductPage.js";
// import SectionsPage from "views/SectionsPage/SectionsPage.js";
// import ShoppingCartPage from "views/ShoppingCartPage/ShoppingCartPage.js";
// import SignupPage from "views/SignupPage/SignupPage.js";
import SearchPage from "views/SearchPage/SearchPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import ErrorPage from "views/ErrorPage/ErrorPage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {/* <Route path="/about-us" component={AboutUsPage} />
      <Route path="/blog-post" component={BlogPostPage} />
      <Route path="/blog-posts" component={BlogPostsPage} />
      <Route path="/components" component={ComponentsPage} />
      <Route path="/contact-us" component={ContactUsPage} />
      <Route path="/ecommerce-page" component={EcommercePage} />
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/product-page" component={ProductPage} />
      <Route path="/sections" component={SectionsPage} />
      <Route path="/shopping-cart-page" component={ShoppingCartPage} />
      <Route path="/signup-page" component={SignupPage} />
      <Route path="/presentation" component={PresentationPage} /> */}
      <Route path="/search" component={SearchPage} />
      <Route path="/login-page" component={LoginPage} />
      <Redirect exact from="/" to="/search" />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
