export const NAV_ITENS = [{ texto: "Todas" }, { texto: "Pendentes" }, { texto: "Entregues" }];

const TAB_FILTERS = {
    Todas: () => true,
    Pendentes: (item) => item.status === "Pendente" || item.status === "PENDENTE" || item.status === "Pendentes" || item.status === "PENDENTES",
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
    const tabFilter = TAB_FILTERS[activeTab] ?? TAB_FILTERS.Todas;

    return (data || [])
        .filter(tabFilter)
        .filter((item) => {
            if (filters.selectedUsers.length && !filters.selectedUsers.includes(item.nomeMorador)) {
                return false;
            }
            return matchesDateRange(item, filters);
        });
}
