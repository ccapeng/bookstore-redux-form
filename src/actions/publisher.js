import { ACTIONS } from "../actions/types";

export const setPublisherList = (data) => {
  return {
    type: ACTIONS.SET_PUBLISHER_LIST,
    payload: data
  }
}

export const setPublisherDeleted = (id) => {
  return {
    type: ACTIONS.SET_PUBLISHER_DELETED,
    payload: id
  }
}

export const setPublisher = (data) => {
  return {
    type: ACTIONS.SET_PUBLISHER,
    payload: data
  }
}

export const initPublisher = () => {
  return {
    type: ACTIONS.INIT_PUBLISHER
  }
}

export const setPublisherStatus = (status) => {
  return {
    type: ACTIONS.SET_PUBLISHER_STATUS,
    payload: status
  }
}