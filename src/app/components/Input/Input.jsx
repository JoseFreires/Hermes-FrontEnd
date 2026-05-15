// components/Input/Input.jsx

import styles from "./input.module.css";


export default function Input({type,onChange, placeholder, inputClassName, Label,}) {
    const variants = {
        Default: styles.default,
        Active: styles.active,
        Error: styles.secondary,
        Disabled: styles.baixaPrioridade
    };
    return (
        <div className="form-floating mb-3">
            <input
                type={type}
                className={`form-control rounded-3 ${inputClassName}`}
                id="floatingInput"
                placeholder={placeholder}
            />
            <label htmlFor="floatingInput">{Label}</label>
        </div>
    );
}
