import { parseCookies } from "nookies";
import { useQuery } from "react-query";
import { api } from "../config/config";

export type cidade = {
  id: string;
  nome: string;
};

export type employer = {
  id: string;
  nome: string;
  apelido: string;
  img: string;
  statusAcount: boolean;
  email: string;
  endereco: string;
  telefone: string;
  telemovel: string;
  nif: string;
  nConta: string;
  nib: number;
  swift: string;
  tipo: string;
  CidadeId: string;
  Cidade?: cidade;
  createdAt: string;
};

type getEmployerResponse = {
  totalCount: number;
  empregadores: employer[];
};

const cookies = parseCookies();
const token = cookies.AUTH_TOKEN;
const header = {
  Authorization: "Bearer " + token,
};

export async function getListEmployer(
  page: number,
  search: string
): Promise<getEmployerResponse> {
  const { data } = await api.get("/employers", {
    headers: header,
    params: { page, search },
  });
  //console.log(data);
  const totalCount = Number(data.total);
  const empregadores = data.empregadores.map((employer: employer) => {
    return {
      id: employer.id,
      nome: employer.nome,
      img: employer.img,
      statusAcount: employer.statusAcount,
      apelido: employer.apelido,
      email: employer.email,
      endereco: employer.endereco,
      telefone: employer.telefone,
      telemovel: employer.telemovel,
      nif: employer.nif,
      nConta: employer.nConta,
      nib: employer.nib,
      swift: employer.swift,
      tipo: employer.tipo,
      CidadeId: employer.CidadeId,
      Cidade: employer.Cidade != null ? employer.Cidade : null,
      createdAt: new Date(employer.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  //console.log(employers);
  return { empregadores, totalCount };
}

export function useListEmployer(page: number, search: string) {
  return useQuery(
    ["employer", page],
    () => getListEmployer(page, search) /* , {
    staleTime: 1000 * 1,
  } */
  );
}

export async function getGetEmployer(id: number): Promise<employer[]> {
  const { data } = await api.get("/employer/" + id, {
    headers: header,
    params: { id },
  });
  console.log(data);
  const empregador = data.empregador.map((employer: employer) => {
    return {
      id: employer.id,
      nome: employer.nome,
      img: employer.img,
      statusAcount: employer.statusAcount,
      apelido: employer.apelido,
      email: employer.email,
      endereco: employer.endereco,
      telefone: employer.telefone,
      telemovel: employer.telemovel,
      nif: employer.nif,
      nConta: employer.nConta,
      nib: employer.nib,
      swift: employer.swift,
      tipo: employer.tipo,
      CidadeId: employer.CidadeId,
      Cidade: employer.Cidade != null ? employer.Cidade : null,
      createdAt: new Date(employer.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  console.log(empregador);
  return empregador;
}

export function useEmployer(id: number) {
  return useQuery(["employer", id], () => getGetEmployer(id), {
    staleTime: 1000 * 10,
  });
}

export async function desableEmployerAcount(id: string) {
  //console.log(" iddd "+ id);

  const response = await api.put("/acount-desable-employer", {
    data: { id },
    headers: header,
  });
  return response;
}

export async function enableEmployerAcount(id: string) {
  //console.log(categorias);

  const response = await api.put("/acount-enable-employer", {
    data: { id },
    headers: header,
  });
  return response;
}
