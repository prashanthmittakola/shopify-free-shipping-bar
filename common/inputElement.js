import { useState, useCallback, useRef, useEffect } from "react";
import {
  TextField,
  AppProvider,
  Frame,
  Select,
  ChoiceList,
  Checkbox,
  ColorPicker,
  RangeSlider,
} from "@shopify/polaris";
// import ReactQuill from 'react-quill';
// import dynamic from "next/dynamic";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// import "react-quill/dist/quill.snow.css";

const SelectBox = ({
  label,
  options,
  onChange,
  selected,
  id,
  helpText,
  disabled,
}) => {
  return (
    <Select
      label={label}
      options={options}
      onChange={onChange}
      value={selected}
      id={id}
      helpText={helpText}
      disabled={disabled}
    />
  );
};

const ColorPickerBox = (props) => {
  const [color, setColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });
  return <ColorPicker onChange={setColor} color={color} />;
};

const RangeSliderWithControl = (props) => {
  const {
    output,
    label,
    min,
    max,
    step,
    rangeValue,
    onChange,
    helpText,
  } = props;

  return (
    <RangeSlider
      output
      label={label}
      min={min}
      max={max}
      step={step}
      value={rangeValue}
      onChange={onChange}
      helpText={helpText}
    />
  );
};

const SingleChoiceList = ({
  title,
  choices,
  selected,
  onChange,
  id,
  disabled,
}) => {
  return (
    <ChoiceList
      title={title}
      id={id}
      choices={choices}
      selected={selected}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

const SingleCheckbox = ({ checked, onChange, label }) => {
  return <Checkbox label={label} checked={checked} onChange={onChange} />;
};

const InputElement = ({
  type,
  value,
  label,
  name,
  id,
  onChange,
  style,
  error,
  helpText,
  disabled,
  placeholder,
  connectedRight,
  autoComplete,
  multiline,
  min,
  minLength,
  maxLength,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      name={name}
      id={id}
      value={value.toString()}
      onChange={onChange}
      placeholder={!placeholder ? ` ` : placeholder}
      autoComplete={autoComplete}
      multiline={multiline}
      style={style}
      error={error}
      helpText={helpText}
      disabled={disabled}
      min={min}
      minLength={minLength}
      maxLength={maxLength}
      connectedRight={connectedRight}
    />
  );
};

export default InputElement;
export {
  SelectBox,
  SingleChoiceList,
  SingleCheckbox,
  ColorPickerBox,
  RangeSliderWithControl,
};
