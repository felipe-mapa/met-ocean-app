import React from "react";
import { Typography, Toolbar, AppBar } from "@material-ui/core";

import { Colors } from "../Layout/Colors";

const Header = () => {
  return (
    <AppBar
      position="relative"
      style={{ backgroundColor: "#fff", textAlign: "center" }}
    >
      <Toolbar
        style={{
          color: Colors.secondary,
          maxWidth: "900px",
          width: "90%",
          margin: "0 auto",
        }}
      >
        <Typography variant="h4" style={{ margin: "0 auto" }}>
          Welcome to <span style={{ color: Colors.primary }}>MetOcean App</span>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
