import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AuthorService from '../../services/author';
import { setAuthor, initAuthor, setAuthorStatus } from '../../actions/author';
import { setTab } from '../../actions/tab';
import AuthorForm from './AuthorForm';

const Author = props => {

  const { status } = useSelector(state => {
    return state.author
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const _fetch = async () => {
      let authorId = props.match.params.id;
      if (typeof (authorId) !== "undefined") {
        let data = await AuthorService.get(authorId);
        dispatch(setAuthor(data));
      } else {
        dispatch(initAuthor());
      }
    };
    dispatch(setTab("author"));
    _fetch();
    // eslint-disable-next-line
  }, []);

  const save = (author) => {
    const _save = async () => {
      try {
        let result = await AuthorService.save(author);
        dispatch(setAuthor(result));
        dispatch(setAuthorStatus("saved"));
        dispatch(setAuthorStatus("")); //reset
      } catch (error) {
        console.log("save error", error);
      }
    }
    if (status === "") {
      dispatch(setAuthorStatus("submitting"));
      _save();
    }
  }

  if (status === "saved") {
    return (<Redirect to="/authorList" />);
  }

  return (
    <>
      <section className="d-flex align-items-center">
        <h1>Author Editor</h1>
        <Link to="/authorList" className="ml-auto">Authors</Link>
      </section>
      <section className="mt-3">
        <AuthorForm onSubmit={save} />
      </section>
    </>
  )
};

export default Author;