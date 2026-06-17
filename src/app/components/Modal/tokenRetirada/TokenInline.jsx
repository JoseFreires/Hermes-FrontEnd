"use client";

import { useRef, useState } from "react";
import styles from "./TokenInline.module.css";

export default function TokenInline({ value = "", onChange, onReenviar }) {
    const digits = [
        value[0] ?? "",
        value[1] ?? "",
        value[2] ?? "",
        value[3] ?? "",
    ];
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];

    const emitChange = (next) => onChange?.(next.join(""));

    const handleChange = (index, e) => {
        const val = e.target.value.replace(/\D/g, "").slice(-1);
        const next = [...digits];
        next[index] = val;
        emitChange(next);
        if (val && index < 3) inputRefs[index + 1].current?.focus();
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
        const next = ["", "", "", ""];
        pasted.split("").forEach((c, i) => { next[i] = c; });
        emitChange(next);
        inputRefs[Math.min(pasted.length, 3)].current?.focus();
    };

    return (
        <div className={styles.wrapper}>
            <p className={styles.label}>Token da encomenda</p>
            <p className={styles.hint}>O código foi enviado ao e-mail do morador</p>

            <div className={styles.digitRow} onPaste={handlePaste}>
                {digits.map((d, i) => (
                    <input
                        key={i}
                        ref={inputRefs[i]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={(e) => handleChange(i, e)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        className={`${styles.digitInput} ${d ? styles.digitFilled : ""}`}
                    />
                ))}
            </div>

            <button type="button" className={styles.reenviarLink} onClick={onReenviar}>
                Não recebeu? Clique para reenviar.
            </button>
        </div>
    );
}
