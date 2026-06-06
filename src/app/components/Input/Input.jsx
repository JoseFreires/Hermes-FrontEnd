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
  defaultValue
}) {
  const variants = {
    Default: styles.default,
    Active: styles.active,
    Error: styles.error,
    Disabled: styles.disabled,
  };

  const [currentVariant, setCurrentVariant] = useState(variant);

  return (
    <div className="form-floating mb-4">
      <input
        type={type}
        className={`form-control rounded-3 w-100 ${inputClassName} ${variants[currentVariant]}`}
        id="floatingInput"
        placeholder={placeholder}
        onFocus={() => setCurrentVariant("Active")}
        onBlur={() => setCurrentVariant("Default")}
        defaultValue={defaultValue}
      />
        <label htmlFor="floatingInput" className={styles.texto}>
                {Label}
        </label>
    </div>
  );
}
