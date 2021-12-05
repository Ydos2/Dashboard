import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

import { randomBytes } from 'crypto';

import { cookies } from './ConfWidget';

import { getYtbK, getYtb } from '../../containers/AllFetch';

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

  const queryString = require('query-string');

  const parsed = queryString.parse(window.location.href);
  console.log(parsed);
  console.log(parsed.access_token);
  console.log(cookies.get('login'));

  getYtbK(parsed.access_token, cookies.get('login')).then(res => {
    if (res.status === 200) {
      cookies.set('YoutubeOpen', "true", { path: '/', sameSite: 'lax' });
    } else {
      console.log(res.status);
      console.log("Error unknown");
    }
  }).catch((err) => setImmediate(() => {
    console.log("Error unknown");
    console.log(err);
  }, 2000));
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </Box>
  );
}

export default function YoutubeCard(props) {
  const [currency, setCurrency] = useState([{}]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);

  const [timeState, setTimeTime] = useState(Date.now());

  if (cookies.get('YoutubeOpen') === "true")
    getYtb(cookies.get('login')).then(res => {
      if (res.status === 200) {
          setCurrency(res.data.jsonpush.subs);
          console.log(res.data.jsonpush.subs);
          console.log(cookies.get('login'));
      } else if (res.status === 401) {
          cookies.set('YoutubeOpen', "false", { path: '/', sameSite: 'lax' });
          console.log("Not valid token");
      } else {
          console.log("Error " + res.status);
          cookies.set('YoutubeOpen', "false", { path: '/', sameSite: 'lax' });
      }
      console.log(':::::::::::::::');
    }).catch((err) => setImmediate(() => {
      console.log("Error " + err);
      cookies.set('YoutubeOpen', "false", { path: '/', sameSite: 'lax' });
    }, 2000));
  console.log(cookies.get('YoutubeOpen'));
  /*{
      const interval = setInterval(() => setTimeTime(
        
        ), 100000);
      return () => {
        clearInterval(interval);
      };
     }}, []);*/


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - currency.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClose = () => {
    writeJson(conf.id);
  };

  return (
    <Card sx={{ maxWidth: 370 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://images.radio-canada.ca/q_auto,w_960/v1/ici-info/16x9/youtube-logo-2.jpg"
        alt="green iguana"
      />
      {(cookies.get('YoutubeOpen') === "true" ?
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 370 }} aria-label="customized table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? currency.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : currency
              ).map((row, pos) => (
                <CardContent key={pos} sx={{ maxWidth: 370 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {row.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {row.description}
                  </Typography>
                </CardContent>
              ))}
            </TableBody>
            <TableFooter>
                <Button size="medium" color="primary" onClick={handleClose} sx={{ flexShrink: 0, ml: 2.5 }}>
                  Delete
                </Button>
                <TablePagination
                  rowsPerPageOptions={[ { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={currency.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
            </TableFooter>
          </Table>
        </TableContainer>
      </> : 
      <>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {"Youtube"}
          </Typography>
          <Button onClick={loginYtb}>Login to Youtube</Button>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClose}>
            Delete
          </Button>
        </CardActions>
      </>)}
  </Card>
  );
}