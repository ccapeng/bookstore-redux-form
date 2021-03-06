import React, { useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PublisherService from '../../services/publisher';
import { setPublisher, initPublisher, setPublisherName, setPublisherStatus } from '../../actions/publisher';
import { setTab } from '../../actions/tab';
import PublisherForm from "./PublisherForm";

const Publisher = props => {

  const { status } = useSelector(state => {
    return state.publisher
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const _fetch = async () => {
      let data = await PublisherService.get(publisherId);
      dispatch(setPublisher(data));
    }
    dispatch(setTab("publisher"));
    let publisherId = props.match.params.id;
    if (typeof (publisherId) !== "undefined") {
      _fetch()
    } else {
      dispatch(initPublisher());
    }
    // eslint-disable-next-line
  }, []);

  const save = (publisher) => {
    const _save = async () => {
      let result = await PublisherService.save(publisher);
      dispatch(setPublisher(result));
      dispatch(setPublisherStatus("saved"));
      dispatch(setPublisherStatus("")); //reset
    }
    if (status === "") {
      dispatch(setPublisherStatus("submitting"));
      _save();
    }
  }

  if (status === "saved") {
    return (<Redirect to="/publisherList"></Redirect>);
  }

  return (
    <>
      <section className="d-flex adjust-items-center">
        <h1>Publisher Editor</h1>
        <Link to="/publisherList" className="ml-auto">Publishers</Link>
      </section>
      <section className="mt-3">
        <PublisherForm onSubmit={save} />
      </section>
    </>
  )
};

export default Publisher;