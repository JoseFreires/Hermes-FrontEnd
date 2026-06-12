import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import users from "@/DATA/users.json";
import packeds from "@/DATA/packages.json"; // O arquivo com os dados das encomendas

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("hermes_session");

        // 1. O usuário está logado? (Autenticação)
        if (!sessionCookie) {
            return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
        }

        const userId = parseInt(sessionCookie.value.split("-")[2]);
        const user = users.find(u => u.id === userId);

        if (!user) {
            return NextResponse.json({ message: "Usuário não encontrado." }, { status: 404 });
        }

        // 2. O usuário tem permissão? (Autorização)
        const isAdmin = user.roles.includes("ROLE_ADMIN");
        const isPorteiro = user.roles.includes("ROLE_PORTEIRO"); // Exemplo de outra role permitida

        if (!isAdmin && !isPorteiro) {
            // O código 403 (Forbidden) significa: "Eu sei quem você é, mas você não pode ver isso"
            return NextResponse.json({ message: "Acesso negado." }, { status: 403 });
        }

        // 3. Se passou pelas duas barreiras, entregamos as encomendas 📦
        return NextResponse.json(packeds, { status: 200 });

    } catch (error) {
        console.error("ERRO DETALHADO NA ROTA /PACKEDS:", error);
        return NextResponse.json({ message: "Erro interno no servidor." }, { status: 500 });
    }
}