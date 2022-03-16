import React from "react";

const ColorPicker = ({value, onChange, ...rest}) => {
    return (
        <div className="colorPicker">
            <input className="colorBox" type='color' value={value} onChange={onChange} {...rest} />
            <input className="hexCode" type='text' value={value} onChange={onChange} {...rest} />
        </div>
    );
};

export default ColorPicker;