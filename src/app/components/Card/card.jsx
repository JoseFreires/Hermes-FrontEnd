import styles from "./card.module.css";
import Image from "next/image";
import { formatDateTime } from "@/app/hooks/formatar";

export default function Card({ encomendaData = {}, searchValue = "" }) {
    const getStatusClass = (status) => {
        switch (String(status || "").toLowerCase()) {
            case "pendente":
            case "a retirar":
                return styles.statusPending;
            case "entregue":
            case "retirado":
                return styles.statusDelivered;
            default:
                return styles.statusDefault;
        }
    };

    const normalizeText = (text) =>
        String(text || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    const search = normalizeText(searchValue);

    const matchesSearch =
        !search ||
        normalizeText(encomendaData.nomePacote).includes(search) ||
        normalizeText(encomendaData.numeroApartamento).includes(search) ||
        normalizeText(encomendaData.status).includes(search);

    if (!matchesSearch) {
        return null;
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <div className={styles.icon}>
                    <Image src="/img/box.svg" alt="Encomenda" width={70} height={70} />
                </div>

                <div className={styles.info}>
                    <span className={styles.titulo}>{encomendaData.nomePacote}</span>

                    <span className={styles.date}>
                        {formatDateTime(encomendaData.dataHoraRecebido)}
                    </span>

                    <p className={styles.apartment}>
                        Apto. {encomendaData.numeroApartamento}
                    </p>

                    <div className={styles.statusContainer}>
                        <span className={styles.statusLabel}>STATUS:</span>

                        <span
                            className={`${styles.statusBadge} ${getStatusClass(encomendaData.status)}`}
                        >
                            <span className={styles.statusDot}></span>
                            {encomendaData.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
