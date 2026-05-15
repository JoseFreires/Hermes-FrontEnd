

import styles from './page.module.css';
import Sidebar from '@/app/components/Sidebar/sidebar';
import Header from '@/app/components/Header/header';

export default function Encomendas() {
    const itens = [
        { texto: "Encomendas", href: "#" }
    ];

    const navItens = [
        { texto: "Todas" },
        { texto: "Pendentes" },
        { texto: "Entregues" },
        { texto: "Canceladas" },
    ];

    return (
        <div className={styles.body}>
            <Sidebar itens={itens} />

            <div className={styles.main}>
                <Header titulo="Encomendas registradas" navItens={navItens} />
            </div>
        </div>
    );
}