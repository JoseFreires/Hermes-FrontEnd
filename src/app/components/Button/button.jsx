// components/Button/index.jsx

"use client";

import styles from "./button.module.css";
import { Button as BootstrapButton } from "react-bootstrap";

export default function Button({ children, variant = "primary", type = "button", disabled = false, onClick, className = "", ...props }) {

    const variants = {
        primary: styles.primary,
        highlight: styles.highlight,
        secondary: styles.secondary,
        baixaPrioridade: styles.lowPriority
    };

    return (
        <BootstrapButton type={type} disabled={disabled} onClick={onClick} className={`${styles.buttonBody} ${variants[variant]} ${className}`} {...props}>
            {children}
        </BootstrapButton>
    );
}