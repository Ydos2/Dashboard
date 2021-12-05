import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import { randomBytes } from 'crypto';

import { cookies } from './ConfWidget';

import { withRouter, useHistory, Redirect } from "react-router-dom";

import { getYtb, getYtbK, getRegisterYtb } from '../../containers/AllFetch';

var conf = {id: 7, nameWidget: 'youtube', stateWidget: "false"}

function writeJson(widgetId)
{
  cookies.set('widget'+widgetId, "false", { path: '/', sameSite: 'lax' });
  console.log(cookies.get('widget7'));
  console.log('Youtube');
  window.location.reload(false);
}

function loginYtb()
{
  var stateCrypto = randomBytes(20).toString('hex');
  
  let url = "https://accounts.google.com/o/oauth2/v2/auth?client_id=213049852255-7lr2e9v67g3ahhon6i072l2a2o4shgtj.apps.googleusercontent.com&redirect_uri=http://localhost:3000/app/dashboard&response_type=token&scope=https://www.googleapis.com/auth/youtube&state=" + stateCrypto;

  window.location.href = url;
  //cookies.set('apiKey', login, { path: '/', sameSite: 'lax' });
  //console.log(cookies.get('login'));

  const queryString = require('query-string');

  const parsed = queryString.parse(window.location.href);
  console.log(parsed);
  console.log(parsed.access_token);
  console.log("Bonjour ! C parsed");

  getRegisterYtb(parsed.access_token, cookies.get('login')).then(res => {
    if (res.status === 200) {
    } else {
      console.log("Error unknown");
    }
  }).catch((err) => setImmediate(() => {
    console.log("Error unknown");
    }, 2000));
}

export default function YoutubeCard(props) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleClose = () => {
    writeJson(conf.id);
  };

  
  //console.log(cookies.get('login'));
  /*getYtbK(stateCrypto, cookies.get('login')).then(res => {
    if (res.status === 200) {
    } else {
      console.log("Error unknown");
    }
  }).catch((err) => setImmediate(() => {
    console.log("Error unknown");
    }, 2000));*/

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://images.radio-canada.ca/q_auto,w_960/v1/ici-info/16x9/youtube-logo-2.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {"Youtube"}
          </Typography>
          <Button onClick={loginYtb}>Login to Youtube</Button>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClose}>
          Delete
        </Button>
      </CardActions>
  </Card>
  );
}