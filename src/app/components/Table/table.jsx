"use client";

import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../auth.js";
import styles from "./table.module.css";

export default function CustomTable({
    columns = [],
    data = [],
    footer = true,
    totalRows = 0,
    headerAs = "div"
}) {

    // estados para controle de paginação, seleção de linhas e quantidade de linhas por página
    const [currentPage, setCurrentPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(1);
    const [selectedRows, setSelectedRows] = React.useState([]);

    // refs para pegar a altura do wrapper da tabela e da linha, 
    // para calcular quantas linhas cabem na tela e setar isso no estado de rowsPerPage
    const tableWrapperRef = React.useRef(null);
    const rowRef = React.useRef(null);

    React.useEffect(() => {

        if (!tableWrapperRef.current || !rowRef.current) return;

        const wrapperHeight = tableWrapperRef.current.clientHeight;
        const rowHeight = rowRef.current.clientHeight;

        const calculatedRows = Math.floor(wrapperHeight / rowHeight);

        setRowsPerPage(calculatedRows);

    }, [data]);

    const { user } = useAuth();

    const showCheckbox =
        user?.permissions?.includes("del_morador");

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const paginatedData = data.slice(startIndex, endIndex);

    const HeaderTag = headerAs;

    // mantém estado (selected) da checkbox da encomenda pelo ID mesmo se mudar de página
    const toggleRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    }

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

            <div ref={tableWrapperRef} className={styles.tableWrapper}>
                <Table hover className={styles.table}>
                    <tbody>
                        {paginatedData.map((row, rowIndex) => (
                            <tr key={row.id} ref={rowIndex === 0 ? rowRef : null}>
                                <td className={styles.checkbox}>
                                    {showCheckbox ? (
                                        <Form.Check type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => toggleRow(row.id)} />
                                    ) : (
                                        <div style={{ width: "16px", height: "16px" }} />
                                    )}
                                </td>

                                {/* esse render é para fazer o inject dos dados que vem do backend, p customizar a renderização de alguma coluna, 
                                é só passar a função de renderização  na definição das colunas, e ela recebe o valor da célula e a linha inteira como parâmetro */}
                                {columns.map((column, columnIndex) => (
                                    <td key={columnIndex} style={{ width: `${100 / columns.length}%` }}>
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
                        Linhas por página: {rowsPerPage}
                    </span>

                    <div className={styles.pagination}>

                        <span>
                            {startIndex + 1}-{Math.min(endIndex, data.length)} de {totalRows || data.length}
                        </span>

                        <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1}>
                            {"<"}
                        </button>

                        <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage === totalPages}>
                            {">"}
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}