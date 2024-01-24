import React, {useEffect} from 'react';
import FormikValidationError from '../../../../components/React/FormikValidationError/FormikValidationError';
import { useFormik } from 'formik';
import { studentInitialValues, studentValidationSchema } from './schema';
import { ConnectedProps, connect } from 'react-redux';
import { toast } from 'react-toastify';
import MUIButton from '../../../../components/Material-UI/Buttons';
import { Box, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { getStudentLogsAction } from '../../../../store/modules/Student/getStudentLogs';
import { postStudentLogsAction } from '../../../../store/modules/Student/postStudentLogs';
import { RootState } from '../../../../store/root-reducer';
import { updateStudentLogsAction } from '../../../../store/modules/Student/updateStudentLogs';
import moment from 'moment';

interface Props extends PropsFromRedux {
  editData?: any;
  setEditData?: any;
}

const Form = (props: Props) => {

  const [initialData, setInitialData] = React.useState<typeof studentInitialValues>({
    ...studentInitialValues,
    gender: studentInitialValues.gender || 'female',
  });

  console.log({ ccc: props.editData });

  useEffect(() => {
    if (props.editData) {
      setInitialData({
        ...props.editData,
        dob: moment.utc(props.editData.dob).format("YYYY-MM-DD HH:mm:ss"),
      });
    }
  },[props.editData]);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialData,
    validationSchema: studentValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {
      let res;
      console.log({ submitValue });

      if (props.editData) {
        res = await props.updateStudentLogsAction(props.editData.id, {
          ...submitValue,
        })
      } else {
        res = await props.postStudentLogsAction({
          ...submitValue,
        })
      }

      if (res.status === 200 || res.status === 201) {
        if (props.editData) {
          setInitialData(studentInitialValues);
          resetForm();
          props.getStudentLogsAction();
          toast.success("Data updated successful")
        } else {
          setInitialData(studentInitialValues);
          resetForm();
          props.getStudentLogsAction();
          toast.success("Data posted successful")
        }
      } else {
        toast.error("Data posted failed")
      }
    }

  })
  return (
    <div className='Student-form'>
      <Box component="form" autoComplete="off"
        onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-lg-3">
            <div className="stdname">
              <TextField
                name="stdname"
                label="Name"
                value={values.stdname}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                fullWidth
              />
              <FormikValidationError name="stdname" errors={errors} touched={touched} />
            </div>
          </div>
          <div className="form-group col-lg-3">
            <div className="phoneno">
              <TextField
                name="phoneno"
                label="Phone No"
                value={values.phoneno}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                fullWidth
              />
              <FormikValidationError name="phoneno" errors={errors} touched={touched} />
            </div>
          </div>
          <div className="form-group col-lg-3">
            <div className="address">
              <TextField
                name="address"
                label="Address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                fullWidth
              />
              <FormikValidationError name="address" errors={errors} touched={touched} />
            </div>
          </div>
          <div className="form-group col-lg-3">
            <div className="DOB">
              <TextField
                name="dob"
                type="datetime-local"
                value={values.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                fullWidth
              />
              <FormikValidationError name="dob" errors={errors} touched={touched} />
            </div>
          </div>
          <div className="form-group col-lg-3">
            <div className="Fee">
              <TextField
                name="fee"
                label="Fee"
                type="number"
                value={values.fee}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                fullWidth
              />
              <FormikValidationError name="fee" errors={errors} touched={touched} />
            </div>
          </div>
          <div className="form-group col-lg-3">
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Section</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.section}
                name="section"
                label="Section"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"A"}>A</MenuItem>
                <MenuItem value={"B"}>B</MenuItem>
              </Select>
            </FormControl>
            <FormikValidationError name="section" errors={errors} touched={touched} />
          </div>
          <div className="form-group col-lg-4">
            <div className="gender">
              <FormControl>
                <FormLabel id="demo-form-control-label-placement">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-form-control-label-placement"
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Others" />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="button text-right">
          <MUIButton
            type='submit'
            text={"SUBMIT"}
            variant="contained"
            loading={props.loading}
            disabled={props.loading}
          />
        </div>
      </Box>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  loading: 
          state.StudentData.postStudentLogs.isFetching || 
          state.StudentData.updateStudentLogs.isFetching
})

const mapDispatchToProps = {
  getStudentLogsAction,
  postStudentLogsAction,
  updateStudentLogsAction,
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Form);