'use client';

import Form from "react-bootstrap/Form";
import { useState } from "react";
import styles from "../input.module.css";

export default function Dropdown({
  options = [],
  label,
  value,
  onChange,
  inputClassName,
  placeholder = "Selecione uma opção",
  variant = "Default",
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
      <Form.Select
        value={value}
        onChange={onChange}
        className={`form-control rounded-3 w-100 ${inputClassName} ${variants[currentVariant]}`}
        onFocus={() => setCurrentVariant("Active")}
        onBlur={() => setCurrentVariant("Default")}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nome}
          </option>
        ))}
      </Form.Select>

      <label htmlFor="floatingInput" className="text-muted">
        {label}
      </label>
    </div>
  );
}
