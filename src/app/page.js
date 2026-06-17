"use client"; // Obrigatório no Next.js App Router para usar Hooks (useEffect, useRouter)

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const router = useRouter();
  const [mensagem, setMensagem] = useState("Iniciando sistemas...");

  useEffect(() => {
    const verificarSistema = async () => {
      try {
        setMensagem("Verificando conexão com o servidor...");

        //seria interessante pedir pros backboys criarem uma rota pra testar o banco e por aqui
        // const resposta = await fetch("http://localhost:8080/api/health"); 
        // if (!resposta.ok) throw new Error("Servidor offline");

        // tela de carregamento por 2 segundos para simular o processo de inicialização só pra testar
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setMensagem("Tudo pronto! Redirecionando...");

        router.push("/pages/login");

      } catch (erro) {
        // Se o back-end estiver desligado, ele para aqui e avisa o usuário
        setMensagem("Erro: O servidor Back-end parece estar offline.");
        console.error(erro);
      }
    };

    verificarSistema();
  }, [router]); // O array vazio com 'router' garante que isso rode apenas 1 vez ao carregar a página

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      {/* Spinner de carregamento do Bootstrap */}
      <div 
        className="spinner-border text-primary mb-4" 
        role="status" 
        style={{ width: "4rem", height: "4rem" }}
      >
        <span className="visually-hidden">Carregando...</span>
      </div>

      {/* Título de Status */}
      <h2 className="text-secondary fw-bold text-center">
        {mensagem}
      </h2>

      {/* Botão de emergência (caso o redirecionamento falhe ou a internet caia) */}
      {mensagem.includes("Erro") && (
        <button 
          className="btn btn-warning mt-4" 
          onClick={() => window.location.reload()}
        >
          Tentar Novamente
        </button>
      )}
    </div>
  );
}