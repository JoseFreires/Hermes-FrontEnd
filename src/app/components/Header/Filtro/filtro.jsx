"use client";

import { useEffect, useRef, useState } from "react";
import { FunnelFill } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import Button from "../../Button/button";
import Input from "../../Input/Input";
import Dropdown from "../../Input/Dropdown/Dropdown";
import styles from "../header.module.css";

export default function Filtro({ users = [], filters = {}, onFiltersChange }) {
  const [open, setOpen] = useState(false);
  const [localSelectedUsers, setLocalSelectedUsers] = useState(filters.selectedUsers || []);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  useEffect(() => {
    setLocalSelectedUsers(filters.selectedUsers || []);
  }, [filters.selectedUsers]);

  const toggleOpen = () => {
    setOpen((current) => !current);
  };

  const handleUsersChange = (event) => {
    const nextUser = event.target.value;
    if (!nextUser) return;

    setLocalSelectedUsers((current) =>
      current.includes(nextUser) ? current : [...current, nextUser]
    );

    event.target.value = "";
  };

  const readDateInputs = () => {
    const inputs = wrapperRef.current?.querySelectorAll("input[type='date']") || [];
    return {
      startDate: inputs[0]?.value || "",
      endDate: inputs[1]?.value || "",
    };
  };

  const handleApply = () => {
    const { startDate, endDate } = readDateInputs();
    onFiltersChange?.({
      ...filters,
      selectedUsers: localSelectedUsers,
      startDate,
      endDate,
    });
    setOpen(false);
  };

  const handleClear = () => {
    setLocalSelectedUsers([]);
    onFiltersChange?.({
      ...filters,
      selectedUsers: [],
      startDate: "",
      endDate: "",
    });
  };

  const userOptions = users.map((user) => ({ id: user, nome: user }));

  return (
    <div className={styles.filterWrapper} ref={wrapperRef}>
      <Button
        variant="highlight"
        className={`d-flex align-items-center gap-2 border ${styles.filtroButton}`}
        onClick={toggleOpen}
      >
        <FunnelFill />
        Filtro
      </Button>

      {open && (
        <div className={styles.filterPanel}>
          <div className={styles.filterPanelHeader}>
            <span>Filtrar por</span>
          </div>

          <div className={styles.filterPanelField}>
            <Input
              type="date"
              Label="Período inicial"
              placeholder=""
              inputClassName=""
              defaultValue={filters.startDate}
              key={`start-${filters.startDate}`}
            />

            <Input
              type="date"
              Label="Período final"
              placeholder=""
              inputClassName=""
              defaultValue={filters.endDate}
              key={`end-${filters.endDate}`}
            />

            <Form.Label>Selecionar usuários</Form.Label>
            <Dropdown
              options={userOptions}
              value=""
              onChange={handleUsersChange}
              placeholder="Adicionar usuário"
              inputClassName=""
              variant="Default"
            />
            {localSelectedUsers.length > 0 && (
              <div className={styles.selectedUsersList}>
                {localSelectedUsers.map((user) => (
                  <span key={user} className={styles.selectedUserItem}>
                    {user}
                  </span>
                ))}
              </div>
            )}
          </div>
           
          <div className={styles.filterPanelActions}>
            <Button variant="secondary" onClick={handleClear}>
              Limpar
            </Button>
            <Button variant="primary" onClick={handleApply}>
              Aplicar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
