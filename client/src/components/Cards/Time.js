import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

import { cookies } from './ConfWidget';

import { getTime } from '../../containers/AllFetch';

var conf = {id: 1, nameWidget: 'time', stateWidget: "false"}

function writeJson(widgetId)
{
  cookies.set('widget'+widgetId, "false", { path: '/', sameSite: 'lax' });
  console.log(cookies.get('widget1'));
  console.log('time');
  window.location.reload(false);
}

export default function TimeCard() {
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleClose = () => {
    writeJson(conf.id);
  };

  const [timeState, setTimeTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTimeTime(
      getTime('Toulouse').then(res => {
      if (res.status === 200) {
        setCity(res.data.city);
        setRegion(res.data.region);
        setCountry(res.data.country);
        setDate(res.data.date);
        setTime(res.data.time);
      } else {
        console.log("Error " + res.status);
      }
    }).catch((err) => setImmediate(() => {
      console.log("Error " + err);
      }, 20000))
    ), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Card sx={{ maxWidth: 370 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://www.danalearningcenters.ca/wp-content/uploads/2021/08/large.png"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {time}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {country + ', ' + region + ', ' + city + ', ' + date}
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