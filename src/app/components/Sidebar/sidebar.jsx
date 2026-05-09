"use client";

import styles from "./sidebar.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar({ itens }) {

    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <Image src="/logo.svg" alt="Logo" width={90} height={90} />
                <h1>Hermes</h1>
            </div>
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
        </div>
    );
}