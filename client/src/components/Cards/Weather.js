import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import { cookies } from './ConfWidget';

import { getWeather } from '../../containers/AllFetch';

var conf = {id: 0, nameWidget: 'weather', stateWidget: "false"}

function writeJson(widgetId)
{
  cookies.set('widget'+widgetId, "false", { path: '/', sameSite: 'lax' });
  console.log(cookies.get('widget0'));
  console.log('Weather');
  window.location.reload(false);
}

export default function WeatherCard() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [temperature, setTemperature] = useState("");
  const [feelslike, setFeelslike] = useState("");
  const [humidity, setHumidity] = useState("");

  const handleClose = () => {
    writeJson(conf.id);
  };

  getWeather('Toulouse').then(res => {
    if (res.status === 200) {
      setTitle(res.data.weather);
      setImg(res.data.icon);
      setTemperature(res.data.temperature);
      setFeelslike(res.data.feelslike);
      setHumidity(res.data.humidity);
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
          image={img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {'Currently it is ' + temperature + ' degree with feels like of ' + feelslike + ' degree.'}
            {'Humidity ' + humidity + '%'}
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