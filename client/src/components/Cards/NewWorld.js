import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

import { cookies } from './ConfWidget';

import { getNewWorld } from '../../containers/AllFetch';

var conf = {id: 5, nameWidget: 'newWorld', stateWidget: "false"}

function writeJson(widgetId)
{
  cookies.set('widget'+widgetId, "false", { path: '/', sameSite: 'lax' });
  console.log(cookies.get('widget5'));
  console.log('NewWorld');
  window.location.reload(false);
}

export default function NewWorldCard() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleClose = () => {
    writeJson(conf.id);
  };

  getNewWorld('Ashok Vatika').then(res => {
    if (res.status === 200) {
      setName(res.data.name);
      setStatus(res.data.status);
    } else {
      console.log("Error " + res.status);
    }
  }).catch((err) => setImmediate(() => {
    console.log("Error " + err);
    }, 2000));

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://images.ctfassets.net/j95d1p8hsuun/29peK2k7Ic6FsPAVjHWs8W/06d3add40b23b20bbff215f6979267e8/NW_OPENGRAPH_1200x630.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {"Server New World"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {'The server ' + name}
          {'Is actually ' + status}
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