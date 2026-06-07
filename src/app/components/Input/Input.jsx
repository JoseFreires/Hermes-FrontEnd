// components/Input/Input.jsx
"use client";

import styles from "./input.module.css";
import { useState } from "react";

export default function Input({
  type,
  variant = "Default",
  placeholder,
  inputClassName,
  Label,
  icon,
  defaultValue,
  icon,
  defaultValue
}) {
  const variants = {
    Default: styles.default,
    Active: styles.active,
    Error: styles.error,
    Disabled: styles.disabled,
  };

  const [currentVariant, setCurrentVariant] = useState(variant);
  const [showError, setShowError] = useState(false);
  return (
    <div className="form-floating mb-4">
      <input
        type={type}
        className={`form-control rounded-3 w-100 ${inputClassName} ${variants[currentVariant]}`}
        id="floatingInput"
        placeholder={placeholder}
        onFocus={() => setCurrentVariant("Active")}
        onBlur={(e) => {
          if (e.target.value) {
            setShowError(false);
            setCurrentVariant("Default");
          } else {
            setShowError(true);
            setCurrentVariant("Error");
          }
        }}
        defaultValue={defaultValue}
        onChange={(e) => {
          if (currentVariant === "default" || currentVariant === "error") {
            setCurrentVariant("Active");
          }
        }}
      />
        <label htmlFor="floatingInput" className={styles.texto}>
                {Label}
        </label>

        {showError && (<div className={styles.errorMessage}>Este campo é obrigatório.</div>)}
    </div>
  );
}
