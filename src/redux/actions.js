export const ADD_WIDGET = 'ADD_WIDGET';
export const REMOVE_WIDGET = 'REMOVE_WIDGET';

export const addWidget = (category, widget) => ({
  type: 'ADD_WIDGET',
  payload: { category, widget },
});

export const removeWidget = (category, widgetId) => ({
  type: 'REMOVE_WIDGET',
  payload: { category, widgetId },
});

