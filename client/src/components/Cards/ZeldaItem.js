import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

import { cookies } from './ConfWidget';

import { getZeldaItemRand } from '../../containers/AllFetch';

var conf = {id: 4, nameWidget: 'zeldaItem', stateWidget: "false"}

function writeJson(widgetId)
{
  cookies.set('widget'+widgetId, "false", { path: '/', sameSite: 'lax' });
  console.log(cookies.get('widget4'));
  console.log('ZeldaItem');
  window.location.reload(false);
}

export default function ZeldaItemCard() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => {
    writeJson(conf.id);
  };

  /*const [timeState, setTimeTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTimeTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);*/
  
  /*getZeldaItemRand('').then(res => {
    if (res.status === 200) {
      setName(res.data.name);
      setDescription(res.data.description);
    } else {
      console.log("Error unknown");
    }
  }).catch((err) => setImmediate(() => {
    console.log("Error unknown");
    }, 2000));*/

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://cdn02.nintendo-europe.com/media/images/10_share_images/portals_3/SI_Hub_Zelda_Portal.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Zelda Random Item
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {name}
          {description}
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