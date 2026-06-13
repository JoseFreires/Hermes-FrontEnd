"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./Dropdown.module.css";
import { listMorador } from "@/app/services/Morador/GET.js";

function mapToReactSelectOptions(items = []) {
  return items.map((option) => ({
    value: option.id ?? option.idUsuario ?? option.ID ?? option.Id,
    label:
      option.nomeMorador ?? option.nome ?? option.name ?? String(option.value ?? option.id ?? option.idUsuario ?? ""),
  }));
}

export default function Dropdown({
  options = null,
  value,
  onChange,
  inputClassName,
  placeholder = "Selecione uma opção",
}) {
  const [fetchedOptions, setFetchedOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (options != null) return;

    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const data = await listMorador();
        if (!mounted) return;
        if (data && Array.isArray(data)) setFetchedOptions(data);
        else setFetchedOptions([]);
      } catch (err) {
        console.error("Erro ao buscar moradores:", err);
        if (mounted) setFetchedOptions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [options]);

  const sourceOptions = options ?? fetchedOptions;
  const reactSelectOptions = mapToReactSelectOptions(sourceOptions || []);

  const selectedValue = reactSelectOptions.find((opt) => String(opt.value) === String(value)) || null;

  const handleChange = (selectedOption) => {
    if (typeof onChange === "function") {
      onChange({ target: { value: selectedOption ? selectedOption.value : "" } });
    }
  };

  return (
    <div className={`form-floating mb-4 ${styles.reactSelectOverrides} ${inputClassName || ""}`}>
      <Select
        options={reactSelectOptions}
        value={selectedValue}
        onChange={handleChange}
        placeholder={placeholder}
        isClearable={false}
        isSearchable
        isLoading={loading}
        noOptionsMessage={() => (loading ? "Carregando..." : "Nenhuma opção encontrada")}
        classNamePrefix="react-select"
      />
    </div>
  );
}
