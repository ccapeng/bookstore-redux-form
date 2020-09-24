import React from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import renderField from "../common/renderField";

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Required'
  } else if (values.title.length < 3) {
    errors.name = 'Must be 3 characters or more.'
  }
  return errors
}

let BookForm = props => {

  const {
    handleSubmit,
    submitting,
    categoryList,
    publisherList,
    authorList
  } = props;

  return (
    <form onSubmit={handleSubmit}>

      <Field
        name="title"
        type="text"
        component={renderField}
        label="Title"
        autoFocus
      />

      <div className="form-group">
        <label>Category</label>
        <Field
          name="category"
          className="form-control"
          component="select"
        >
          <option value="0"> --- </option>
          {categoryList.map(category =>
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          )}
        </Field>
      </div>

      <div className="form-group">
        <label>Publisher</label>
        <Field
          name="publisher"
          className="form-control"
          component="select"
        >
          <option value="0"> --- </option>
          {publisherList.map(publisher =>
            <option value={publisher.id} key={publisher.id}>
              {publisher.name}
            </option>
          )}
        </Field>
      </div>
      <div className="form-group">
        <label>Author</label>
        <Field
          name="author"
          className="form-control"
          component="select"
        >
          <option value="0"> --- </option>
          {authorList.map(author =>
            <option value={author.id} key={author.id}>
              {author.lastName}, {author.firstName}
            </option>
          )}
        </Field>
      </div>

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

BookForm = reduxForm({
  form: 'bookForm',
  validate,
  enableReinitialize: true
})(BookForm);

BookForm = connect(
  (state) => {
    return {
      initialValues: state.book.book,
      categoryList: state.categoryList.categoryList,
      publisherList: state.publisherList.publisherList,
      authorList: state.authorList.authorList
    }
  }
)(BookForm);

export default BookForm;