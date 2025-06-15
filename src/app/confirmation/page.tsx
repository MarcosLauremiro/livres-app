"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"success" | "error" | "loading">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const statusParam = searchParams.get("status");
    const messageParam = searchParams.get("message");

    if (statusParam === "success") {
      setStatus("success");
      setMessage(messageParam || "Cadastro realizado com sucesso!");
    } else if (statusParam === "error") {
      setStatus("error");
      setMessage(messageParam || "Ocorreu um erro no cadastro.");
    } else {
      // Se não tem parâmetros, redireciona para o início
      router.push("/");
    }
  }, [searchParams, router]);

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleTryAgain = () => {
    router.push("/register");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6">
            <h2 className="text-3xl font-bold text-white text-center">
              {status === "success" ? "Sucesso!" : "Ops!"}
            </h2>
            <p className="text-orange-100 text-center mt-2">
              {status === "success"
                ? "Seu cadastro foi processado"
                : "Algo deu errado"}
            </p>
          </div>

          <div className="px-8 py-8 text-center">
            {/* Ícone */}
            <div className="mb-6">
              {status === "success" ? (
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Mensagem */}
            <div className="mb-8">
              <h3
                className={`text-xl font-semibold mb-3 ${
                  status === "success" ? "text-green-700" : "text-red-700"
                }`}
              >
                {status === "success"
                  ? "Cadastro Realizado!"
                  : "Falha no Cadastro"}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{message}</p>

              {status === "success" && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-700 text-sm">
                    ✅ Seus dados foram salvos com sucesso!
                    <br />
                    📧 Você receberá mais informações em breve.
                  </p>
                </div>
              )}
            </div>

            {/* Botões */}
            <div className="space-y-3">
              {status === "success" ? (
                <button
                  onClick={handleBackToHome}
                  className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  Voltar ao Início
                </button>
              ) : (
                <>
                  <button
                    onClick={handleTryAgain}
                    className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    Tentar Novamente
                  </button>
                  <button
                    onClick={handleBackToHome}
                    className="w-full py-3 px-6 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    Voltar ao Início
                  </button>
                </>
              )}
            </div>

            {/* Footer info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                {status === "success"
                  ? "Obrigado por se cadastrar! Aguarde mais informações."
                  : "Se o problema persistir, entre em contato conosco."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
