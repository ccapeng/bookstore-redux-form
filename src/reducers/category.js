import { ACTIONS } from "../actions/types";

const initialCategoryListState = {
  categoryList: []
}

export const categoryList = (state = initialCategoryListState, action) => {
  switch (action.type) {
    case ACTIONS.SET_CATEGORY_LIST:
      let arr = action.payload.sort(
        function (a, b) { return a.name.toLowerCase() > b.name.toLowerCase() }
      );
      return {
        categoryList: arr
      }
    case ACTIONS.SET_CATEGORY_DELETED:
      return {
        ...state,
        categoryList: state.categoryList.filter(category => category.id !== action.payload)
      }
    default:
      return state;
  }
}


const initialCategoryState = {
  category: {
    id: 0,
    name: ""
  },
  status: ""
}

export const category = (state = initialCategoryState, action) => {
  switch (action.type) {
    case ACTIONS.SET_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case ACTIONS.INIT_CATEGORY:
      return {
        ...initialCategoryState
      };
    case ACTIONS.SET_CATEGORY_STATUS:
      if (action.payload === "saved") {
        return {
          ...initialCategoryState,
          status: action.payload
        };
      } else {
        return {
          ...state,
          status: action.payload
        };
      }

    default:
      return state;
  }
}