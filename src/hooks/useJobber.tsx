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

type experiencia = {
  id: string;
  cargo: string;
  empresa: string;
  dataInicio: string;
  dataFim: string;
  descricao: string;
};

export type jobber = {
  id: string;
  nome: string;
  apelido: string;
  sobre: string;
  email: string;
  telefone: string;
  telemovel: string;
  nif: string;
  tipo: string;
  nib: string;
  curriculo: string;
  regCriminal: string;
  img: string;
  statusAcount: boolean;
  cidade?: cidade;
  experiencia?: experiencia;
  subcategoria?: subcategoria;
  createAt: string;
};

type getJobberResponse = {
  totalCount: number;
  jobbers: jobber[];
};

const cookies = parseCookies();
const token = cookies.AUTH_TOKEN;
const header = {
  Authorization: "Bearer " + token,
};

export async function getJobbers(page: number, search: string): Promise<getJobberResponse> {
  const { data } = await api.get("/jobberAll-office", {
    headers: header,
    params: { page, search },
  });
  //console.log(data);
  const totalCount = Number(data.total);
  const jobbers = data.jobbers.map((jobber) => {
    return {
      id: jobber.id,
      nome: jobber.nome,
      img: jobber.img,
      statusAcount: jobber.statusAcount,
      cidade: jobber.Cidade != null ? jobber.Cidade : null,
      experiencia: jobber.esperiencia != null ? jobber.esperiencia : null,
      subcategoria: jobber.SubCategoria != null ? jobber.SubCategoria : null,
      apelido: jobber.apelido,
      sobre: jobber.sobre,
      email: jobber.email,
      telefone: jobber.telefone,
      telemovel: jobber.telemovel,
      nif: jobber.nif,
      tipo: jobber.tipo,
      nib: jobber.nib,
      curriculo: jobber.curriculo,
      regCriminal: jobber.regCriminal,
      createAt: new Date(jobber.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  //console.log(jobbers);
  return { jobbers, totalCount };
}

export function useJobber(page: number, search: string) {
  return useQuery(["jobber", page], () => getJobbers(page, search)/* , {
    staleTime: 1000 * 1,
  } */);
}

export async function getJobber(id: number): Promise<jobber[]> {
  const { data } = await api.get("/jobberAll/" + id, {
    headers: header,
    params: { id },
  });
  //console.log(data);
  const jobber = data.jobber.map((jobber) => {
    return {
      id: jobber.id,
      nome: jobber.nome,
      img: jobber.img,
      statusAcount: jobber.statusAcount,
      cidade: jobber.Cidade != null ? jobber.Cidade : null,
      experiencia: jobber.esperiencia != null ? jobber.esperiencia : null,
      subcategoria: jobber.SubCategoria != null ? jobber.SubCategoria : null,
      apelido: jobber.apelido,
      sobre: jobber.sobre,
      email: jobber.email,
      telefone: jobber.telefone,
      telemovel: jobber.telemovel,
      nif: jobber.nif,
      tipo: jobber.tipo,
      nib: jobber.nib,
      curriculo: jobber.curriculo,
      regCriminal: jobber.regCriminal,
      createAt: new Date(jobber.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  //console.log(jobber);
  return jobber;
}

export function useListJobber(id: number) {
  return useQuery(["jobber", id], () => getJobber(id), {
    staleTime: 1000 * 10,
  });
}

export async function desableJobberAcount(id: string) {
  //console.log(" iddd "+ id);

  const response = await api.put("/acount-desable",{
    data: { id },
    headers: header,
  })
  return response;
}

export async function enableJobberAcount(id: string) {
  //console.log(categorias);

  const response = await api.put("/acount-enable", {
    data: { id },
    headers: header,
  })
  return response;
}
