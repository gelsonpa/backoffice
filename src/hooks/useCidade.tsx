import { parseCookies } from "nookies";
import { useState } from "react";
import { useQuery } from "react-query";
import { api } from "../config/config";

type ilha = {
  id: string;
  nome: string;
  createdAt: string;
};

type cidade = {
  id: string;
  nome: string;
  Ilha: ilha;
  createdAt: string;
};

type create = {
  nome: string;
  idIlha: string;
};

type elimina = {
  id: string;
};

export type getCidadeResponse = {
  totalCount: number;
  cidades: cidade[];
};

const cookies = parseCookies();
const token = cookies.AUTH_TOKEN;
const header = {
  Authorization: "Bearer " + token,
};

export async function getIlhas(): Promise<ilha[]> {
  const { data } = await api.get("/ilhas", {
    headers: header,
  });
  //console.log(data);
  const ilhas = data.ilhas.map((ilha: ilha) => {
    return {
      id: ilha.id,
      nome: ilha.nome,
      createdAt: new Date(ilha.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  //console.log(ilhas);
  return ilhas;
}

export function useGetIlhas() {
  return useQuery(["ilhas"], () => getIlhas(), {
    staleTime: 1000 * 10,
  });
}

export async function getCidades(page: number, search: string): Promise<getCidadeResponse> {
  const { data } = await api.get("/cidades", {
    headers: header,
    params: { page, search },
  });
  const totalCount = Number(data.total);
  const cidades = data.cidades.map((cidade: cidade) => {
    return {
      id: cidade.id,
      nome: cidade.nome,
      Ilha: cidade.Ilha,
      createAt: new Date(cidade.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  return { cidades, totalCount };
}

export function useCidades(page: number,  search: string) {
  return useQuery(["cidades", page], () => getCidades(page, search), {
    staleTime: 1000 * 10,
  });
}

export async function createCidade({ nome, idIlha }: create) {
  //console.log("createCidade", nome, idIlha);
  const response = await api.post(
    "/cidade",
    { IlhaId: idIlha, nome: nome },
    { headers: header }
  );
  return response;
}

export async function DeleteCidade({ id }: elimina) {
  //console.log("createCidade", nome, idIlha);

  const response = await api.delete("/cidade", {
    data: {id},
    headers: header,
  });
  return response;
}
