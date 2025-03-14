import React from "react";

const FormLabel = ({ children, required, className }) => {
    return (
        <label className={className}>
            {children}
            {required && <span style={{ color: "red", marginLeft: '5px' }}>*</span>}
        </label>
    );
};

export default FormLabel;