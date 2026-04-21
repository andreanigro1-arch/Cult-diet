import React from 'react';
import PropTypes from 'prop-types';
import './TextInput.css'; // Import your CSS for styling

const TextInput = ({ label, placeholder, error, themeColors }) => {
    const { primary, secondary, errorColor } = themeColors;
    const inputStyle = error ? { borderColor: errorColor } : { borderColor: primary };

    return (
        <div className="text-input">
            {label && <label style={{ color: secondary }}>{label}</label>}
            <input 
                type="text" 
                placeholder={placeholder} 
                style={inputStyle} 
            />
            {error && <span style={{ color: errorColor }}>{error}</span>}
        </div>
    );
};

TextInput.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    themeColors: PropTypes.shape({
        primary: PropTypes.string,
        secondary: PropTypes.string,
        errorColor: PropTypes.string,
    }).isRequired,
};

export default TextInput;
