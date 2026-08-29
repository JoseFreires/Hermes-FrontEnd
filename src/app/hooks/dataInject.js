import { formatDateTime } from "./formatar";
import styles from "@/app/pages/encomendas/page.module.css";

export function InjectEncomendasTable() {
  return [
    {
      label: "MORADOR",
      key: "nomeMorador",
      render: (value, row) => (
        <div className={styles.user}>
          <span>{value}</span>
          <small>{row.emailDestinatario}</small>
        </div>
      ),
    },
    {
      label: "NOME DO PACOTE",
      key: "nomePacote",
    },
    {
      label: "DATA - HORA",
      key: "dataHoraRecebido",
      render: (value) => <p className={styles.tableLine}>{formatDateTime(value)}</p>,
    },
    {
      label: "APARTAMENTO",
      key: "numeroApartamento",
      render: (value) => <p className={styles.tableLine}>{value}</p>,
    },
  ];
}

export function InjectMoradoresTable() {
  return [
    {
    label: "NOME",
    key: "nome",
    render: (value, row) => (
      <div className={styles.user}>
        <span>{value}</span>
        <small>{row.email}</small>
      </div>
    ),
  },
  {
    label: "TELEFONE",
    key: "telefone",
  },
  {
    label: "APARTAMENTO",
    key: "numeroApartamento",
  },
  {
    label: "BLOCO",
    key: "bloco"
  },
]
}

export function InjectPorteirosTable() {
  return [
    {
      label: "NOME",
      key: "nomeCompleto",
      render: (value, row) => (
        <div className={styles.user}>
          <span>{value}</span>
          <small>{row.email}</small>
        </div>
      ),
    },
    {
      label: "TELEFONE",
      key: "telefone",
    },
    {
      label: "TURNO",
      key: "turno",
      render: (value) => (
        <p className={styles.tableLine}>
          {{ MANHA: "Manhã", TARDE: "Tarde", NOITE: "Noite" }[value] ?? value}
        </p>
      ),
    },
    {
      label: "EMPRESA",
      key: "empresaResponsavel",
      render: (value) => <p className={styles.tableLine}>{value}</p>,
    },
  ];
}
 
export function InjectSindicosTable() {
  return [
    {
      label: "NOME",
      key: "nomeCompleto",
      render: (value, row) => (
        <div className={styles.user}>
          <span>{value}</span>
          <small>{row.email}</small>
        </div>
      ),
    },
    {
      label: "TELEFONE",
      key: "telefone",
    },
    {
      label: "NASCIMENTO",
      key: "dataNascimento",
      render: (value) => (
        <p className={styles.tableLine}>
          {value ? new Date(value).toLocaleDateString("pt-BR") : "—"}
        </p>
      ),
    },
    {
      label: "STATUS",
      key: "ativo",
      render: (value) => (
        <span className={`badge ${value ? "bg-success" : "bg-secondary"}`}>
          {value ? "Ativo" : "Inativo"}
        </span>
      ),
    },
  ];
}