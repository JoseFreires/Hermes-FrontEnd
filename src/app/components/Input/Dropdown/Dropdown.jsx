'use client';

import Select from 'react-select';
import styles from "./Dropdown.module.css";

export default function Dropdown({
  options = [],
  label,
  value,
  onChange,
  inputClassName,
  placeholder = "Selecione uma opção",
  variant = "Default",
}) {
  // Converter formato { id, nome } para { value, label }
  const reactSelectOptions = options.map((option) => ({
    value: option.id,
    label: option.nome,
  }));

  const selectedValue = reactSelectOptions.find(
    (option) => String(option.value) === String(value)
  );

  const handleChange = (selectedOption) => {
    if (selectedOption && typeof onChange === "function") {
      onChange({ target: { value: selectedOption.value } });
    }
  };

  const variants = {
    Default: styles.default,
    Active: styles.active,
    Error: styles.error,
    Disabled: styles.disabled,
  };

  return (
    <div className={`form-floating mb-4 ${styles.reactSelectOverrides} ${inputClassName || ''}`}>

      <Select
        options={reactSelectOptions}
        value={selectedValue}
        onChange={handleChange}
        placeholder={placeholder}
        isClearable={false}
        isSearchable={true}
        noOptionsMessage={() => "Nenhuma opção encontrada"}
        classNamePrefix="react-select"
      />
    </div>
  );
}
