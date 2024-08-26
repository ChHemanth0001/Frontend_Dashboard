import React from 'react'
import { useDispatch } from 'react-redux'
import { removeWidget } from '../redux/actions';

const Widget = ({ widget, category}) => {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeWidget(category, widget.id));
    };

    return (
        <div className='widget'>
            <p>{widget.text}</p>
            <button onClick={handleRemove}>x</button>
        </div>
    );
};

export default Widget;