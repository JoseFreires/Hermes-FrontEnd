import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import users from "@/DATA/users.json";

export async function GET() {
    // Pega o cookie que foi salvo no login
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("hermes_session");
    
    if (!sessionCookie) {
        return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
    }

    // Extrai o ID do usuário a partir do token falso ("token-fake-1" -> 1)
    const userId = parseInt(sessionCookie.value.split("-")[2]);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return NextResponse.json({ message: "Usuário não encontrado." }, { status: 404 });
    }

    // Retorna os dados do usuário, mas NUNCA a senha
    const { senha, ...safeUserData } = user;

    return NextResponse.json(safeUserData, { status: 200 });
}