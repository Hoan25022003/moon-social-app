import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Authentication from "layout/Authentication";
import FormGroup from "components/form/FormGroup";
import Label from "components/form/Label";
import Input from "components/form/Input";
import ErrorMessage from "components/form/ErrorMessage";
import ButtonGradient from "components/button/ButtonGradient";
import { Link } from "react-router-dom";
import axios from "api/axios";

const schema = yup.object({
  email: yup
    .string()
    .required("Please enter your email!")
    .email("This email is not available"),
  password: yup.string().required("Please enter your password"),
});

const LoginPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
    reset,
    setError,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleLogin = async (values) => {
    try {
      await axios.post("/auth/login", values);
      reset({ email: "", password: "" });
    } catch (error) {
      if (error.response.status === 400) {
        setError("password", { message: "Email or password is not correct" });
        setError("email", { message: "" });
      }
    }
  };
  return (
    <Authentication heading="Log in">
      <form
        className="flex flex-col gap-y-5"
        autoComplete="off"
        onSubmit={handleSubmit(handleLogin)}
      >
        <FormGroup className="mb-4">
          <Label className="mb-3" name="email">
            Email *
          </Label>
          <Input
            placeholder="name@gmail.com"
            type="email"
            control={control}
            name="email"
            error={isDirty && errors?.email}
          ></Input>
          {errors?.email && (
            <ErrorMessage>{errors?.email?.message}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label className="mb-3" name="password">
            Password *
          </Label>
          <Input
            placeholder="Enter your password"
            type="password"
            control={control}
            name="password"
            error={errors?.password}
          ></Input>
          {errors?.password && (
            <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          )}
        </FormGroup>
        <div className="mt-8 text-center">
          <ButtonGradient
            className="w-[60%] py-[14px] text-[22px] leading-9 font-semibold rounded-xl"
            type="submit"
            isLoading={isSubmitting}
          >
            Sign In
          </ButtonGradient>
          <p className="mt-4 text-sm font-normal">
            Don't have an account yet?{" "}
            <Link to={"/register"} className="font-medium text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </Authentication>
  );
};

export default LoginPage;
