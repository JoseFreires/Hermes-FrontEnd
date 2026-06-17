"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./Dropdown.module.css";
import { listMorador } from "@/app/services/Morador/GET.js";

function getPessoaId(morador) {
  return (
    morador?.idPessoa ??
    morador?.pessoa?.idPessoa ??
    morador?.pessoa?.id ??
    morador?.usuario?.pessoa?.idPessoa ??
    morador?.usuario?.pessoa?.id ??
    morador?.usuario?.idPessoa ??
    null
  );
}

function mapToReactSelectOptions(items = []) {
  if (!Array.isArray(items)) {
    console.warn("Dropdown: A prop 'options' precisa ser um Array.");
    return []; 
  }
  return items
    .map((option) => {
      const idPessoa = getPessoaId(option);

      return {
        value: idPessoa,
        label:
          option.nomeMorador ??
          option.nome ??
          option.name ??
          String(idPessoa ?? ""),
        data: option,
      };
    })
    .filter((option) => option.value !== null && option.value !== undefined);
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

        if (Array.isArray(data)) {
          setFetchedOptions(data);
        } else {
          setFetchedOptions([]);
        }
      } catch (err) {
        console.error("Erro ao buscar moradores:", err);

        if (mounted) {
          setFetchedOptions([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [options]);

  const sourceOptions = options ?? fetchedOptions;

  const reactSelectOptions = mapToReactSelectOptions(sourceOptions || []);

  const selectedValue =
    reactSelectOptions.find(
      (opt) => String(opt.value) === String(value),
    ) || null;

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
      className={`form-floating mb-4 ${styles.reactSelectOverrides} ${
        inputClassName || ""
      }`}
    >
      <Select
        options={reactSelectOptions}
        value={selectedValue}
        onChange={handleChange}
        placeholder={placeholder}
        isClearable={false}
        isSearchable
        isLoading={loading}
        noOptionsMessage={() =>
          loading ? "Carregando..." : "Nenhuma opção encontrada"
        }
        classNamePrefix="react-select"
      />
    </div>
  );
}