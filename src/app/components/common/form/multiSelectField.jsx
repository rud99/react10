import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultySelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;

    const handleChange = (value) => {
        onChange({ name: name, value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>

            <Select
                closeMenuOnSelect={false}
                isMulti
                options={optionsArray}
                defaultValue={defaultValue}
                className="basic-multi-select"
                classNamePrefix="select"
                name={name}
                onChange={handleChange}
            />
        </div>
    );
};
MultySelectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    defaultValue: PropTypes.array
};
export default MultySelectField;
