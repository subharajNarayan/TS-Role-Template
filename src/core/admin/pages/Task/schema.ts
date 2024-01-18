import * as Yup from "yup";

export const taskInitialValues = {
  title: "",
  description: "",
  start_date: "",
  end_date: "",
  assigned_user_name:"",
  address: ""
};

export const taskValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description:Yup.string().required('Description is required'),
  address: Yup.string().required('Address is required'),
})