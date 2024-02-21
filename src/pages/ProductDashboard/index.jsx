import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { Pagination, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import AddRounded from '@mui/icons-material/AddRounded';

import CreateProduct from './components/CreateProduct';
import { getAllProduct } from './actions';

import classes from './style.module.scss';
import { selectProducts } from './selector';
import UpdateProduct from './components/UpdateProduct';
import DeleteProduct from './components/DeleteProduct';

const ProductDashboard = ({ products }) => {
  const [product, setProduct] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct({ limit, page: Number(page) - 1 }));
  }, [dispatch, page, limit]);

  const handleOpenCreate = () => {
    setIsCreateOpen(!isCreateOpen);
  };

  const handleOpenUpdate = () => {
    setIsUpdateOpen(!isUpdateOpen);
  };

  const handleOpenDelete = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  return (
    <div className={classes.layout}>
      <div className={classes.card}>
        <div className={classes.title}>Product Management</div>

        <div className={classes.button} onClick={handleOpenCreate}>
          <AddRounded sx={{ fontSize: 20 }} />
          Create
        </div>

        <CreateProduct
          isOpen={isCreateOpen}
          onClose={() => {
            setIsCreateOpen(false);
          }}
        />

        <Table sx={{ minWidth: 650, backgroundColor: 'var(--color-bg)' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.rows?.map((product, index) => (
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  <img src={product?.imageUrl} alt="product-image" className={classes.image} />
                </TableCell>
                <TableCell align="center">{product?.name}</TableCell>
                <TableCell align="center">Rp {product?.price}</TableCell>
                <TableCell align="center">
                  <div className={classes.action}>
                    <div
                      className={classes.edit}
                      onClick={() => {
                        setProduct(product);
                        handleOpenUpdate();
                      }}
                    >
                      <EditOutlined sx={{ fontSize: 18 }} />
                    </div>
                    <div
                      className={classes.delete}
                      onClick={() => {
                        setProduct(product);
                        handleOpenDelete();
                      }}
                    >
                      <DeleteOutline sx={{ fontSize: 18 }} />
                    </div>
                  </div>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className={classes.pagination}>
          <Pagination
            color="primary"
            count={Math.ceil(products?.count / limit)}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        </div>
      </div>
      <UpdateProduct
        product={product}
        isOpen={isUpdateOpen}
        onClose={() => {
          setIsUpdateOpen(false);
        }}
      />

      <DeleteProduct
        product={product}
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
        }}
      />
    </div>
  );
};

ProductDashboard.propTypes = {
  products: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  products: selectProducts,
});

export default connect(mapStateToProps)(ProductDashboard);
