import { parseCookies } from "nookies";
import { useQuery } from "react-query";
import { api } from "../config/config";

type jobber = {
    id: string;
    nome: string;
    apelido: string;
    img: string;
}



type proposta = {
  id: string;
  duracao: string;
  jobber: jobber;
  pagamento: string;
  aceite_jobber: boolean;
  aceite_empre: boolean;
  biscaite: string[];
  createdAt: string;
  apresentacao: number;
  pontualidade: number;
  feramenta: number;
  limpesa: number;
  geral: number;
};

type getPropostaResponse = {
  totalCount: number;
  propostas: proposta[];
};

const cookies = parseCookies();
const token = cookies.AUTH_TOKEN;
const header = {
  Authorization: "Bearer " + token,
};

export async function getPropostas(
  page: number,
  id: number
): Promise<getPropostaResponse> {
  const { data } = await api.get("/PropostaAll-office", {
    headers: header,
    params: { page, id },
  });
  //console.log(data);
  const totalCount = Number(data.total);
  const propostas = data.proposta.map((proposta) => {
    return {
      id: proposta.id,
      duracao: proposta.duracao,
      pagamento: proposta.pagamento,
      jobber: proposta.Jobber,
      aceite_jobber: proposta.aceite_jobber,
      aceite_empre: proposta.aceite_empre,
      createdAt: new Date(proposta.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  //console.log(propostas);
  return { propostas, totalCount };
}

export function useProposta(page: number, id: number) {
  return useQuery(
    ["propostas", page],
    () => getPropostas(page, id) /* , {
      staleTime: 1000 * 1,
    } */
  );
}



export async function getPropostaByIdJobber(
  page: number,
  id: number
): Promise<getPropostaResponse> {
  const { data } = await api.get("/propostaByIdJobber-office", {
    headers: header,
    params: { page, id },
  });
  //console.log(data);
  const totalCount = Number(data.total);
  const propostas = data.proposta.map((proposta) => {
    return {
      id: proposta.id,
      duracao: proposta.duracao,
      pagamento: proposta.pagamento,
      jobber: proposta.Jobber,
      biscaite : proposta.biscaite,
      aceite_jobber: proposta.aceite_jobber,
      aceite_empre: proposta.aceite_empre,
      apresentacao: proposta.apresentacao,
      pontualidade: proposta.pontualidade,
      feramenta: proposta.feramenta,
      limpesa: proposta.limpesa,
      geral: proposta.geral,
      createdAt: new Date(proposta.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  //console.log(propostas);
  return { propostas, totalCount };
}

export function usePropostaByIdJobber(page: number, id: number) {
  return useQuery(
    ["propostas", page],
    () => getPropostaByIdJobber(page, id) /* , {
      staleTime: 1000 * 1,
    } */
  );
}




