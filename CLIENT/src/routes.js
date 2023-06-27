/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/Profile.js";
import Register from "views/Register.js";
import Login from "views/Login.js";
import Tickets from "views/Tickets";
import Administration from "views/Administration";
import Project from "views/Project";

var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "auth",
    root: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "auth",
    root: "/auth",
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "general",
    root: "/general",
    display: true,
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: "ni ni-single-copy-04 text-teal",
    component: Tickets,
    layout: "general",
    root: "/general",
    display: true,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "general",
    root: "/general",
    display: true,
  },
  /* {
    path: "/user-profile",
    name: "User Profile",
    icon: "fas fa-users text-green",
    component: Profile,
    layout: "general",
    root: "/general",
    display: true,
  }, */
  /* {
    path: "/project/:id",
    name: "Project",
    icon: "ni ni-archive-2 text-orange",
    component: Project,
    layout: "general",
    root: "/general",
    display: false,
  }, */
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "admin",
    root: "/admin",
    display: true,
  },
  {
    path: "/administration",
    name: "Administration",
    icon: "ni ni-collection text-red",
    component: Administration,
    layout: "admin",
    root: "/admin",
    display: true,
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: "ni ni-single-copy-04 text-teal",
    component: Tickets,
    layout: "admin",
    root: "/admin",
    display: true,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "admin",
    root: "/admin",
    display: true,
  },
  /* {
    path: "/user-profile",
    name: "User Profile",
    icon: "fas fa-users text-green",
    component: Profile,
    layout: "admin",
    root: "/admin",
    display: true,
  }, */
  {
    path: "/project/:id",
    name: "Project",
    icon: "ni ni-archive-2 text-orange",
    component: Project,
    layout: "admin",
    root: "/admin",
    display: false,
  },
];
export default routes;
