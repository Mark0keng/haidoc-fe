import { useState } from 'react';

import { Dialog } from '@mui/material';

import classes from './style.module.scss';

const CreateProduct = ({ isOpen, onClose }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [concern, setConcern] = useState('');
  const [packaging, setPackaging] = useState('');
  const [manufacture, setManufacture] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [preview, setPreview] = useState('');

  const handleUploadImage = (event) => {
    const image = event.target.files[0];
    setImageUrl(image);
    const imagePreview = URL.createObjectURL(image);
    setPreview(imagePreview);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <div className={classes.layout}>
        <div className={classes.title}>Create Product</div>

        <div className={classes.inputSection}>
          <div className={classes.formControl}>
            <div className={classes.imageBox}>
              {preview && (
                <div className={classes.previewBox}>
                  <img src={preview} alt="img-preview" className={classes.preview} />
                </div>
              )}

              <div className={classes.label}>Image Product</div>
              <input type="file" value={imageUrl} onChange={handleUploadImage} />
            </div>
          </div>
          <div className={classes.formControl}>
            <div className={classes.label}>Name</div>
            <input type="text" className={classes.input} />
          </div>

          <div className={classes.multiInput}>
            <div className={classes.formControl}>
              <div className={classes.label}>Price</div>
              <input type="text" className={classes.input} />
            </div>
            <div className={classes.formControl}>
              <div className={classes.label}>Category</div>
              <input type="text" className={classes.input} />
            </div>
          </div>

          <div className={classes.formControl}>
            <div className={classes.label}>Description</div>
            <textarea name="" id="" cols="30" rows="5" className={classes.input}></textarea>
          </div>
          <div className={classes.formControl}>
            <div className={classes.label}>Concern (optional)</div>
            <textarea name="" id="" cols="30" rows="5" className={classes.input}></textarea>
          </div>
          <div className={classes.formControl}>
            <div className={classes.label}>Consumption</div>
            <textarea name="" id="" cols="30" rows="5" className={classes.input}></textarea>
          </div>

          <div className={classes.multiInput}>
            <div className={classes.formControl}>
              <div className={classes.label}>Packaging</div>
              <input type="text" className={classes.input} />
            </div>
            <div className={classes.formControl}>
              <div className={classes.label}>Manufacture</div>
              <input type="text" className={classes.input} />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateProduct;
