import { useDisclosure, useToast } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";
import { api } from "../config/config";

type categoria = {
  id: string;
  nome: string;
  img: string;
  createAt: string;
};

type create = {
  nome: string;
  img: string;
};

type getCategoriaResponse = {
  totalCount: number;
  categorias: categoria[];
};

type update = {
  id: string;
  nome: string;
  scr: string;
  old: string;
};

type elimina = {
  id: string;
  old: string;
};

const cookies = parseCookies();
const token = cookies.AUTH_TOKEN;
const header = {
  Authorization: "Bearer " + token,
};

export async function deleteCategoria(categorias: elimina) {
  console.log(categorias);

  let formData = new FormData();

  formData.append("old", categorias.old);
  formData.append("id", categorias.id);

  const response = await api.delete("/categoria", {
    data: { old: categorias.old, id: categorias.id },
    headers: header,
  });
  console.log(response);
  return response;
}

export async function updateCategoria(categorias: update) {
  //console.log(categorias);

  let formData = new FormData();

  formData.append("img", categorias.scr);
  formData.append("nome", categorias.nome);
  formData.append("old", categorias.old);
  formData.append("id", categorias.id);

  const response = await api.put("/categoria", formData, { headers: header });
  return response;
}

export async function getCategoria(
  page: number, search: string
): Promise<getCategoriaResponse> {
  const { data } = await api.get("/categorias-office", {
    headers: header,
    params: { page, search },
  });
  //console.log(data);
  const totalCount = Number(data.total);
  const categorias = data.categorias.map((categoria) => {
    return {
      id: categoria.id,
      nome: categoria.nome,
      img: categoria.img,
      createAt: new Date(categoria.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  return { categorias, totalCount };
}

export function useCategoria(page: number, search: string) {
  return useQuery(["categorias", page], () => getCategoria(page, search)/* , {
    staleTime: 1000 * 1,
  } */);
}

export async function getListCategoria(): Promise<categoria[]> {
  const { data } = await api.get("/categorias", { headers: header });
  //console.log(data);
  const categorias = data.categorias.map((categoria) => {
    return {
      id: categoria.id,
      nome: categoria.nome,
      img: categoria.img,
      createAt: new Date(categoria.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  return categorias;
}

export function useListCategoria() {
  return useQuery(["categorias"], () => getListCategoria(), {
    staleTime: 1000 * 10,
  });
}

export async function createCategoria({ nome, img }: create) {
  let formData = new FormData();
  formData.append("img", img);
  formData.append("nome", nome);

  const response = await api.post("/categoria", formData, { headers: header });
  return response;
}
