"use client";

import { useRef, useState } from "react";
import styles from "./sidebar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/auth.js";
import { useRouter } from "next/navigation";
export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const touchStartX = useRef(null);
    const touchCurrentX = useRef(null);
    const { user } = useAuth();
    const signOut = useAuth().signOut;
    const router = useRouter();
    const adminOnly = user?.role.includes("ROLE_ADMIN");
    const sindicoView = user?.role.includes("ROLE_ADMIN") || user?.role.includes("ROLE_SINDICO");
    const porteiroView = user?.role.includes("ROLE_PORTEIRO") || user?.role.includes("ROLE_ADMIN") || user?.role.includes("ROLE_SINDICO");
    const moradorView = user?.role.includes("ROLE_MORADOR");

    const handleLogout = async () => {
        try {
            await signOut(); // Chama a função que limpa o cookie no backend
            router.push("./../pages/login"); // Redireciona para a tela de login
        } catch (error) {
            console.error("Erro ao sair:", error);
        }
    };
    
    const handleTouchStart = (event) => {
        touchStartX.current = event.touches[0].clientX;
        touchCurrentX.current = touchStartX.current;
    };

    const handleTouchMove = (event) => {
        if (touchStartX.current !== null) {
            touchCurrentX.current = event.touches[0].clientX;
        }
    };

    const handleTouchEnd = () => {
        if (touchStartX.current !== null && touchCurrentX.current - touchStartX.current > 70) {
            setIsOpen(false);
        }
        touchStartX.current = null;
        touchCurrentX.current = null;
    };

    return (
        <>
            <button
                className={styles.menuToggle}
                onClick={() => setIsOpen(true)}
                type="button"
                aria-label="Abrir menu"
            >
                ☰
            </button>

            <div
                className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >

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
                <button onClick={() => handleLogout()} className={styles.link}>
                    <Image src="/img/exitIcon.png" alt="Sair" width={24} height={24} />
                </button>
            </div>
        </div>

        {isOpen && <div className={styles.backdrop} onClick={() => setIsOpen(false)} />}
        </>
    );
}