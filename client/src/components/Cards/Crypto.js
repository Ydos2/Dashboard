import { useState } from 'react';
import Card from '@mui/material/Card';
import { styled, useTheme } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Button, CardActions } from '@mui/material';

import { cookies } from './ConfWidget';

import { getCrypto } from '../../containers/AllFetch';

var conf = {id: 2, nameWidget: 'crypto', stateWidget: "false"}

function writeJson(widgetId)
{
  cookies.set('widget'+widgetId, "false", { path: '/', sameSite: 'lax' });
  console.log(cookies.get('widget0'));
  console.log('Crypto');
  window.location.reload(false);
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

export default function CryptoCard() {
  const [currency, setCurrency] = useState([{}]);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

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

  getCrypto().then(res => {
    if (res.status === 200) {
      setCurrency(res.data.currency);
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
        image="https://img.daf-mag.fr/Img/BREVE/2019/5/339997/Les-crypto-monnaies-potentiel-pret-eclore-T.jpg"
        alt="green iguana"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 345 }} aria-label="customized table">
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
              <StyledTableRow key={pos} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
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
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Card>
  );
}