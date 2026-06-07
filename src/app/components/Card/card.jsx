import styles from "./card.module.css";
import Image from "next/image";

export default function Card({
    packageData = [],
    searchValue = "",
}) {

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case "a retirar":
                return styles.statusPending;

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
        normalizeText(packageData.titulo).includes(search) ||
        normalizeText(packageData.apartamento).includes(search) ||
        normalizeText(packageData.status).includes(search);

    if (!matchesSearch) {
        return null;
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <div className={styles.icon}>
                    <Image src="/img/box.svg" alt="Package Icon" width={70} height={70} />
                </div>

                <div className={styles.info}>
                    <span className={styles.titulo}>
                        {packageData.titulo}
                    </span>

                    <span className={styles.date}>
                        {packageData.dataRecebimento}
                    </span>

                    <p className={styles.apartment}>
                        Apto. {packageData.apartamento}
                    </p>

                    <div className={styles.statusContainer}>
                        <span className={styles.statusLabel}>
                            STATUS:
                        </span>

                        <span
                            className={`${styles.statusBadge} ${getStatusClass(
                                packageData.status
                            )}`}
                        >
                            <span className={styles.statusDot}></span>
                            {packageData.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}