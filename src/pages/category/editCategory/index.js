import React, { useEffect, useState } from "react";
import { editStyle } from "./style";
import * as Yup from "yup";
import { materialCommonStyles } from "../../../utils/materialCommonStyles";
import {
  Link,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { useNavigate, useParams, Navigate } from "react-router-dom";
// import categoryService from "../../../service/category/category.service";
import { StatusCode } from "../../../utils/constant";
import { Formik } from "formik";
import ValidationErrorMessage from "../../../containers/ValidationErrorMessage/ValidationErrorMessage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, editCategory } from "../../../redux/action/category.action";

const EditCategory = () => {
  const auth = useSelector(state => state.auth)
  const categories = useSelector(state => state.categories.categories)
  const dispatch = useDispatch()
  const [roles, setRoles] = useState([]);
  const classes = editStyle();
  const materialClasses = materialCommonStyles();
  const history = useNavigate();
  const initialValues = {
    id: 0,
    name: "",
  };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    if (id) getCategoryById();
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
  });

  const getCategoryById = () => {
    categories.map(row => {
      if (row._id === id) {
        setInitialValueState(row)
      }
    })
  };

  const onSubmit = (values) => {
    // categoryService.save(values).then((res) => {
    //   if (res && res.code === StatusCode.Success) {
    //     toast.success(res.message);
    //   } 
    // });
    if (id) {
      dispatch(editCategory({ _id: id, name: values.name }))
    }
    else {
      dispatch(addCategory({ name: values.name }))
    }
        history("/category");
  };
  if (!auth.authenticated) {
    return <Navigate to={'/login'} />
  }
  return (
    <div className={classes.editWrapper}>
      <div className="container">
        <Typography variant="h1">{id ? "Edit" : "Add"} Category</Typography>
        <Formik
          initialValues={initialValueState}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row-wrapper">
                <div className="form-col">
                  <TextField
                    id="first-name"
                    name="name"
                    label="Category Name *"
                    variant="outlined"
                    inputProps={{ className: "small" }}
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ValidationErrorMessage
                    message={errors.name}
                    touched={touched.name}
                  />
                </div>
              </div>
              <div className="btn-wrapper">
                <Button
                  className="green-btn btn"
                  variant="contained"
                  type="submit"
                  color="primary"
                  disableElevation
                >
                  Save
                </Button>
                <Button
                  className="pink-btn btn"
                  variant="contained"
                  type="button"
                  color="primary"
                  disableElevation
                  onClick={() => {
                    history("/category");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export { EditCategory };
