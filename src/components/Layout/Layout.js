import { Fragment } from "react";

import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation>{props.children}</MainNavigation>
    </Fragment>
  );
};

export default Layout;
