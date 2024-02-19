import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import classes from './style.module.scss';
import AddRounded from '@mui/icons-material/AddRounded';
import { DeleteOutline, DeleteOutlineRounded, EditOutlined } from '@mui/icons-material';

const ProductDashboard = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.card}>
        <div className={classes.title}>Product Management</div>

        <div className={classes.button}>
          <AddRounded />
          Create
        </div>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">
                <div className={classes.action}>
                  <div className={classes.edit}>
                    <EditOutlined sx={{ fontSize: 18 }} color="inherit" />
                  </div>
                  <div className={classes.delete}>
                    <DeleteOutline sx={{ fontSize: 18 }} />
                  </div>
                </div>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductDashboard;
