import React from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import renderField from "../common/renderField";

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length < 3) {
    errors.name = 'Must be 3 characters or more.'
  }
  return errors
}

let AuthorForm = props => {

  const { handleSubmit, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="lastName"
        type="text"
        component={renderField}
        label="Last Name"
        autoFocus
      />
      <Field
        name="firstName"
        type="text"
        component={renderField}
        label="First Name"
      />
      <div className="form-group">
        <Field type="hidden" name="id" component="input" />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={submitting}
        >
          Submit
        </button>
      </div>
    </form>
  )
};

AuthorForm = reduxForm({
  form: 'authorForm',
  validate,
  enableReinitialize: true
})(AuthorForm);

AuthorForm = connect(
  state => {
    return {
      initialValues: state.author.author
    }
  }
)(AuthorForm);

export default AuthorForm;