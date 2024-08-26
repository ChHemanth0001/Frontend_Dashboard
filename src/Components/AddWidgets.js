import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWidget } from '../redux/actions';

const AddWidget = ({ category }) => {
  const [widgetText, setWidgetText] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (widgetText.trim()) {
      dispatch(addWidget(category, widgetText));
      setWidgetText('');
    }
  };

  return (
    <div className="add-widget">
      <input
        type="text"
        placeholder="Enter widget text"
        value={widgetText}
        onChange={(e) => setWidgetText(e.target.value)}
      />
      <button onClick={handleAdd}>Add Widget</button>
    </div>
  );
};

export default AddWidget;
