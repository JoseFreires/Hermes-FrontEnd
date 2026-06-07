import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    // Deleta o cookie de sessão
    const cookieStore = await cookies();
    cookieStore.delete("hermes_session");

    return NextResponse.json({ message: "Logout realizado com sucesso." }, { status: 200 });
}