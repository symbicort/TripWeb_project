import React from 'react';

const Input = ({type, value, onChange, onClick, placeholder}) => {
    return (
        <div className="search-bar-container">
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="search-bar"
                onClick={onClick}
            />
        </div>
    );
};

export default Input;
