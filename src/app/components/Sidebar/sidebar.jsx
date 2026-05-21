"use client";

import styles from "./sidebar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/auth.js";

export default function Sidebar() {

    const { user } = useAuth();

    const adminOnly = user?.papel?.includes("Admin");
    const sindicoView = user?.papel?.includes("Admin") || user?.papel?.includes("Sindico");
    const porteiroView = user?.papel?.includes("Porteiro") || user?.papel?.includes("Admin") || user?.papel?.includes("Sindico");
    const moradorView = user?.papel?.includes("Morador");

    return (
        <div className={styles.sidebar}>

            <a href="./../pages/home" className={styles.logoLink}>
                <div className={styles.logo}>

                    <Image src="/img/Projeto HermesLogo.png" alt="Logo" width={80} height={80} />
                    <h1>Hermes</h1>

                </div>
            </a>

            {moradorView && (
                <Link href="./../pages/meus-pacotes" className={styles.link}>
                    <div className={styles.item}>
                        <Image src="/img/box.svg" alt="Sidebar Icon" width={24} height={24} />
                        <span>Meus Pacotes</span>
                    </div>
                </Link>
            )}

            {porteiroView && (
                <Link href="./../pages/encomendas" className={styles.link}>
                    <div className={styles.item}>
                        <Image src="/img/box.svg" alt="Sidebar Icon" width={24} height={24} />
                        <span>Encomendas</span>
                    </div>
                </Link>
            )}

            {porteiroView && (
            <Link href="./../pages/moradores" className={styles.link}>
                <div className={styles.item}>
                    <Image src="/img/moradores.svg" alt="Sidebar Icon" width={24} height={24} />
                    <span>Moradores</span>
                </div>
            </Link>
            )}

            {sindicoView && (
                <Link href="./../pages/funcionarios" className={styles.link}>
                    <div className={styles.item}>
                        <Image src="/img/func.svg" alt="Sidebar Icon" width={24} height={24} />
                        <span>Funcionários</span>
                    </div>
                </Link>
            )}


            {adminOnly && (
                <Link href="./../pages/logs" className={styles.link}>
                    <div className={styles.item}>
                        <Image src="/img/log.svg" alt="Sidebar Icon" width={24} height={24} />
                        <span>Logs</span>
                    </div>
                </Link>
            )}

            <div className={styles.exitbutton}>
                <Link href="./../pages/login" className={styles.link}>
                    <Image src="/img/exitIcon.png" alt="Sair" width={24} height={24} />

                </Link>
            </div>
        </div>
    );
}