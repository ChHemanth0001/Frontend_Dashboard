const initialState = {
  categories: {
    "CSPM Executive Dashboard": [
      { id: 1, text: "Cloud Accounts" },
      { id: 2, text: "Cloud Account Risk Assessment" }
    ],
    "CWPP Dashboard": [],
    "Registry Scan": [
      { id: 3, text: "Image Risk Assessment" },
      { id: 4, text: "Image Security Issues" }
    ]
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_WIDGET':
      const { category, widget } = action.payload;
      return {
        ...state,
        categories: {
          ...state.categories,
          [category]: [...state.categories[category], widget],
        },
      };
    case 'REMOVE_WIDGET':
      const { category: removeCategory, widgetId } = action.payload;
      return {
        ...state,
        categories: {
          ...state.categories,
          [removeCategory]: state.categories[removeCategory].filter(widget => widget.id !== widgetId),
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
