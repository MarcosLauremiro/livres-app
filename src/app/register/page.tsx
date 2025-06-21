"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
require("dotenv").config();

interface UserData {
  name: string;
  dateBirth: string;
  gender: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  churchName: string;
  work: string;
  hosting: boolean;
  imageAuthorization: boolean;
  createdAt?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    dateBirth: "",
    gender: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    churchName: "",
    work: "",
    hosting: false,
    imageAuthorization: false,
  });

  const [loading, setLoading] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [existingUser, setExistingUser] = useState<UserData | null>(null);
  const [showExistingUser, setShowExistingUser] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));

    if (name === "email" && existingUser) {
      setExistingUser(null);
      setShowExistingUser(false);
    }
  };

  const apiUrl = process.env.NEXT_PUBLIC_APIURL;

  const checkEmailExists = async (email: string) => {
    if (!email || !email.includes("@")) return;

    setCheckingEmail(true);
    try {
      const response = await axios.get(
        `${apiUrl}/register/${encodeURIComponent(email)}`
      );
      if (response.data) {
        setExistingUser(response.data);
        setShowExistingUser(true);
        toast.info("Este email já está cadastrado!");
      }
    } catch (error: any) {
      // Se retornar 404, significa que o email não existe (isso é bom)
      if (error.response?.status === 404) {
        setExistingUser(null);
        setShowExistingUser(false);
      }
    } finally {
      setCheckingEmail(false);
    }
  };

  const handleEmailBlur = () => {
    if (form.email) {
      checkEmailExists(form.email);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (existingUser) {
      toast.error("Este email já está cadastrado!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/register`, form);
      toast.success("Cadastro realizado com sucesso!");
      router.push(
        `/confirmation?status=success&message=${encodeURIComponent(
          response.data.message || "Cadastro realizado com sucesso!"
        )}`
      );
    } catch (error: any) {
      let errorMessage = "Ocorreu um erro inesperado";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error("Erro ao realizar o cadastro: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const handleEditExistingUser = () => {
    if (existingUser) {
      setForm({
        name: existingUser.name,
        dateBirth: existingUser.dateBirth,
        gender: existingUser.gender,
        phone: existingUser.phone,
        email: existingUser.email,
        state: existingUser.state,
        city: existingUser.city,
        churchName: existingUser.churchName,
        work: existingUser.work,
        hosting: existingUser.hosting,
        imageAuthorization: existingUser.imageAuthorization,
      });
      setShowExistingUser(false);
      toast.info("Dados carregados para edição");
    }
  };

  if (showExistingUser && existingUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 px-8 py-6">
              <h2 className="text-3xl font-bold text-white text-center">
                Já Cadastrado!
              </h2>
              <p className="text-green-100 text-center mt-2">
                Você já está inscrito na conferência
              </p>
            </div>

            <div className="px-8 py-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">
                        Sua inscrição foi realizada com sucesso!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Informações do usuário */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nome
                    </label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                      {existingUser.name}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                      {existingUser.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Telefone
                    </label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                      {existingUser.phone}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Estado
                      </label>
                      <p className="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                        {existingUser.state}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Cidade
                      </label>
                      <p className="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                        {existingUser.city}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Igreja
                    </label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                      {existingUser.churchName}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ministério
                    </label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                      {existingUser.work}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Hospedagem
                    </label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                      {existingUser.hosting ? "Sim, precisa" : "Não precisa"}
                    </p>
                  </div>

                  {existingUser.createdAt && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Data da Inscrição
                      </label>
                      <p className="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                        {formatDate(existingUser.createdAt)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Botões de ação */}
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => {
                      setShowExistingUser(false);
                      setExistingUser(null);
                      setForm({
                        name: "",
                        dateBirth: "",
                        gender: "",
                        phone: "",
                        email: "",
                        state: "",
                        city: "",
                        churchName: "",
                        work: "",
                        hosting: false,
                        imageAuthorization: false,
                      });
                    }}
                    className="w-full py-3 px-6 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-200"
                  >
                    Novo Cadastro
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              Cadastro
            </h2>
            <p className="text-orange-100 text-center mt-2">
              Preencha seus dados para se cadastrar
            </p>
          </div>

          <div className="px-8 py-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  name="name"
                  placeholder="Digite seu nome completo"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>

              {/* Data de Nascimento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Nascimento
                </label>
                <input
                  name="dateBirth"
                  type="date"
                  value={form.dateBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Gênero */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gênero
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="">Selecione o gênero</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  name="phone"
                  placeholder="(11) 99999-9999"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${
                      existingUser
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                  />
                  {checkingEmail && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                    </div>
                  )}
                </div>
                {existingUser && (
                  <p className="text-sm text-red-600 mt-1">
                    Este email já está cadastrado
                  </p>
                )}
              </div>

              {/* Estado e Cidade */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <input
                    name="state"
                    placeholder="Estado"
                    value={form.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade
                  </label>
                  <input
                    name="city"
                    placeholder="Cidade"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Igreja */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Igreja
                </label>
                <input
                  name="churchName"
                  placeholder="Digite o nome da sua igreja"
                  value={form.churchName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>

              {/* Trabalho */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ministério
                </label>
                <input
                  name="work"
                  placeholder="Qual é seu cargo na igreja?"
                  value={form.work}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center cursor-pointer group">
                  <div className="flex items-start">
                    <input
                      name="hosting"
                      type="checkbox"
                      checked={form.hosting}
                      onChange={handleChange}
                      className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                      Precisa de hospedagem?
                      {
                        "(Exclusivo para participantes de fora de Imperatriz. Alimentação não inclusa.)"
                      }
                    </span>
                  </div>
                </label>

                <label className="flex flex-col cursor-pointer group">
                  <div className="flex items-start">
                    <input
                      name="imageAuthorization"
                      type="checkbox"
                      checked={form.imageAuthorization}
                      onChange={handleChange}
                      className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2 mt-0.5 flex-shrink-0"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                      <span className="text-red-600 font-semibold">
                        * Obrigatório:
                      </span>{" "}
                      Autorizo, de forma gratuita e por prazo indeterminado, o
                      uso da minha imagem e voz, captadas durante a conferência,
                      em fotos, vídeos e demais registros audiovisuais, para
                      fins de divulgação institucional da igreja, por meio de
                      redes sociais, sites, materiais impressos e outras mídias.
                      Estou ciente de que minha imagem não será utilizada com
                      fins comerciais ou em contextos que prejudiquem minha
                      honra ou reputação.
                    </span>
                  </div>
                </label>
              </div>

              {/* Botão Submit */}
              <button
                type="submit"
                disabled={loading || !form.imageAuthorization || !!existingUser}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white text-lg transition-all duration-200 transform ${
                  loading || !form.imageAuthorization || !!existingUser
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </div>
                ) : (
                  "Cadastrar"
                )}
              </button>

              {!form.imageAuthorization && (
                <p className="text-sm text-red-600 text-center mt-2">
                  É necessário autorizar o uso de imagem para prosseguir com o
                  cadastro
                </p>
              )}

              {existingUser && (
                <p className="text-sm text-red-600 text-center mt-2">
                  Este email já está cadastrado. Verifique suas informações
                  acima.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
