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

let PublisherForm = props => {

  const { handleSubmit, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        type="text"
        component={renderField}
        label="Publisher Name"
        autoFocus
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

PublisherForm = reduxForm({
  form: 'publisherForm',
  validate,
  enableReinitialize: true
})(PublisherForm);

PublisherForm = connect(
  state => {
    return {
      initialValues: state.publisher.publisher
    }
  }
)(PublisherForm);

export default PublisherForm;