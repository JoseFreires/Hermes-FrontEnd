"use client";

import styles from "./sidebar.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar({ itens }) {

    return (
        <div className={styles.sidebar}>
            
            <a href="./../pages/home" className={styles.logoLink}>
            <div className={styles.logo}>
                
                <Image src="/img/Projeto HermesLogo.png" alt="Logo" width={80} height={80} />
                <h1>Hermes</h1>
                
            </div>
            </a>
{/*
em caso de duvida de como isso aqui funciona (como eu tive):
key é pro react controlar a lista;
o <item.Icon /> é pra renderizar o item.Icon, && é pra evitar erro caso não tenha icon
*/}
            {itens.map((item, i) => (
                <Link key={i} href={item.href} className={styles.link}>
                    <div key={i} className={styles.item}>
                        {item.Icon && <item.Icon />}
                        <span>{item.texto}</span>
                    </div>
                </Link>
            ))}


            <div className={styles.exitbutton}>
                <Link href="./../pages/login" className={styles.link}>
                        <Image src="/img/exitIcon.png" alt="Sair" width={24} height={24} />

                </Link>
            </div>
        </div>
    );
}