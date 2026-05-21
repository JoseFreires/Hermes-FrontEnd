"use client";

import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "../Button/button";
import styles from "./table.module.css";

export default function CustomTable({
    columns = [],
    data = [],
    footer = true,
    totalRows = 0,
    headerAs = "div",
    searchValue = "",
    canRemove = false,
}) {

    // estados para controle de paginação, seleção de linhas e quantidade de linhas por página
    const [currentPage, setCurrentPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(1);
    const [selectedRows, setSelectedRows] = React.useState([]);

    // refs para pegar a altura do wrapper da tabela e da linha, 
    // calcular quantas linhas cabem na tela e setar isso no estado de rowsPerPage
    const tableWrapperRef = React.useRef(null);
    const rowRef = React.useRef(null);

    React.useEffect(() => {

        if (!tableWrapperRef.current || !rowRef.current) return;

        const wrapperHeight = tableWrapperRef.current.clientHeight;
        const rowHeight = rowRef.current.clientHeight;

        const calculatedRows = Math.floor(wrapperHeight / rowHeight);

        setRowsPerPage(calculatedRows);
    }, [data]);

    const normalizeText = (text) =>
        String(text)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

    const filteredData = data.filter((row) =>

        columns.some((column) => {
            const value = row[column.key];

            return normalizeText(value).includes(normalizeText(searchValue));
        })
    );
    
    // paginação
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const paginatedData = filteredData.slice(startIndex, endIndex);

    const HeaderTag = headerAs;

    // mantém estado (selected) da checkbox da encomenda pelo ID mesmo se mudar de página
    const toggleRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    }

    return (

        <div className={styles.componentWrapper}>

            {canRemove && selectedRows.length > 0 && (
                <div className={styles.deleteContainer}>
                    <div className={styles.deleteWrapper}>
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.399805" y="0.399805" width="32.8" height="32.8" rx="6.11429" stroke="#F1F1F1" strokeWidth="0.8" />
                            <path d="M12.4158 24.7998C11.9678 24.7998 11.5865 24.6425 11.2718 24.3278C10.9571 24.0131 10.7998 23.6321 10.7998 23.1848V10.7998H9.7998V9.79979H13.7998V9.02979H19.7998V9.79979H23.7998V10.7998H22.7998V23.1848C22.7998 23.6448 22.6458 24.0291 22.3378 24.3378C22.0298 24.6465 21.6451 24.8005 21.1838 24.7998H12.4158ZM21.7998 10.7998H11.7998V23.1848C11.7998 23.3641 11.8575 23.5115 11.9728 23.6268C12.0881 23.7421 12.2358 23.7998 12.4158 23.7998H21.1848C21.3381 23.7998 21.4791 23.7358 21.6078 23.6078C21.7365 23.4798 21.8005 23.3385 21.7998 23.1838V10.7998ZM14.6078 21.7998H15.6078V12.7998H14.6078V21.7998ZM17.9918 21.7998H18.9918V12.7998H17.9918V21.7998Z" fill="#F1F1F1" />
                        </svg>

                        <span> Deseja deletar {selectedRows.length} {selectedRows.length === 1 ? "item" : "itens"}?</span>
                    </div>

                    <Button variant="critical"> Excluir</Button>
                </div>
            )}

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
                                        {canRemove ? (
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
                                {startIndex + 1}-{Math.min(endIndex, filteredData.length)} de {totalRows || filteredData.length}
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
        </div>
    );
}