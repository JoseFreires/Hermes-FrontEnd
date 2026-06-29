export const NAV_ITENS = [{ texto: "Recebidas" }, { texto: "Entregues" }];

const TAB_FILTERS = {
    Recebidas: (item) => item.status === "Recebida" || item.status === "RECEBIDA" || item.status === "Recebidas" || item.status === "RECEBIDAS",
    Entregues: (item) => item.status === "Entregue" || item.status === "ENTREGUE" || item.status === "Entregues" || item.status === "ENTREGUES",
};

function parseItemDate(value) {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
}

function matchesDateRange(item, filters) {
    if (!filters.startDate && !filters.endDate) return true;

    const itemDate = parseItemDate(item.dataHoraRecebido);
    if (!itemDate) return false;

    if (filters.startDate && itemDate < new Date(filters.startDate)) return false;

    if (filters.endDate) {
        const end = new Date(filters.endDate);
        end.setHours(23, 59, 59, 999);
        if (itemDate > end) return false;
    }

    return true;
}

export function extractFilterUsers(data) {
    return Array.from(new Set((data || []).map((item) => item.nomeMorador))).sort();
}

export function filterEncomendas(data, activeTab, filters) {
    const tabFilter = TAB_FILTERS[activeTab] ?? TAB_FILTERS.Recebidas;

    return (data || [])
        .filter(tabFilter)
        .filter((item) => {
            if (filters.selectedUsers.length && !filters.selectedUsers.includes(item.nomeMorador)) {
                return false;
            }
            return matchesDateRange(item, filters);
        });
}

// ─── Porteiros ────────────────────────────────────────────────────────────────
 
export const NAV_ITENS_FUNCIONARIOS = [
    { texto: "Porteiros" },
    { texto: "Sindicos" },
];
 
export function extractFilterFuncionarios(data) {
    return Array.from(new Set((data ?? []).map((item) => item.nomeCompleto))).sort();
}
 
export function filterPorteiros(data) {
    return (data ?? []);   // lista já vem filtrada do backend — todos são porteiros
}

// ─── Síndicos ─────────────────────────────────────────────────────────────────
 
export function extractFilterSindicos(data) {
    return Array.from(new Set((data ?? []).map((item) => item.nomeCompleto))).sort();
}
 
export function filterSindicos(data) {
    return (data ?? []);   // lista já vem filtrada do backend — todos são síndicos
}
 
// ─── Moradores ────────────────────────────────────────────────────────────────
 
export const NAV_ITENS_MORADORES = [
    { texto: "Todos" },
];
 
export function extractFilterMoradores(data) {
    return Array.from(new Set((data ?? []).map((item) => item.nome))).sort();
}
 
export function filterMoradores(data) {
    return (data ?? []);
}