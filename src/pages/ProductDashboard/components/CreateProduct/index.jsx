import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Dialog } from '@mui/material';

import { createProduct, getAllProduct } from '@pages/ProductDashboard/actions';

import classes from './style.module.scss';

const CreateProduct = ({ isOpen, onClose }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [concern, setConcern] = useState('');
  const [consumption, setConsumption] = useState('');
  const [packaging, setPackaging] = useState('');
  const [manufacture, setManufacture] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setPreview('');
    setImageUrl('');
    setName('');
    setPrice('');
    setDescription('');
    setConcern('');
    setConsumption('');
    setPackaging('');
    setManufacture('');
    setError('');
  }, [onClose]);

  const handleUploadImage = (event) => {
    const image = event.target.files[0];
    setImageUrl(image);
    const imagePreview = URL.createObjectURL(image);
    setPreview(imagePreview);
  };

  const handleSubmit = () => {
    const payload = {
      imageUrl,
      name,
      price,
      description,
      concern,
      consumption,
      packaging,
      manufacture,
      categoryId: Number(categoryId),
    };
    dispatch(
      createProduct(
        payload,
        () => {
          dispatch(getAllProduct({ limit: 3, page: 0 }));
          onClose();
        },
        (err) => {
          setError(err.message);
        }
      )
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <div className={classes.layout}>
        <div className={classes.title}>Create Product</div>

        {error && <div className={classes.error}>{error}</div>}

        <div className={classes.inputSection}>
          <div className={classes.formControl}>
            <div className={classes.imageBox}>
              {preview && (
                <div className={classes.previewBox}>
                  <img src={preview} alt="img-preview" className={classes.preview} />
                </div>
              )}

              <div className={classes.label}>Image Product</div>
              <input type="file" onChange={handleUploadImage} />
            </div>
          </div>
          <div className={classes.formControl}>
            <div className={classes.label}>Name</div>
            <input
              type="text"
              className={classes.input}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className={classes.multiInput}>
            <div className={classes.formControl}>
              <div className={classes.label}>Price</div>
              <input
                type="text"
                className={classes.input}
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className={classes.formControl}>
              <div className={classes.label}>Category</div>
              {/* <input type="text" className={classes.input} /> */}
              <select
                className={classes.input}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                }}
              >
                <option value="1">Obat</option>
                <option value="2">Peralatan Kesehatan</option>
              </select>
            </div>
          </div>

          <div className={classes.formControl}>
            <div className={classes.label}>Description</div>
            <textarea
              rows="5"
              className={classes.input}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <div className={classes.formControl}>
            <div className={classes.label}>Concern (optional)</div>
            <textarea
              className={classes.input}
              value={concern}
              onChange={(e) => {
                setConcern(e.target.value);
              }}
            ></textarea>
          </div>
          <div className={classes.formControl}>
            <div className={classes.label}>Consumption</div>
            <textarea
              rows="5"
              className={classes.input}
              value={consumption}
              onChange={(e) => {
                setConsumption(e.target.value);
              }}
            ></textarea>
          </div>

          <div className={classes.multiInput}>
            <div className={classes.formControl}>
              <div className={classes.label}>Packaging</div>
              <input
                type="text"
                className={classes.input}
                value={packaging}
                onChange={(e) => {
                  setPackaging(e.target.value);
                }}
              />
            </div>
            <div className={classes.formControl}>
              <div className={classes.label}>Manufacture</div>
              <input
                type="text"
                className={classes.input}
                value={manufacture}
                onChange={(e) => {
                  setManufacture(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className={classes.button} onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </Dialog>
  );
};

export default connect()(CreateProduct);
