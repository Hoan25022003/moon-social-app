import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Authentication from "layout/Authentication";
import FormGroup from "components/form/FormGroup";
import Label from "components/form/Label";
import Input from "components/form/Input";
import ButtonGradient from "components/button/ButtonGradient";
import ErrorMessage from "components/form/ErrorMessage";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import AlertInfo from "components/alert/AlertInfo";
import axios from "api/axios";

const schema = yup.object({
  firstName: yup
    .string()
    .required("This is required field")
    .min(2, "Name have at least 2 characters"),
  lastName: yup
    .string()
    .required("This is required field")
    .min(2, "Name have at least 2 characters"),
  email: yup
    .string()
    .required("This is required field")
    .email("This email is not available"),
  password: yup
    .string()
    .required("This is required field")
    .min(6, "Password must be 6 characters or more")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/,
      "Password must be at least 1 uppercase, 1 lowercase and 1 number"
    ),
});

const initialValue = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  gender: "male",
};

const RegisterPage = () => {
  // const [status, setStatus] = React.useState(null);
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
    reset,
    setValue,
    setError,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });
  const [showAlert, setShowAlert] = React.useState(false);
  const handleRegister = async (values) => {
    try {
      await axios.post("/auth/register", values);
      setShowAlert(true);
      reset(initialValue);
    } catch (error) {
      error.response.status === 401 &&
        setError("email", { message: "This email already existed" });
    }
  };
  return (
    <Authentication heading="Register">
      <form
        className="flex flex-col gap-y-5"
        autoComplete="off"
        onSubmit={handleSubmit(handleRegister)}
      >
        <div className="grid grid-cols-2 gap-x-4">
          <FormGroup>
            <Label name="firstName" className="mb-2">
              First Name *
            </Label>
            <Input
              control={control}
              name="firstName"
              placeholder={"First Name"}
              error={isDirty && errors?.firstName}
            ></Input>
            {errors?.firstName && (
              <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label name="lasName" className="mb-2">
              Last Name *
            </Label>
            <Input
              control={control}
              name="lastName"
              placeholder={"Last Name"}
              error={isDirty && errors?.lastName}
            ></Input>
            {errors?.lastName && (
              <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
            )}
          </FormGroup>
        </div>
        <FormGroup>
          <Label name="email" className="mb-2">
            Email *
          </Label>
          <Input
            placeholder={"Enter your email"}
            name="email"
            control={control}
            type="email"
            error={isDirty && errors?.email}
          ></Input>
          {errors?.email && (
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label className="mb-2" name="password">
            Password *
          </Label>
          <Input
            placeholder={"Enter your password"}
            name="password"
            control={control}
            type="password"
            error={isDirty && errors?.password}
          ></Input>
          {errors?.password && (
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label className="mb-2">Gender</Label>
          <RadioGroup
            defaultValue="male"
            name="gender"
            onChange={(e) => setValue("gender", e.target.value)}
            className="grid grid-cols-3 gap-x-5"
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <div></div>
          </RadioGroup>
        </FormGroup>
        <div className="text-center">
          <ButtonGradient
            className="w-[60%] py-[14px] text-[22px] leading-9 font-semibold rounded-xl"
            type="submit"
            isLoading={isSubmitting}
          >
            Sign up
          </ButtonGradient>
          <p className="mt-3 text-sm font-normal">
            If you already have account, you can{" "}
            <Link to={"/login"} className="font-medium text-primary">
              login
            </Link>
          </p>
        </div>
      </form>
      <AlertInfo open={showAlert} setOpen={setShowAlert}>
        Register successful
      </AlertInfo>
    </Authentication>
  );
};

export default RegisterPage;
