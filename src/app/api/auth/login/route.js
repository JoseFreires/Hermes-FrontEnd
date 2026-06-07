import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import users from "@/DATA/users.json"; // Ajuste o caminho se necessário

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, senha } = body;

        // Busca o usuário no JSON falso
        const user = users.find(u => u.username === username && u.senha === senha);

        if (!user) {
            return NextResponse.json(
                { message: "Usuário ou senha inválidos." },
                { status: 401 }
            );
        }

        // Simula a criação de um token de sessão
        const fakeToken = `token-fake-${user.id}`;

        // Salva o cookie de forma segura (simulando um HttpOnly cookie do backend real)
        const cookieStore = await cookies();

        cookieStore.set({
            name: "hermes_session",
            value: fakeToken,
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24, // 1 dia
        });

        return NextResponse.json({ 
            message: "Login realizado com sucesso.",
            user: {
                id: user.id,
                nome: user.nome,
                username: user.username,
                roles: user.roles // Envia as permissões vindas do arquivo JSON
            }
        }, { status: 200 });
    } catch (error) {
        
        return NextResponse.json({ message: "Erro interno no servidor." }, { status: 500 });
    }
}