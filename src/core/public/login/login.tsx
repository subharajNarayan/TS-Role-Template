// import Button from "../../../components/UI/Forms/Buttons";
import { useFormik } from "formik";
import React, { ReactElement, useCallback, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../store/modules/login/login";
import { addUserDetails } from "../../../store/modules/userDetails";
import { RootState } from "../../../store/root-reducer";
import { object as YupObject, string as YupString } from "yup";
import '../login/login.scss';
import '../authSocial/social.scss';
import toast from "../../../components/Notifier/Notifier";
import FormikValidationError from "../../../components/React/FormikValidationError/FormikValidationError";
import MUIButton from "../../../components/Material-UI/Buttons";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';


interface Props extends PropsFromRedux { }
export interface UserCredentials {
  username: string;
  password: string;
}

function Login(props: Props): ReactElement {
  const history = useNavigate();
  const { loginUser } = props;
  // const i18nextData = useSelector((state: RootState) => state.i18nextData, shallowEqual);

  const [isLoader, setIsLoader] = useState(false);

  const handleLogin = useCallback(
    async (userDetails: UserCredentials) => {
      try {
        setIsLoader(true); // Set loader to true when initiating login
        const loginres: any = await loginUser(userDetails);
        console.log("loginres", loginres);


        if (loginres?.data?.access) {
          props.addUserDetails(loginres.data);
          console.log({ d: loginres.data });
          if (loginres?.data?.role === "admin") {
            history("/admin/home");
          } else {
            history("/auth/home");
          }
          toast.success(loginres.data.message);
        } else {
          // Failed login attempt
          console.log("loginres", loginres?.message);

          if (loginres?.status === 401) {
            // Display a more user-friendly message for failed authentication
            const wrongPassword = loginres?.message?.error;
            toast.error(wrongPassword);
            // toast.error("password doesn't match");
          } else {
            // Display other error messages or a generic server error
            toast.error(loginres?.data?.message || "Server Error");
          }
        }
      } catch (error) {
        toast.error("Server is taking too long to respond, please try again in sometime!");
      } finally {
        setIsLoader(false)
      }
    },
    [loginUser, history, props]
  );

  return (
    <div className="app bg-white">
      <div className="container">
        <div className="auth-wrapper">
          <LoginForm handleLogin={handleLogin} authorizing={isLoader} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  loginData: state.loginData,
});

const mapDispatchToProps = {
  loginUser: loginUser,
  addUserDetails: addUserDetails,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Login);

interface LoginFormProps {
  handleLogin: (credentials: UserCredentials) => void;
  /**Status indicating if login is initiating */
  authorizing: boolean;
}
const LoginForm = ({ authorizing, handleLogin }: LoginFormProps) => {
  // const { t } = useTranslation(["login", "register"]);

  const [passwordView, showPassword] = useState(false);
  const togglePassword = () => showPassword(!passwordView);
  const [initialValue] = useState({ username: "", password: "" });

  const loginValidationSchema = YupObject().shape({
    username: YupString().required("This Field id Required"),
    password: YupString().required("This Field id Required"),
  });

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValue,
    validationSchema: loginValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      handleLogin(values);
    },
  });

  // const history = useNavigate();

  return (
    <div className="auth-body">
      {/* <form className="" onSubmit={handleSubmit} autoComplete="off">
        <p className="">Quick Book</p>

        <h6 className="mb-2 font-bold">CONFIGURATIONS</h6>

        <div className="auth-form">
          <div className="form-group align-vertical">
            <label htmlFor="" className="mr-4 label">
              Username
            </label>
            <input
              className="form-control"
              name="username"
              value={values.username}
              onChange={handleChange}
              required
            />
            <FormikValidationError name="username" errors={errors} touched={touched} />
          </div>

          <div className="form-group align-vertical mt-4">
            <label htmlFor="" className="mr-4 label">
              Password
            </label>

            <input
              className="form-control"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              required
            />

            <span
              className={`${passwordView ? "ic-view" : "ic-hidden"} text-coolGray600`}
              role="button"
              onClick={togglePassword}
            ></span>
            <FormikValidationError name="password" errors={errors} touched={touched} />
          </div>

          <div className="auth-footer">
            <Button
              className="btn btn-outlined-primary"
              text={"Login"}
              loading={authorizing}
              disabled={authorizing}
            />
          </div>
        </div>
      </form> */}
      {/* <div className="auth-signup">
        <p className="align-vertical">Dont't have an account? &nbsp;
          <Link to="/signup">SIGN UP</Link>
        </p>
      </div> */}
      <Box className="material-ui">
        <Box component="form" noValidate autoComplete="off"
          onSubmit={handleSubmit}>
          <p className="">Quick Book</p>
          <h6 className="mb-2 font-bold">CONFIGURATIONS</h6>
          <div className="username">
            <TextField
              name="username"
              label="Username"
              value={values.username}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
            />
            <FormikValidationError name="username" errors={errors} touched={touched} />
          </div>
          <div className="password">
            <TextField
              name="password"
              label="Password"
              value={values.password}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              type="password"
            />
            <FormikValidationError name="password" errors={errors} touched={touched} />
          </div>
          <MUIButton
            type="submit"
            text={"Login"}
            fullWidth
            variant="contained"
            loading={authorizing}
            disabled={authorizing}
          />
        </Box>
        <Grid container className="mt-2">
          <Grid item>
            <Link to={"/signup"}  >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
