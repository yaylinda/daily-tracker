import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  AppBar,
  Box,
  Button,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import theme, { colors } from "../theme";

const Home: NextPage = () => {
  /**
   * Header Componet
   */
  const renderHeader = () => {
    return (
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h3">Fives</Typography>
        </Toolbar>
      </AppBar>
    );
  };

  return <ThemeProvider theme={theme}>{renderHeader()}</ThemeProvider>;
};

export default Home;
