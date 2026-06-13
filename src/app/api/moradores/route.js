import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import users from "@/DATA/users.json";
import moradores from "@/DATA/moradores.json";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("hermes_session");

        if (!sessionCookie) {
            return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
        }

        const userId = parseInt(sessionCookie.value.split("-")[2]);
        const user = users.find((u) => u.id === userId);

        if (!user) {
            return NextResponse.json({ message: "Usuário não encontrado." }, { status: 404 });
        }

        const isAdmin = user.roles.includes("ROLE_ADMIN");
        const isPorteiro = user.roles.includes("ROLE_PORTEIRO");

        if (!isAdmin && !isPorteiro) {
            return NextResponse.json({ message: "Acesso negado." }, { status: 403 });
        }

        return NextResponse.json(moradores, { status: 200 });
    } catch (error) {
        console.error("ERRO DETALHADO NA ROTA /MORADORES:", error);
        return NextResponse.json({ message: "Erro interno no servidor." }, { status: 500 });
    }
}
