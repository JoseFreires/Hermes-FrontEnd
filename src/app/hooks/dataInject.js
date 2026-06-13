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
      label: "DESCRIÇÃO",
      key: "observacao",
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
