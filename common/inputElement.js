import { useState, useCallback, useRef, useEffect } from "react";
import {
  TextField,
  AppProvider,
  Frame,
} from "@shopify/polaris";
// import ReactQuill from 'react-quill';
// import dynamic from "next/dynamic";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// import "react-quill/dist/quill.snow.css";


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
  placeholder
}) => {
  return (
    <>
      <TextField
        label={label}
        type={type}
        name={name}
        id={id}
        value={value.toString()}
        onChange={onChange}
        placeholder={!placeholder?`Enter ${label ? label : "value"}`:placeholder}
        style={style}
        error={error}
        helpText={helpText}
        disabled={disabled}
      />
    </>
  );
};

export default InputElement;
