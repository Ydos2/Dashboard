import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import { cookies } from './ConfWidget';

var conf = {id: 0, nameWidget: 'weather', stateWidget: "false"}

function writeJson(widgetId)
{
  cookies.set('widget'+widgetId, "false", { path: '/', sameSite: 'lax' });
  console.log(cookies.get('widget0'));
  console.log('Weather');
  window.location.reload(false);
}

export default function WeatherCard() {

  const handleClose = () => {
    writeJson(conf.id);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://images.ctfassets.net/l3l0sjr15nav/31xuMrYaowoRPV5WsQ5j7w/f9d3ab9cc615531c9c150e6e16704394/Fathers-Day-Blog-Banner-Smallpdf.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
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