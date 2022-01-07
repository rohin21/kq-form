import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Marginer } from "../marginer";
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer,
  FormSuccess,
  Input,
  MutedLink,
  SubmitButton,
  FormError,
} from "./common";
import { AccountContext } from "./context";
import * as yup from "yup";
import { data } from "../../data";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Please enter you real name")
    .required("Full name is required!"),
  emailId: yup.string().email("Please enter a valid email address").required(),
  password: yup.string().min(5, "Please enter valid password").required(),
  phoneNo: yup
    .string()
    .length(10, "Please enter valid phone number")
    .required("Please enter your phone number"),
});

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const onSubmit = (values) => {
    if (
      values.emailId === data.emailId &&
      values.password === data.password &&
      values.name === data.name &&
      values.phoneNo === data.phoneNo
    ) {
      setError(null);
      setSuccess("You are valid user.");
      navigate("/hello");
    } else {
      setSuccess(null);
      setError("You are not a valid user");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      emailId: "",
      password: "",
      phoneNo: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  console.log("Error", error);

  return (
    <BoxContainer>
      {!error && <FormSuccess>{success ? success : ""}</FormSuccess>}
      {!success && <FormError>{error ? error : ""}</FormError>}
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <Input
            name="name"
            placeholder="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.name && formik.errors.name
              ? formik.errors.name
              : ""}
          </FieldError>
        </FieldContainer>
        <FieldContainer>
          <Input
            name="emailId"
            placeholder="Email"
            value={formik.values.emailId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.emailId && formik.errors.emailId
              ? formik.errors.emailId
              : ""}
          </FieldError>
        </FieldContainer>
        <FieldContainer>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""}
          </FieldError>
        </FieldContainer>
        <FieldContainer>
          <Input
            name="phoneNo"
            type="tel"
            placeholder="Phone Number"
            value={formik.values.phoneNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.phoneNo && formik.errors.phoneNo
              ? formik.errors.phoneNo
              : ""}
          </FieldError>
        </FieldContainer>
        <Marginer direction="vertical" margin="1em" />
        <SubmitButton type="submit" disabled={!formik.isValid}>
          Signup
        </SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={5} />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          sign in
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
