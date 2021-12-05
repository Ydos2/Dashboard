import React, { useState, setState } from "react";
import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";

import WeatherCard from "../../components/Cards/Weather";
import TimeCard from "../../components/Cards/Time";
import CryptoCard from "../../components/Cards/Crypto";
import ZeldaSearchCard from "../../components/Cards/ZeldaSearch";
import ZeldaItemCard from "../../components/Cards/ZeldaItem";
import NewWorldCard from "../../components/Cards/NewWorld";
import JokeCard from "../../components/Cards/Joke";
import YoutubeCard from "../../components/Cards/Youtube";

import { widgetConf, cookies } from "../../components/Cards/ConfWidget";

import Grid from '@mui/material/Grid';

export function reloadPage()
{
  window.location.reload(false);
}

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  widgetConf.map((obj) =>
    (obj.id === 0) ? obj.stateWidget = cookies.get('widget0') :
    (obj.id === 1) ? obj.stateWidget = cookies.get('widget1') :
    (obj.id === 2) ? obj.stateWidget = cookies.get('widget2') :
    (obj.id === 3) ? obj.stateWidget = cookies.get('widget3') :
    (obj.id === 4) ? obj.stateWidget = cookies.get('widget4') :
    (obj.id === 5) ? obj.stateWidget = cookies.get('widget5') :
    (obj.id === 6) ? obj.stateWidget = cookies.get('widget6') :
    (obj.id === 7) ? obj.stateWidget = cookies.get('widget7') : null
  );
  console.log(widgetConf);

  return (
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid item xs={3}>
      {widgetConf.map((widgetObj, pos) => (
          widgetObj.stateWidget === "true" ?
        (widgetObj.id === 0) ? <WeatherCard key={pos}></WeatherCard> : null
        : null))}
    </Grid>
    <Grid item xs={3}>
      {widgetConf.map((widgetObj, pos) => (
          widgetObj.stateWidget === "true" ?
        (widgetObj.id === 1) ? <TimeCard key={pos}></TimeCard> : null
        : null))}
    </Grid>
    <Grid item xs={3}>
      {widgetConf.map((widgetObj, pos) => (
          widgetObj.stateWidget === "true" ?
        (widgetObj.id === 2) ? <CryptoCard key={pos}></CryptoCard> : null
        : null))}
    </Grid>
    <Grid item xs={3}>
      {widgetConf.map((widgetObj, pos) => (
          widgetObj.stateWidget === "true" ?
        (widgetObj.id === 3) ? <ZeldaSearchCard key={pos}></ZeldaSearchCard> : null
        : null))}
    </Grid>
    <Grid item xs={3}>
      {widgetConf.map((widgetObj, pos) => (
          widgetObj.stateWidget === "true" ?
        (widgetObj.id === 4) ? <ZeldaItemCard key={pos}></ZeldaItemCard> : null
        : null))}
    </Grid>
    <Grid item xs={3}>
      {widgetConf.map((widgetObj, pos) => (
          widgetObj.stateWidget === "true" ?
        (widgetObj.id === 5) ? <NewWorldCard key={pos}></NewWorldCard> : null
        : null))}
    </Grid>
    <Grid item xs={3}>
      {widgetConf.map((widgetObj, pos) => (
          widgetObj.stateWidget === "true" ?
        (widgetObj.id === 6) ? <JokeCard key={pos}></JokeCard> : null
      : null))}
    </Grid>
    <Grid item xs={3}>
      {widgetConf.map((widgetObj, pos) => (
          widgetObj.stateWidget === "true" ?
        (widgetObj.id === 7) ? <YoutubeCard key={pos}></YoutubeCard> : null
      : null))}
    </Grid>
  </Grid>
  );
}
