import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

import { cookies } from './ConfWidget';

import { getRandomJoke } from '../../containers/AllFetch';

var conf = {id: 6, nameWidget: 'joke', stateWidget: "false"}

function writeJson(widgetId)
{
  cookies.set('widget'+widgetId, "false", { path: '/', sameSite: 'lax' });
  console.log(cookies.get('widget6'));
  console.log('Joke');
  window.location.reload(false);
}

export default function JokeCard() {
  const [setup, setSetup] = useState("");
  const [punchline, setPunchline] = useState("");

  const handleClose = () => {
    writeJson(conf.id);
  };

  const [timeState, setTimeTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTimeTime(
      getRandomJoke().then(res => {
      if (res.status === 200) {
        setSetup(res.data.setup);
        setPunchline(res.data.punchline);
      } else {
        console.log("Error " + res.status);
      }
    }).catch((err) => setImmediate(() => {
      console.log("Error " + err);
      }, 2000))
    ), 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Card sx={{ maxWidth: 370 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://images.ctfassets.net/l3l0sjr15nav/31xuMrYaowoRPV5WsQ5j7w/f9d3ab9cc615531c9c150e6e16704394/Fathers-Day-Blog-Banner-Smallpdf.png"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Random Joke
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {setup}
          {punchline}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClose}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}