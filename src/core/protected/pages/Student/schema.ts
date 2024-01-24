import * as Yup from "yup";

export const studentInitialValues = {
  stdname: "",
  gender: "",
  address: "",
  phoneno: "",
  dob: "",
  fee: 0,
  section: "",
}

export const studentValidationSchema = Yup.object().shape({
  stdname: Yup.string().required("This field is required"),
  gender: Yup.string().required("This field is required"),
  address: Yup.string().required("This field is required"),
  dob: Yup.string().required("This field is required"),
  phoneno: Yup.string().matches(/^\d+$/, 'Enter numbers only').required("This field is required"),
  section: Yup.string().required("This field is required"),
  fee: Yup.number().required("This field is required"),
})