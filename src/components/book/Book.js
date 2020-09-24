import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BookService from '../../services/book';
import { setBook, initBook, setBookStatus } from '../../actions/book';
import CategoryService from '../../services/category';
import PublisherService from '../../services/publisher';
import AuthorService from '../../services/author';
import { setCategoryList } from '../../actions/category';
import { setPublisherList } from '../../actions/publisher';
import { setAuthorList } from '../../actions/author';
import { setTab } from '../../actions/tab';
import BookForm from "./BookForm";

const Book = props => {

  const { book, status } = useSelector(state => {
    return state.book
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const _fetch = async () => {
      let data = await BookService.get(bookId);
      dispatch(setBook(data));
    }
    dispatch(setTab("book"));
    let bookId = props.match.params.id;
    if (typeof (bookId) !== "undefined") {
      _fetch();
    } else {
      dispatch(initBook());
    }
    // eslint-disable-next-line
  }, []);

  const save = (book) => {
    const _save = async () => {
      try {
        let result = await BookService.save(book);
        dispatch(setBook(result));
        dispatch(setBookStatus("saved"));
        dispatch(setBookStatus("")); //reset
      } catch (error) {
        console.log("save error", error);
      }
    }
    if (status === "") {
      dispatch(setBookStatus("submitting"));
      _save();
    }
  }

  useEffect(() => {
    const _fetch = async () => {
      let data = await CategoryService.list();
      dispatch(setCategoryList(data));
    }
    _fetch()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const _fetch = async () => {
      let data = await PublisherService.list();
      dispatch(setPublisherList(data));
    }
    _fetch();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const _fetch = async () => {
      let data = await AuthorService.list();
      dispatch(setAuthorList(data));
    }
    _fetch();
    // eslint-disable-next-line
  }, []);

  useEffect(() => { //unmount
    return () => { dispatch(initBook()) }
    // eslint-disable-next-line
  }, []);

  if (status === "saved") {
    return (<Redirect to="/bookList" />);
  }

  return (
    <>
      <section className="d-flex align-items-center">
        <h1>Book Editor</h1>
        <Link to="/bookList/" className="ml-auto">Books</Link>
      </section>
      <section className="mt-3">
        <BookForm onSubmit={save} />
      </section>
    </>
  )
};

export default Book;