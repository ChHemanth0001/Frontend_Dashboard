import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWidget, removeWidget } from '../redux/actions';
import './Dashboard.css';

const Dashboard = () => {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [isCheckboxSidebarOpen, setCheckboxSidebarOpen] = useState(false);
  const [isAddWidgetSidebarOpen, setAddWidgetSidebarOpen] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState({});
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetCategory, setNewWidgetCategory] = useState('');

  useEffect(() => {
    const initialSelectedWidgets = {};
    Object.keys(categories).forEach(category => {
      categories[category].forEach(widget => {
        initialSelectedWidgets[`${category}-${widget.id}`] = true;  
      });
    });
    setSelectedWidgets(initialSelectedWidgets);
  }, [categories]);

  
  const handleCheckboxSidebarClick = () => {
    setCheckboxSidebarOpen(!isCheckboxSidebarOpen);
    setAddWidgetSidebarOpen(false);  
  };

  const handleAddWidgetSidebarClick = () => {
    setAddWidgetSidebarOpen(!isAddWidgetSidebarOpen);
    setCheckboxSidebarOpen(false);  
  };

  const handleCloseSidebar = () => {
    setCheckboxSidebarOpen(false);
    setAddWidgetSidebarOpen(false);
  };

  
  const handleCheckboxChange = (category, widget) => {
    const widgetKey = `${category}-${widget.id}`;
    const isChecked = !selectedWidgets[widgetKey];
    setSelectedWidgets(prevState => ({
      ...prevState,
      [widgetKey]: isChecked,
    }));

    if (isChecked) {
      const newWidgetInstance = { ...widget, id: new Date().getTime() };  
      dispatch(addWidget(category, newWidgetInstance));
    } else {
      dispatch(removeWidget(category, widget.id));
    }
  };

  
  const handleAddNewWidget = () => {
    if (newWidgetName && newWidgetCategory) {
      const newWidget = {
        id: new Date().getTime(),  
        text: newWidgetName,
      };
      dispatch(addWidget(newWidgetCategory, newWidget));
      setNewWidgetName('');
      setNewWidgetCategory('');
      setAddWidgetSidebarOpen(false);  
    }
  };

  const handleCancel = () => {
    setCheckboxSidebarOpen(false);  
    setAddWidgetSidebarOpen(false);
    setNewWidgetName('');
    setNewWidgetCategory('');
  };

  const findWidgetById = (id) => {
    for (let category in categories) {
      const widget = categories[category].find(widget => widget.id === parseInt(id));
      if (widget) return { ...widget, category };
    }
    return null;
  };

  return (
    <div className="dashboard-container">
      <p>Dashboard Page</p>
      <button className="manage-widget-button" onClick={handleCheckboxSidebarClick}>
        Manage Widgets
      </button>
      <button className="add-widget-button" onClick={handleAddWidgetSidebarClick}>
        + Add Widget
      </button>

      
      <div className={`sidebar ${isCheckboxSidebarOpen ? 'open' : ''}`}>
        <button className="close-sidebar-button" onClick={handleCloseSidebar}>×</button>
        <h3>Manage Widgets</h3>
        <div className="widget-list">
          {Object.keys(categories).map((category) => (
            <div key={category}>
              <h4>{category}</h4>
              {categories[category].map((widget) => (
                <div key={`${category}-${widget.id}`} className="widget-item">
                  <input
                    type="checkbox"
                    checked={selectedWidgets[`${category}-${widget.id}`] || false}
                    onChange={() => handleCheckboxChange(category, widget)}
                  />
                  <label>{widget.text}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      
      <div className={`sidebar ${isAddWidgetSidebarOpen ? 'open' : ''}`}>
        <button className="close-sidebar-button" onClick={handleCloseSidebar}>×</button>
        <h3>Add New Widget</h3>
        <div className="new-widget-form">
          <input
            type="text"
            placeholder="Widget Name"
            value={newWidgetName}
            onChange={(e) => setNewWidgetName(e.target.value)}
          />
          <select
            value={newWidgetCategory}
            onChange={(e) => setNewWidgetCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="sidebar-buttons">
          <button onClick={handleAddNewWidget}>Add Widget</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>

      <div className="categories-container">
        {Object.keys(categories).map((category) => (
          <div key={category} className="category">
            <h2>{category}</h2>
            <div className="widgets">
              {categories[category].map((widget) => (
                <div 
                  key={widget.id} 
                  className="widget"
                  onMouseEnter={() => document.getElementById(`remove-widget-${widget.id}`).style.display = 'block'}
                  onMouseLeave={() => document.getElementById(`remove-widget-${widget.id}`).style.display = 'none'}
                  style={{ display: selectedWidgets[`${category}-${widget.id}`] ? 'block' : 'none' }}
                >
                  {widget.text}
                  <span
                    id={`remove-widget-${widget.id}`}
                    className="remove-widget"
                    onClick={() => dispatch(removeWidget(category, widget.id))}
                  >
                    ×
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
