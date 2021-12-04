import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import { cookies } from './ConfWidget';

import { getWeather } from '../../containers/AllFetch';

var conf = {id: 2, nameWidget: 'crypto', stateWidget: "false"}

function writeJson(widgetId)
{
  cookies.set('widget'+widgetId, "false", { path: '/', sameSite: 'lax' });
  console.log(cookies.get('widget0'));
  console.log('Weather');
  window.location.reload(false);
}

export default function CryptoCard() {
  const [currency, setCurrency] = useState([{}]);

  const handleClose = () => {
    writeJson(conf.id);
  };

  getWeather().then(res => {
    if (res.status === 200) {
      setCurrency(res.data.currency);
    } else {
      console.log("Error unknown");
    }
  }).catch((err) => setImmediate(() => {
    console.log("Error unknown");
    }, 2000));

  console.log(currency);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://img.daf-mag.fr/Img/BREVE/2019/5/339997/Les-crypto-monnaies-potentiel-pret-eclore-T.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {"Trending Crypto"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currency[0].name}
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