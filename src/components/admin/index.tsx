"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Users,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Building,
  Briefcase,
  Home,
  Camera,
  RefreshCw,
  Filter,
} from "lucide-react";
import axios from "axios";

interface User {
  id?: string;
  name: string;
  dateBirth: Date;
  gender: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  churchName: string;
  work: string;
  hosting: boolean;
  imageAuthorization: boolean;
}

export default function ComponentAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [hostingFilter, setHostingFilter] = useState("all");

  const apiUrl = process.env.NEXT_PUBLIC_APIURL;

  const listUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/register`);
      setUsers(response.data);
      setFilteredUsers(response.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      let errorMessage = "Ocorreu um erro inesperado";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error("Erro ao carregar usuários:", errorMessage);
    }
  };

  useEffect(() => {
    listUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.churchName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (genderFilter !== "all") {
      filtered = filtered.filter((user) => user.gender === genderFilter);
    }

    if (hostingFilter !== "all") {
      const isHosting = hostingFilter === "true";
      filtered = filtered.filter((user) => user.hosting === isHosting);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, genderFilter, hostingFilter]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Usuários Cadastrados
                </h1>
                <p className="text-sm text-gray-600">
                  Gerencie todos os usuários do sistema
                </p>
              </div>
            </div>
            <button
              onClick={listUsers}
              disabled={loading}
              className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              <span>Atualizar</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Total de Usuários</p>
                <p className="text-xl font-bold text-gray-900">
                  {users.length}
                </p>
              </div>
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Oferecem Hospedagem</p>
                <p className="text-xl font-bold text-green-600">
                  {users.filter((u) => u.hosting).length}
                </p>
              </div>
              <Home className="h-6 w-6 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Autorização de Imagem</p>
                <p className="text-xl font-bold text-purple-600">
                  {users.filter((u) => u.imageAuthorization).length}
                </p>
              </div>
              <Camera className="h-6 w-6 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Filtrados</p>
                <p className="text-xl font-bold text-orange-600">
                  {filteredUsers.length}
                </p>
              </div>
              <Filter className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Gêneros</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>

            <select
              value={hostingFilter}
              onChange={(e) => setHostingFilter(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Hospedagem - Todos</option>
              <option value="true">Oferece Hospedagem</option>
              <option value="false">Não Oferece</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center space-y-4">
                <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
                <p className="text-gray-600">Carregando usuários...</p>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600">
                  Nenhum usuário encontrado
                </p>
                <p className="text-sm text-gray-500">
                  Tente ajustar os filtros de busca
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuário
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contato
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Localização
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={user.id || index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-xs">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2)}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">
                              {user.name}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {calculateAge(user.dateBirth)} anos
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="text-xs text-gray-900 flex items-center line-clamp-1">
                            <Mail className="h-3 w-3 mr-1 text-gray-400" />
                            {user.email}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <Phone className="h-3 w-3 mr-1 text-gray-400" />
                            {user.phone}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="text-xs text-gray-900 flex items-center">
                            <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                            {user.city}, {user.state}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-1">
                            {user.churchName}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              user.hosting
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <Home className="h-3 w-3 mr-1" />
                            {user.hosting ? "Hospeda" : "Não hospeda"}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              user.imageAuthorization
                                ? "bg-purple-100 text-purple-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            <Camera className="h-3 w-3 mr-1" />
                            {user.imageAuthorization
                              ? "Autoriza foto"
                              : "Não autoriza"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
