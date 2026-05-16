

import styles from './page.module.css';
import Sidebar from '@/app/components/Sidebar/sidebar';
import Header from '@/app/components/Header/header';
import CustomTable from '@/app/components/Table/table';

export default function Encomendas() {
    const itens = [
        { texto: "Encomendas", href: "#" }
    ];

    const navItens = [
        { texto: "Todas" },
        { texto: "Pendentes" },
        { texto: "Entregues" },
    ];

    const columns = [
        {
            label: "MORADOR",
            key: "morador",
            render: (value, row) => (
                <div className={styles.user}>
                    <span>{value}</span>
                    <small>{row.email}</small>
                </div>
            )
        },
        {
            label: "DESCRIÇÃO",
            key: "descricao"
        },
        {
            label: "DATA - HORA",
            key: "data",
            render: (value) => (
                <a href="/">
                    {value}
                </a>
            )
        },
        {
            label: "APARTAMENTO",
            key: "apartamento",
            render: (value) => (
                <a href="/">
                    {value}
                </a>
            )
        }
    ];

    // Esses dados são hard-coded só pra testar visual
    const data = [
        {
            morador: "Thiago Fritz",
            email: "fritz@email.com",
            descricao: "Caixa grande de papelão",
            data: "11/02/2020 - 12:09",
            apartamento: "202"
        },
        {
            morador: "Cesar Cohen",
            email: "cesar@email.com",
            descricao: "Mercado Preso",
            data: "15/04/2020 - 22:09",
            apartamento: "403"
        }
    ];

    return (
        <div className={styles.body}>
            <Sidebar itens={itens} />

            <div className={styles.main}>
                <Header titulo="Encomendas registradas" navItens={navItens} />

                <CustomTable
    headerAs="span"
    selectable
    columns={[ // EXEMPLO - O CORRETO SERIA USAR {columns}
        {
            label: "MORADOR",
            key: "morador"
        },
        {
            label: "DESCRIÇÃO",
            key: "descricao"
        },
        {
            label: "DATA - HORA",
            key: "data"
        },
        {
            label: "APARTAMENTO",
            key: "apartamento"
        }
    ]}
    data={data}
/>
            </div>
        </div>
    );
}