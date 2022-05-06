import React, { useEffect, useState } from "react";
import { editUserStyle } from "./style";

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
import { useNavigate, useParams, useResolvedPath } from "react-router-dom";
// import userService from "../../../service/user/user.service";
import { StatusCode } from '../../../utils/constant';
import { Formik } from "formik";
import ValidationErrorMessage from "../../../containers/ValidationErrorMessage/ValidationErrorMessage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/action/userData.actions";
/**
* @author
* @function EditUser
**/

export const EditUser = (props) => {
  const user = useSelector(state => state.allUser);
  const roles = [{val:"buyer",i:1}, {val:"seller",i:2}];
  const classes = editUserStyle();
  const materialClasses = materialCommonStyles();
  const history = useNavigate();
  const initialValues = {
    id: 0,
    email: "",
    lastname: "",
    firstname: "",
    roleid: ""
  };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    getUserById();
  }, [id]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    roleid: Yup.string().required("Role is required"),
  });

  const getUserById = () => {
    const _user = user.user.filter(u => id === u._id);
    setInitialValueState({
      id: _user[0]._id,
      email: _user[0].email,
      firstname: _user[0].firstname,
      lastname: _user[0].lastname,
      roleid: _user[0].roleid
    })
  };

  const onSubmit = (values) => {
    // userService.update(values).then((res) => {
    //   if (res && res.code === StatusCode.Success) {
      // toast.success("User Edited");
      //   }
      // });
      // console.log(values);
      const { id, firstname, lastname, email, roleid } = values;
      dispatch(updateUser({
        _id: id,
        firstname, lastname, email, roleid
      }))
      history("/user");
  };
  return (
    <div className={classes.editUserWrapper}>
      <div className="container">
        <Typography variant="h1">Edit User</Typography>
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
                    name="firstname"
                    label="First Name *"
                    variant="outlined"
                    inputProps={{ className: "small" }}
                    value={values.firstname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ValidationErrorMessage
                    message={errors.firstname}
                    touched={touched.firstname}
                  />
                </div>
                <div className="form-col">
                  <TextField
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="last-name"
                    name="lastname"
                    label="Last Name *"
                    value={values.lastname}
                    variant="outlined"
                    inputProps={{ className: "small" }}
                  />
                  <ValidationErrorMessage
                    message={errors.lastname}
                    touched={touched.lastname}
                  />
                </div>
                <div className="form-col">
                  <TextField
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    label="Email *"
                    value={values.email}
                    variant="outlined"
                    inputProps={{ className: "small" }}
                  />
                  <ValidationErrorMessage
                    message={errors.email}
                    touched={touched.email}
                  />
                </div>
                <div className="form-col">
                  <FormControl className="dropdown-wrapper" variant="outlined">
                    <InputLabel htmlFor="select">Roles</InputLabel>
                    <Select
                      name="roleid"
                      id="roleId"
                      onChange={handleChange}
                      className={materialClasses.customSelect}
                      MenuProps={{
                        classes: { paper: materialClasses.customSelect },
                      }}
                      value={values.roleid}
                    >
                      {roles?.map((rl,index) => (
                        <MenuItem value={rl.val} key={index} >
                          {rl.val}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                    history("/user");
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
  )

}