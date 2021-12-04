import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import { cookies } from './ConfWidget';

import { getZeldaSearch } from '../../containers/AllFetch';

var conf = {id: 3, nameWidget: 'zeldaSearch', stateWidget: "false"}

function writeJson(widgetId)
{
  cookies.set('widget'+widgetId, "false", { path: '/', sameSite: 'lax' });
  console.log(cookies.get('widget3'));
  console.log('ZeldaSearch');
  window.location.reload(false);
}

export default function ZeldaSearchCard() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => {
    writeJson(conf.id);
  };

  console.log("!!1");
  getZeldaSearch('Master Sword').then(res => {
    if (res.status === 200) {
      setName(res.data.name);
      setDescription(res.data.description);
    } else {
      console.log("Error unknown");
    }
  }).catch((err) => setImmediate(() => {
    console.log("Error unknown");
    }, 2000));

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://i.pinimg.com/originals/54/06/1c/54061cdc581d9b4b662dc19ef831e4cc.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Zelda Search Item
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {name}
            {description}
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