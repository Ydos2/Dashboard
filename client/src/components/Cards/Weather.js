import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

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
      console.log("Error " + res.status);
    }
  }).catch((err) => setImmediate(() => {
    console.log("Error " + err);
    }, 2000));

  return (
    <Card sx={{ maxWidth: 345, display: 'flex' }} key={ 0 }>
      <CardMedia
        component="img"
        sx={{ width: 300 }}
        image={img}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {'Currently it is ' + temperature + ' degree with feels like of ' + feelslike + ' degree.'}
            {'Humidity ' + humidity + '%'}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <CardActions>
            <Button size="small" color="primary" onClick={handleClose}>
              Delete
            </Button>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
}