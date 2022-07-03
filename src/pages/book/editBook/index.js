import React, { useEffect, useState } from "react";
import { editStyle } from "./style";
import * as Yup from "yup";
import {
  Typography,
  TextField,
  Button,
  Input,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useNavigate, useParams, Navigate } from "react-router-dom";
// import bookService from "../../../service/book/book.service";
import { StatusCode } from "../../../utils/constant";
import { Formik } from "formik";
import ValidationErrorMessage from "../../../containers/ValidationErrorMessage/ValidationErrorMessage";
import { toast } from "react-toastify";
import { materialCommonStyles } from "../../../utils/materialCommonStyles";
// import categoryService from "../../../service/category/category.service";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../redux/action/category.action";
import { addBook, editBook } from "../../../redux/action/book.action";

const EditBook = () => {
  const auth = useSelector(state => state.auth)
  const books = useSelector(state => state.books.book)
  const category = useSelector(state => state.categories.categories)
  const dispatch = useDispatch()
  const materialClasses = materialCommonStyles();
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const classes = editStyle();
  const history = useNavigate();
  const initialValues = {
    id: 0,
    name: "",
    price: "",
    CategoryId: 0,
    Description: "",
    Base64image: "",
  };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    if (id) getBookById();
    // categoryService.getAllOptions().then((res) => {
    //   if (res.code === StatusCode.Success) {
    //     setCategories(res.data);
    //   }
    // });
  }, [id]);
  useEffect(() => {
    dispatch(getCategory())
    if (category) setCategories(category)
  }, [])

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Book Name is required"),
    Description: Yup.string().required("Description is required"),
    CategoryId: Yup.string()
      .required("Category is required"),
    price: Yup.number().required("Price is required"),
    Base64image: Yup.string().required("Image is required"),
  });

  const getBookById = () => {
    // bookService.getById(Number(id)).then((res) => {
    //   if (res && res.code === StatusCode.Success) {
    //     setInitialValueState({
    //       id: res.data.id,
    //       name: res.data.name,
    //       price: res.data.price,
    //       category: res.data.categoryId,
    //       description: res.data.description,
    //       imageSrc: res.data.base64image,
    //     });
    //   }
    // });
    books.map(book => {
      if (book._id === id) {
        setInitialValueState(book)
      }
    })
  };

  const onSubmit = (values) => {
    // bookService.save(values).then((res) => {
    //   if (res && res.code === StatusCode.Success) {
    //     toast.success(res.message);
    //     history("/book");
    //   }
    // });
    if (id) {
      dispatch(editBook({
        _id: id,
        name: values.name,
        price: values.price,
        category: values.CategoryId,
        image: values.Base64image,
        descreption: values.Description,
        sellerId: auth.user._id
      }))
    }
    else {
      dispatch(addBook({
        name: values.name,
        price: values.price,
        category: values.CategoryId,
        image: values.Base64image,
        descreption: values.Description,
        sellerId: auth.user._id
      }))
    }

    history("/book");

  };

  const onSelectFile = (e, setFieldValue, setFieldError) => {
    const files = e.target.files;
    if (files?.length) {
      const fileSelected = e.target.files[0];
      const fileNameArray = fileSelected.name.split(".");
      const extension = fileNameArray.pop();
      if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
        const reader = new FileReader();
        reader.readAsDataURL(fileSelected);
        reader.onload = function () {
          setFieldValue("Base64image", reader.result);
        };
        reader.onerror = function (error) {
          throw error;
        };
      } else {
        toast.error("only jpg,jpeg and png files are allowed");
      }
    } else {
      setFieldValue("Base64image", "");
    }
  };
  if (!auth.authenticated) {
    return <Navigate to={'/login'} />
  }
  return (
    <div className={classes.editWrapper}>
      <div className="container">
        <Typography variant="h1">{id ? "Edit" : "Add"} Book</Typography>
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
            setValues,
            setFieldError,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-row-wrapper">
                <div className="form-col">
                  <TextField
                    id="first-name"
                    name="name"
                    label="Book Name *"
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

                <div className="form-col">
                  <TextField
                    type={"number"}
                    id="price"
                    name="price"
                    label="Book Price (RS)*"
                    variant="outlined"
                    inputProps={{ className: "small" }}
                    value={values.price}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ValidationErrorMessage
                    message={errors.price}
                    touched={touched.price}
                  />
                </div>

                <div className="form-col">
                  <FormControl className="dropdown-wrapper" variant="outlined">
                    <InputLabel htmlFor="select">Category *</InputLabel>
                    <Select
                      name={"CategoryId"}
                      id={"CategoryId"}
                      onChange={handleChange}
                      className={materialClasses.customSelect}
                      MenuProps={{
                        classes: { paper: materialClasses.customSelect },
                      }}
                      value={values.CategoryId}
                    >
                      {categories?.map((rl) => (
                        <MenuItem value={rl._id} key={"CategoryId" + rl._id}>
                          {rl.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <ValidationErrorMessage
                    message={errors.CategoryId}
                    touched={touched.CategoryId}
                  />
                </div>
                {/* <img src={values.imageSrc} alt="asa" /> */}
                <div className="form-col">
                  {!values.Base64image && (
                    <>
                      {" "}
                      <label
                        htmlFor="contained-button-file"
                        className="file-upload-btn"
                      >
                        <Input
                          id="contained-button-file"
                          type="file"
                          inputProps={{ className: "small" }}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            onSelectFile(e, setFieldValue, setFieldError);
                          }}
                        />
                        <Button
                          variant="contained"
                          component="span"
                          className="btn pink-btn"
                        >
                          Upload
                        </Button>
                      </label>
                      <ValidationErrorMessage
                        message={errors.Base64image}
                        touched={touched.Base64image}
                      />
                    </>
                  )}
                  {values.Base64image && (
                    <div className="uploaded-file-name">
                      <em>
                        <img src={values.Base64image} alt="" />
                      </em>
                      image{" "}
                      <span
                        onClick={() => {
                          setFieldValue("Base64image", "");
                        }}
                      >
                        x
                      </span>
                    </div>
                  )}
                </div>
                <div className="form-col full-width description">
                  <TextField
                    id="Description"
                    name="Description"
                    label="Description *"
                    variant="outlined"
                    value={values.Description}
                    multiline
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ValidationErrorMessage
                    message={errors.Description}
                    touched={touched.Description}
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
                    history("/book");
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

export { EditBook };
