import React, { useState, Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { addImages, getProperty } from "../../../actions/propertyAction";
import { connect } from "react-redux";

const AddImages = ({
  addImages,
  history,
  match,
  getProperty,
  propertyState: { property, loading },
}) => {
  const [formData, setFormData] = useState({
    prop_id: "",
    image: "",
    // preview: null,
    buttonText: "Upload",
  });

  const { buttonText, prop_id, image } = formData;

  useEffect(() => {
    let prop_id = match.params.prop_id;

    if (prop_id) {
      setFormData({ ...formData, prop_id });
      //getProperty(prop_id);
    }
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    // if (e.target.files.length === 1) {
    // console.log(e.target.files[0]);

    setFormData({ ...formData, image: e.target.files[0] });
    //setImage(e.target.files[0]);
    //console.log(image);
    // } else {
    //   toast.error("Pick one image at a time please");
    // }

    //console.log(image);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let allowSubmit = true;
    if (allowSubmit) {
      addImages({ image, history, prop_id });

      setFormData({ ...formData, buttonText: "Uploading..." });
      allowSubmit = false;
    } else {
      return false;
    }
  };

  return (
    <Fragment>
      <div className="container my-5 shadow p-3 mb-5 bg-white rounded">
        <p>
          Upload Images for your property. Please upload jpeg, jpg or png.
          please upload and clear and qaulity image also upload one by one.
          /Multiple file will be updated later
        </p>

        <form onSubmit={onSubmit}>
          {/* <Form.Group> */}
          <input
            type="file"
            //ref={imageRef}
            name="image"
            //value={image}
            label="Upload image/s: "
            onChange={onChange}
            accept=".png,.jpg,.jpeg"
            required
          />

          <button
            type="submit"
            value="addImages"
            className="btn btn-primary btn-lg m-2"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

AddImages.propTypes = {
  addImages: PropTypes.func.isRequired,
  //getProperty: PropTypes.func.isRequired,
  //propertyState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

export default connect(mapStateToProps, { addImages, getProperty })(
  withRouter(AddImages)
);
