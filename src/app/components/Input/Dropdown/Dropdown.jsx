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
  name,  
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showError, setShowError] = useState(false);

  const selectedValue =
    options.find((opt) => String(opt.value) === String(value)) || null;


  const labelFloating = isFocused || !!selectedValue;

  const handleChange = (selectedOption) => {
    setShowError(false);
    if (typeof onChange === "function") {
      onChange({
        target: {
          name,
          value: selectedOption ? selectedOption.value : "",
        },
      });
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Mostra erro se não tiver valor selecionado — igual ao onBlur do Input
    if (!selectedValue) setShowError(true);
  };

  return (
    <div
      className={`${styles.wrapper} ${showError ? styles.wrapperError : ""} ${inputClassName || ""}`}
    >
      <Select
        options={options}
        value={selectedValue}
        onChange={handleChange}
        // Placeholder vazio quando o label está no lugar (mesmo comportamento do input nativo)
        placeholder={labelFloating ? placeholder : ""}
        isClearable={false}
        isSearchable
        isLoading={isLoading}
        isDisabled={isDisabled}
        onFocus={() => { setIsFocused(true); setShowError(false); }}
        onBlur={handleBlur}
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

      {showError && (
        <div className={styles.errorMessage}>Este campo é obrigatório.</div>
      )}
    </div>
  );
}