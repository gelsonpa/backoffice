import { parseCookies } from "nookies";
import { useQuery } from "react-query";
import { api } from "../config/config";

export type cidade = {
  id: string;
  nome: string;
};

type subcategoria = {
  id: string;
  nome: string;
  img: string;
};

type empregador = {
  id: string;
  nome: string;
  apelido: string;
};

type biscaite = {
  id: number;
  dia: string;
  duracao: string;
  pagamento: number;
  negociavel: string;
  empregador?: empregador;
  cidade?: cidade;
  subcategoria?: subcategoria;
  estado: string;
  pago: string;
  vagas: number;
  createdAt: string;
};

type getBiscaiteResponse = {
  totalCount: number;
  biscaites: biscaite[];
};

const cookies = parseCookies();
const token = cookies.AUTH_TOKEN;
const header = {
  Authorization: "Bearer " + token,
};

export async function getBiscaites(
  page: number,
  search: string
): Promise<getBiscaiteResponse> {
  const { data } = await api.get("/biscaites-office", {
    headers: header,
    params: { page, search },
  });
  //console.log(data);
  const totalCount = Number(data.total);
  const biscaites = data.biscaites.map((biscaite) => {
    return {
      id: biscaite.id,
      dia: new Date(biscaite.dia).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      duracao: biscaite.duracao,
      pagamento: biscaite.pagamento,
      negociavel: biscaite.negociavel,
      empregador: biscaite.empregador != null ? biscaite.empregador : null,
      cidade: biscaite.Cidade != null ? biscaite.Cidade : null,
      subcategoria:
        biscaite.SubCategorium != null ? biscaite.SubCategorium : null,
      estado: biscaite.estado,
      pago: biscaite.pago,
      vagas: biscaite.vagas,
      createdAt: new Date(biscaite.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  //console.log(biscaites);
  return { biscaites, totalCount };
}

export function useBiscaite(page: number, search: string) {
  return useQuery(
    ["biscaites", page],
    () => getBiscaites(page, search)  , {
      staleTime: 1000 * 5,
    }
  );
}

export async function getBiscaite(): Promise<biscaite[]> {
  const { data } = await api.get("/biscaite-dashboard", {
    headers: header,
  });
  //console.log(data);
  const biscaites = data.biscaites.map((biscaite) => {
    return {
      id: biscaite.id,
      dia: new Date(biscaite.dia).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      duracao: biscaite.duracao,
      pagamento: biscaite.pagamento,
      negociavel: biscaite.negociavel,
      empregador: biscaite.empregador != null ? biscaite.empregador : null,
      cidade: biscaite.Cidade != null ? biscaite.Cidade : null,
      subcategoria:
        biscaite.SubCategorium != null ? biscaite.SubCategorium : null,
      estado: biscaite.estado,
      pago: biscaite.pago,
      vagas: biscaite.vagas,
      createdAt: new Date(biscaite.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  //console.log(biscaites);
  return biscaites;
}

export function useGetBiscaite() {
  return useQuery(["biscaites"], () => getBiscaite());
}
