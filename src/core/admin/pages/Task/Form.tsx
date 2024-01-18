import React from 'react';
import FormikValidationError from '../../../../components/React/FormikValidationError/FormikValidationError';
import { useFormik } from 'formik';
import { taskInitialValues, taskValidationSchema } from './schema';
import Button from '../../../../components/UI/Forms/Buttons';
import { ConnectedProps, connect } from 'react-redux';

interface Props extends PropsFromRedux{

}

const Form = (props: Props) => {

  const [initialData, setInitialData] = React.useState<typeof taskInitialValues>({
    ...taskInitialValues
  });

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
    validationSchema: taskValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {
      let res;
      console.log(submitValue);
    }
  })
  return (
    <div className='Task-form'>
      <form action="" onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}>
        <div className="row">
          <div className='form-group col-lg-3'>
            <label htmlFor="">Title</label>
            <input
              className='form-control'
              name='title'
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormikValidationError name='title' errors={errors} touched={touched} />
          </div>
          <div className='form-group col-lg-3'>
            <label htmlFor="">Description</label>
            <textarea rows={1} cols={30}
              className='form-control'
              name='description'
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            >
            </textarea>
            <FormikValidationError name='description' errors={errors} touched={touched} />
          </div>
          <div className='form-group col-lg-3'>
            <label htmlFor="">Start Date</label>
            <input
              className='form-control'
              name='start_date'
              type='datetime-local'
              value={values.start_date}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className='form-group col-lg-3'>
            <label htmlFor="">end_Date</label>
            <input
              className='form-control'
              name='end_date'
              type='datetime-local'
              value={values.end_date}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className='form-group col-lg-3'>
            <label htmlFor="">Assigned Name</label>
            <input
              className='form-control'
              name='assigned_user_name'
              value={values.assigned_user_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className='form-group col-lg-3'>
            <label htmlFor="">address</label>
            <input
              className='form-control'
              name='address'
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormikValidationError name='address' errors={errors} touched={touched} />
          </div>
        </div>
        <div className="button">
          <Button className='btn custom-btn text-white text-right'
            type='submit'
            text="SUBMIT"
          />
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {
  
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Form);