import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

import LogoLight from "@/assets/images/logo-light.png";
import LogoDark from "@/assets/images/logo-dark.png";
import { FiUser } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import { Button, Dropdown, MenuProps } from "antd";

export default function Navbar(props: any) {
  const { navClass, topnavClass } = props;
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const [toggle, setToggle] = useState(false);
  const [manu, setManu] = useState("");
  const [subManu, setSubManu] = useState("");
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const current = location.pathname;
    setManu(current);
    setSubManu(current);

    const windowScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", windowScroll);

    return () => {
      window.removeEventListener("scroll", windowScroll);
    };
  }, [location.pathname]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button
          type="primary"
          danger
          onClick={() => {
            logout();
          }}
        >
          Sign Out
        </Button>
      ),
    },
  ];

  return (
    <React.Fragment>
      <nav
        id="topnav"
        className={`defaultscroll is-sticky ${scroll ? "nav-sticky" : ""} ${
          topnavClass ? topnavClass : ""
        }`}
      >
        <div
          className={`${
            topnavClass !== "" && topnavClass !== undefined
              ? "container-fluid md:px-8 px-3"
              : "container"
          }`}
        >
          {/* <!-- Logo container--> */}
          {navClass === "" || navClass === undefined ? (
            <Link className="logo" to="/">
              <img src={LogoDark} className="inline-block dark:hidden" alt="" />
              <img
                src={LogoLight}
                className="hidden dark:inline-block"
                alt=""
              />
            </Link>
          ) : (
            <Link className="logo" to="#">
              <span className="inline-block dark:hidden">
                {/* <img src={LogoDark} className="l-dark" height="24" alt="" />
                //TODO: Add logo here later
                <img src={LogoLight} className="l-light" height="24" alt="" /> */}
                <h6 className={scroll ? "text-black" : "text-white"}>
                  Trustland
                </h6>
              </span>
              <img
                src={LogoLight}
                height="24"
                className="hidden dark:inline-block"
                alt=""
              />
            </Link>
          )}
          {/* <!-- End Logo container--> */}

          {/* <!-- Start Mobile Toggle --> */}
          <div className="menu-extras">
            <div className="menu-item">
              <Link
                to="#"
                className={`${toggle ? "open" : ""} navbar-toggle`}
                id="isToggle"
                onClick={() => setToggle(!toggle)}
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Link>
            </div>
          </div>
          {/* <!-- End Mobile Toggle --> */}

          {/* <!-- Login button Start --> */}
          <ul className="buy-button list-none mb-0">
            {isAuthenticated && (
              <li className="inline mb-0">
                <Dropdown menu={{ items }} placement="bottomRight" arrow>
                  <Link
                    to="/auth-login"
                    className="btn btn-icon bg-green-600 hover:bg-green-700 border-green-600 dark:border-green-600 text-white rounded-full"
                  >
                    <FiUser className="h-4 w-4 stroke-[3]" />
                  </Link>
                </Dropdown>
              </li>
            )}

            {!isAuthenticated && (
              <>
                <li className="sm:inline ps-1 mb-0 hidden">
                  <Link
                    to="/account/login"
                    className="btn bg-green-600 hover:bg-green-700 border-green-600 dark:border-green-600 text-white rounded-full"
                  >
                    Log In
                  </Link>
                </li>
              </>
            )}
          </ul>
          {/* <!--Login button End--> */}

          <div id="navigation" style={{ display: toggle ? "block" : "none" }}>
            {/* <!-- Navigation Menu--> */}
            <ul
              className={`navigation-menu  ${
                navClass === "" || navClass === undefined ? "" : "nav-light"
              }   ${
                topnavClass !== "" && topnavClass !== undefined
                  ? "justify-center"
                  : "justify-end"
              }`}
            >
              <li
                className={`has-submenu parent-menu-item ${
                  [
                    "/",
                    "/index",
                    "/index-two",
                    "/index-three",
                    "/index-four",
                    "/index-five",
                    "/index-six",
                    "/index-seven",
                  ].includes(manu)
                    ? "active"
                    : ""
                }`}
              >
                <Link
                  to="#"
                  onClick={(e) => {
                    setSubManu(subManu === "/index-item" ? "" : "/index-item");
                  }}
                >
                  Home
                </Link>
                <span className="menu-arrow"></span>
                <ul
                  className={`submenu ${
                    [
                      "/index",
                      "/index-two",
                      "/index-three",
                      "/index-four",
                      "/index-five",
                      "/index-six",
                      "/index-seven",
                      "/index-item",
                    ].includes(subManu)
                      ? "open"
                      : ""
                  }`}
                >
                  <li className={manu === "/index" ? "active" : ""}>
                    <Link to="/index" className="sub-menu-item">
                      Hero One
                    </Link>
                  </li>
                  <li className={manu === "/index-two" ? "active" : ""}>
                    <Link to="/index-two" className="sub-menu-item">
                      Hero Two
                    </Link>
                  </li>
                  <li className={manu === "/index-three" ? "active" : ""}>
                    <Link to="/index-three" className="sub-menu-item">
                      Hero Three
                    </Link>
                  </li>
                  <li className={manu === "/index-four" ? "active" : ""}>
                    <Link to="/index-four" className="sub-menu-item">
                      Hero Four
                    </Link>
                  </li>
                  <li className={manu === "/index-five" ? "active" : ""}>
                    <Link to="/index-five" className="sub-menu-item">
                      Hero Five{" "}
                    </Link>
                  </li>
                  <li className={manu === "/index-six" ? "active" : ""}>
                    <Link to="/index-six" className="sub-menu-item">
                      Hero Six{" "}
                    </Link>
                  </li>
                  <li className={manu === "/index-seven" ? "active" : ""}>
                    <Link to="/index-seven" className="sub-menu-item">
                      Hero Seven{" "}
                      <span className="bg-yellow-500 inline-block text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ms-1">
                        New
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className={manu === "/buy" ? "active" : ""}>
                <NavLink
                  to="/buy"
                  //TODO: Check here
                  // activeclassname="active"s
                  className="sub-menu-item"
                >
                  Buy
                </NavLink>
              </li>

              <li className={manu === "/sell" ? "active" : ""}>
                <Link to="/sell" className="sub-menu-item">
                  Sell
                </Link>
              </li>

              <li
                className={`has-submenu parent-parent-menu-item ${
                  [
                    "/grid",
                    "/grid-sidebar",
                    "/grid-map",
                    "/list",
                    "/list-sidebar",
                    "/list-map",
                    "/property-detail/1",
                  ].includes(manu)
                    ? "active"
                    : ""
                }`}
              >
                <Link
                  to="#"
                  onClick={() => {
                    setSubManu(subManu === "/list-item" ? "" : "/list-item");
                  }}
                >
                  Listing
                </Link>
                <span className="menu-arrow"></span>
                <ul
                  className={`submenu ${
                    [
                      "/grid",
                      "/grid-sidebar",
                      "/grid-map",
                      "/list",
                      "/list-sidebar",
                      "/list-map",
                      "/property-detail/1",
                      "/list-item",
                      "/grid-item",
                      "/list-view-item",
                      "/property-item",
                    ].includes(subManu)
                      ? "open"
                      : ""
                  }`}
                >
                  <li
                    className={`has-submenu parent-menu-item ${
                      ["/grid", "/grid-sidebar", "/grid-map"].includes(manu)
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      to="#"
                      onClick={() => {
                        setSubManu(
                          subManu === "/grid-item" ? "" : "/grid-item"
                        );
                      }}
                    >
                      {" "}
                      Grid View{" "}
                    </Link>
                    <span className="submenu-arrow"></span>
                    <ul
                      className={`submenu ${
                        [
                          "/grid",
                          "/grid-sidebar",
                          "/grid-map",
                          "/grid-item",
                        ].includes(subManu)
                          ? "open"
                          : ""
                      }`}
                    >
                      <li className={manu === "/grid" ? "active" : ""}>
                        <Link to="/grid" className="sub-menu-item">
                          Grid Listing
                        </Link>
                      </li>
                      <li className={manu === "/grid-sidebar" ? "active" : ""}>
                        <Link to="/grid-sidebar" className="sub-menu-item">
                          Grid Sidebar{" "}
                        </Link>
                      </li>
                      <li className={manu === "/grid-map" ? "active" : ""}>
                        <Link to="/grid-map" className="sub-menu-item">
                          Grid With Map
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`has-submenu parent-menu-item ${
                      ["/list", "/list-sidebar", "/list-map"].includes(manu)
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      to="#"
                      onClick={() => {
                        setSubManu(
                          subManu === "/list-view-item" ? "" : "/list-view-item"
                        );
                      }}
                    >
                      {" "}
                      List View{" "}
                    </Link>
                    <span className="submenu-arrow"></span>
                    <ul
                      className={`submenu ${
                        [
                          "/list",
                          "/list-sidebar",
                          "/list-map",
                          "/list-view-item",
                        ].includes(subManu)
                          ? "open"
                          : ""
                      }`}
                    >
                      <li className={manu === "/list" ? "active" : ""}>
                        <Link to="/list" className="sub-menu-item">
                          List Listing
                        </Link>
                      </li>
                      <li className={manu === "/list-sidebar" ? "active" : ""}>
                        <Link to="/list-sidebar" className="sub-menu-item">
                          List Sidebar{" "}
                        </Link>
                      </li>
                      <li className={manu === "/list-map" ? "active" : ""}>
                        <Link to="/list-map" className="sub-menu-item">
                          List With Map
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`has-submenu parent-menu-item ${
                      ["/property-detail/1"].includes(manu) ? "active" : ""
                    }`}
                  >
                    <Link
                      to="#"
                      onClick={() => {
                        setSubManu(
                          subManu === "/property-item" ? "" : "/property-item"
                        );
                      }}
                    >
                      {" "}
                      Property Detail{" "}
                    </Link>
                    <span className="submenu-arrow"></span>
                    <ul
                      className={`submenu ${
                        ["/property-detail/1", "/property-item"].includes(
                          subManu
                        )
                          ? "open"
                          : ""
                      }`}
                    >
                      <li
                        className={
                          manu === "/property-detail/1" ? "active" : ""
                        }
                      >
                        <Link to="/property-detail/1" className="sub-menu-item">
                          Property Detail
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li
                className={`has-submenu parent-parent-menu-item ${
                  [
                    "/aboutus",
                    "/features",
                    "/pricing",
                    "/faqs",
                    "/auth-login",
                    "/auth-signup",
                    "/auth-reset-password",
                    "/terms",
                    "/privacy",
                    "/blogs",
                    "/blog-sidebar",
                    "/blog-detail",
                    "/comingsoon",
                    "/maintenance",
                    "/404",
                  ].includes(manu)
                    ? "active"
                    : ""
                }`}
              >
                <Link
                  to="#"
                  onClick={() => {
                    setSubManu(subManu === "/page-item" ? "" : "/page-item");
                  }}
                >
                  Pages
                </Link>
                <span className="menu-arrow"></span>
                <ul
                  className={`submenu ${
                    [
                      "/aboutus",
                      "/features",
                      "/pricing",
                      "/faqs",
                      "/auth-login",
                      "/auth-signup",
                      "/auth-reset-password",
                      "/terms",
                      "/privacy",
                      "/blogs",
                      "/blog-sidebar",
                      "/blog-detail",
                      "/comingsoon",
                      "/maintenance",
                      "/404",
                      "/page-item",
                      "/auth-item",
                      "/term-item",
                      "/blog-item",
                      "/special-item",
                    ].includes(subManu)
                      ? "open"
                      : ""
                  }`}
                >
                  <li className={manu === "/aboutus" ? "active" : ""}>
                    <Link to="/aboutus" className="sub-menu-item">
                      About Us
                    </Link>
                  </li>
                  <li className={manu === "/features" ? "active" : ""}>
                    <Link to="/features" className="sub-menu-item">
                      Featues
                    </Link>
                  </li>
                  <li className={manu === "/pricing" ? "active" : ""}>
                    <Link to="/pricing" className="sub-menu-item">
                      Pricing
                    </Link>
                  </li>
                  <li className={manu === "/faqs" ? "active" : ""}>
                    <Link to="/faqs" className="sub-menu-item">
                      Faqs
                    </Link>
                  </li>
                  <li
                    className={`has-submenu parent-menu-item ${
                      [
                        "/auth-login",
                        "/auth-signup",
                        "/auth-reset-password",
                      ].includes(manu)
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      to="#"
                      onClick={() => {
                        setSubManu(
                          subManu === "/auth-item" ? "" : "/auth-item"
                        );
                      }}
                    >
                      {" "}
                      Auth Pages{" "}
                    </Link>
                    <span className="submenu-arrow"></span>
                    <ul
                      className={`submenu ${
                        [
                          "/auth-login",
                          "/auth-signup",
                          "/auth-reset-password",
                          "/auth-item",
                        ].includes(subManu)
                          ? "open"
                          : ""
                      }`}
                    >
                      <li className={manu === "/auth-login" ? "active" : ""}>
                        <Link to="/auth-login" className="sub-menu-item">
                          Login
                        </Link>
                      </li>
                      <li className={manu === "/auth-signup" ? "active" : ""}>
                        <Link to="/auth-signup" className="sub-menu-item">
                          Signup
                        </Link>
                      </li>
                      <li
                        className={
                          manu === "/auth-reset-password" ? "active" : ""
                        }
                      >
                        <Link
                          to="/auth-reset-password"
                          className="sub-menu-item"
                        >
                          Reset Password
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`has-submenu parent-menu-item ${
                      ["/terms", "/privacy"].includes(manu) ? "active" : ""
                    }`}
                  >
                    <Link
                      to="#"
                      onClick={() => {
                        setSubManu(
                          subManu === "/term-item" ? "" : "/term-item"
                        );
                      }}
                    >
                      {" "}
                      Utility{" "}
                    </Link>
                    <span className="submenu-arrow"></span>
                    <ul
                      className={`submenu ${
                        ["/terms", "/privacy", "/term-item"].includes(subManu)
                          ? "open"
                          : ""
                      }`}
                    >
                      <li className={manu === "/terms" ? "active" : ""}>
                        <Link to="/terms" className="sub-menu-item">
                          Terms of Services
                        </Link>
                      </li>
                      <li className={manu === "/privacy" ? "active" : ""}>
                        <Link to="/privacy" className="sub-menu-item">
                          Privacy Policy
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`has-submenu parent-menu-item ${
                      ["/blogs", "/blog-sidebar", "/blog-detail"].includes(manu)
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      to="#"
                      onClick={() => {
                        setSubManu(
                          subManu === "/blog-item" ? "" : "/blog-item"
                        );
                      }}
                    >
                      {" "}
                      Blog{" "}
                    </Link>
                    <span className="submenu-arrow"></span>
                    <ul
                      className={`submenu ${
                        [
                          "/blogs",
                          "/blog-sidebar",
                          "/blog-detail",
                          "/blog-item",
                        ].includes(subManu)
                          ? "open"
                          : ""
                      }`}
                    >
                      <li className={manu === "/blogs" ? "active" : ""}>
                        <Link to="/blogs" className="sub-menu-item">
                          {" "}
                          Blogs
                        </Link>
                      </li>
                      <li className={manu === "/blog-sidebar" ? "active" : ""}>
                        <Link to="/blog-sidebar" className="sub-menu-item">
                          {" "}
                          Blog Sidebar
                        </Link>
                      </li>
                      <li className={manu === "/blog-detail" ? "active" : ""}>
                        <Link to="/blog-detail" className="sub-menu-item">
                          {" "}
                          Blog Detail
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`has-submenu parent-menu-item ${
                      ["/comingsoon", "/maintenance", "/404"].includes(manu)
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      to="#"
                      onClick={() => {
                        setSubManu(
                          subManu === "/special-item" ? "" : "/special-item"
                        );
                      }}
                    >
                      {" "}
                      Special{" "}
                    </Link>
                    <span className="submenu-arrow"></span>
                    <ul
                      className={`submenu ${
                        [
                          "/comingsoon",
                          "/maintenance",
                          "/404",
                          "/special-item",
                        ].includes(subManu)
                          ? "open"
                          : ""
                      }`}
                    >
                      <li className={manu === "/comingsoon" ? "active" : ""}>
                        <Link to="/comingsoon" className="sub-menu-item">
                          Comingsoon
                        </Link>
                      </li>
                      <li className={manu === "/maintenance" ? "active" : ""}>
                        <Link to="/maintenance" className="sub-menu-item">
                          Maintenance
                        </Link>
                      </li>
                      <li className={manu === "/404" ? "active" : ""}>
                        <Link to="/404" className="sub-menu-item">
                          404! Error
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className={manu === "/contact" ? "active" : ""}>
                <Link to="/contact" className="sub-menu-item">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* End Navbar  */}
    </React.Fragment>
  );
}
