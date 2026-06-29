// Configuração de campos por role.
// Cada campo: { name, label, placeholder, type, options? }
// name deve bater EXATAMENTE com o campo do JSON do backend.

export const porteiroFields = [
  { name: "nomeCompleto",      label: "Nome completo",        placeholder: "Ex: Carlos Souza",        type: "text"  },
  { name: "cpf",               label: "CPF",                  placeholder: "00000000000",              type: "text"  },
  { name: "email",             label: "E-mail",               placeholder: "email@exemplo.com",        type: "email" },
  { name: "telefone",          label: "Telefone",             placeholder: "11999999999",              type: "tel"   },
  {
    name: "turno",
    label: "Turno",
    placeholder: "Selecione o turno",
    type: "select",
    // Valores enum do backend
    options: [
      { value: "MANHA",  label: "Manhã"  },
      { value: "TARDE",  label: "Tarde"  },
      { value: "NOITE",  label: "Noite"  },
    ],
  },
  { name: "empresaResponsavel", label: "Empresa Responsável", placeholder: "Ex: Seguradora Alfa",     type: "text"  },
];

export const sindicoFields = [
  { name: "nomeCompleto",   label: "Nome completo",      placeholder: "Ex: Roberto Oliveira",  type: "text"  },
  { name: "cpf",            label: "CPF",                placeholder: "00000000000",           type: "text"  },
  { name: "email",          label: "E-mail",             placeholder: "email@exemplo.com",     type: "email" },
  { name: "telefone",       label: "Telefone",           placeholder: "11999999999",           type: "tel"   },
  { name: "dataNascimento", label: "Data de nascimento", placeholder: "",                      type: "date"  },
];

export const moradorFields = [
  { name: "nome",              label: "Nome completo",         placeholder: "Ex: Mariana Silva",     type: "text"  },
  { name: "cpf",               label: "CPF",                   placeholder: "00000000000",           type: "text"  },
  { name: "email",             label: "E-mail",                placeholder: "email@exemplo.com",     type: "email" },
  { name: "telefone",          label: "Telefone",              placeholder: "11999999999",           type: "tel"   },
  { name: "numeroApartamento", label: "Número do Apartamento", placeholder: "Ex: 101",               type: "text"  },
  { name: "bloco",             label: "Bloco / Torre",         placeholder: "Ex: Torre Alpha",       type: "text"  },
  { name: "dataChegada",       label: "Data de chegada",       placeholder: "",                      type: "date"  },
  { name: "nascimento",        label: "Data de nascimento",    placeholder: "",                      type: "date"  },
];
