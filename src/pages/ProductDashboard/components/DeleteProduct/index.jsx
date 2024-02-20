import { useDispatch } from 'react-redux';

import { Dialog } from '@mui/material';

import classes from './style.module.scss';
import { deleteProduct } from '@pages/ProductDashboard/actions';

const DeleteProduct = ({ product, isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(
      deleteProduct(product?.id, () => {
        onClose();
      })
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <div className={classes.layout}>
        <div className={classes.title}>Delete Product</div>

        <div className={classes.desc}>This action will delete this data, are you sure?</div>
        <div className={classes.button} onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteProduct;
