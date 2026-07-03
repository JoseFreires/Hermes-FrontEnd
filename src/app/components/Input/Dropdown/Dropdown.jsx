"use client";

import React, { useState } from "react";
import Select from "react-select";
import styles from "./Dropdown.module.css";

export default function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = "",
  isLoading = false,
  isDisabled = false,
  inputClassName,
  Label,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const selectedValue =
    options.find((opt) => String(opt.value) === String(value)) || null;

  // Label flutua se estiver focado OU se já tiver valor selecionado
  const labelFloating = isFocused || !!selectedValue;

  const handleChange = (selectedOption) => {
    if (typeof onChange === "function") {
      onChange({
        target: {
          value: selectedOption ? selectedOption.value : "",
        },
      });
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${inputClassName || ""}`}
    >
      <Select
        options={options}
        value={selectedValue}
        onChange={handleChange}
        placeholder={isFocused ? placeholder : ""}  /* esconde placeholder quando label está no lugar */
        isClearable={false}
        isSearchable
        isLoading={isLoading}
        isDisabled={isDisabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        noOptionsMessage={() =>
          isLoading ? "Carregando..." : "Nenhuma opção encontrada"
        }
        classNamePrefix="react-select"
        className={styles.select}
      />

      {Label && (
        <label className={`${styles.label} ${labelFloating ? styles.labelFloat : ""}`}>
          {Label}
        </label>
      )}
    </div>
  );
}