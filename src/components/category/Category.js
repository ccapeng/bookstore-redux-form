import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CategoryService from '../../services/category';
import { setCategory, initCategory, setCategoryStatus } from '../../actions/category';
import { returnErrors } from '../../actions/messages';
import { setTab } from '../../actions/tab';
import CategoryForm from './CategoryForm';

const validate = values => {
  const errors = {}
  if (!values.category) {
    errors.category = 'Required'
  } else if (values.category.length < 3) {
    errors.category = 'Must be 3 characters or more.'
  }
  return errors
}

const Category = props => {

  const { match, handleSubmit, load, pristine, reset, submitting } = props;
  const { status } = useSelector(state => {
    return state.category
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const _fetch = async () => {
      let categoryId = match.params.id;
      if (typeof (categoryId) !== "undefined") {
        try {
          let data = await CategoryService.get(categoryId);
          dispatch(setCategory(data));
        } catch (error) {
          dispatch(returnErrors(error, "error"));
        }
      } else {
        dispatch(initCategory());
      }
    }
    dispatch(setTab("category"));
    _fetch();
    // eslint-disable-next-line
  }, []);

  const save = (category) => {
    const _save = async () => {
      let result = await CategoryService.save(category);
      dispatch(setCategory(result));
      dispatch(setCategoryStatus("saved"));
      dispatch(setCategoryStatus("")); //reset
    }
    if (status === "") {
      dispatch(setCategoryStatus("submitting"));
      _save();
    }
  }

  if (status === "saved") {
    return (<Redirect to="/categoryList" />);
  }

  return (
    <>
      <section className="d-flex align-items-center">
        <h1>Category Editor</h1>
        <Link to="/categoryList" className="ml-auto">Categories</Link>
      </section>
      <section className="mt-3">
        <CategoryForm onSubmit={save} />
      </section>
    </>
  )
};

export default Category;