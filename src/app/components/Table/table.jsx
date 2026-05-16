"use client";

import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../auth.js";
import styles from "./table.module.css";

export default function CustomTable({
    columns = [],
    data = [],
    navItens = [],
    footer = true,
    rowsPerPage = 10,
    totalRows = 0,
    headerAs = "div"
}) {

    const [activeTab, setActiveTab] = React.useState("");

    React.useEffect(() => {

        if (navItens?.length > 0) {
            setActiveTab(navItens[0].texto);
        }

    }, [navItens]);

    const { user } = useAuth();

    const showCheckbox =
        user?.permissions?.includes("del_morador"); // Checar nome das permissões que vem no payload do token

    const HeaderTag = headerAs;

    return (
        <div className={styles.container}>

            <div className={styles.header}>

                <table className={styles.headerTable}>
                    <thead>
                        <tr>
                                <th className={styles.checkbox}></th>
                            {columns.map((column, index) => (
                                <th key={index} style={{ width: `${100 / columns.length}%` }}>
                                    <HeaderTag className={styles.headerItem}>
                                        {column.label}
                                    </HeaderTag>
                                </th>
                            ))}
                        </tr>
                    </thead>
                </table>

            </div>

            <div className={styles.tableWrapper}>
                <Table hover responsive className={styles.table}>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {showCheckbox && (
                                    <td className={styles.checkbox}>
                                        <Form.Check type="checkbox" />
                                    </td>
                                )}

                            {/* esse render é para fazer o inject dos dados que vem do backend, p customizar a renderização de alguma coluna, é só 
                                passar a função de renderização na definição das colunas, e ela recebe o valor da célula e a linha inteira como parâmetro */}
                                {columns.map((column, columnIndex) => (
                                    <td key={columnIndex} style={{ width: `${100 / columns.length}%` }} >
                                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {footer && (
                <div className={styles.footer}>
                    <span>
                        Colunas por página: {rowsPerPage}
                    </span>
                    <div className={styles.pagination}>
                        <span>
                            1-{data.length} of {totalRows || data.length}
                        </span>

                        <button>{"<"}</button>
                        <button>{">"}</button>

                    </div>
                </div>
            )}

        </div>
    );
}