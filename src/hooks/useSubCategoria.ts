import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useContext } from "react";
import { useQuery } from "react-query";
import { api } from "../config/config";
import { AuthContext } from "../contexts/AuthContext";

type subcategoria = {
  id: string;
  nome: string;
  img: string;
  createAt: string;
};

type getSubCategoriaResponse = {
  totalCount: number;
  subcategorias: subcategoria[];
}

const cookies = parseCookies();
const token = cookies.AUTH_TOKEN;
const header = {
  Authorization: "Bearer " + token,
};

export async function getSubCategoria(page: number, id: number, search: string): Promise<getSubCategoriaResponse> {
    /* const [_, idcategoria] = queryKey; */
  const { data } = await api.get("/subcategorias-office", { headers: header, params: { page, id, search} });
  //console.log(data);
  const totalCount = Number(data.total);
  const subcategorias = data.subcategorias?.map((subcategoria) => {
    return {
      id: subcategoria.id,
      nome: subcategoria.nome,
      img: subcategoria.img,
      createAt: new Date(subcategoria.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  return {subcategorias, totalCount};
}


export function useSubCategoria(id : number, page: number, search: string) {
  return useQuery(["subcategorias", page],  ()=> getSubCategoria(page, id, search)/* , {
    staleTime: 1000 * 1,
  } */);
}


type createSub = {
  idcategoria: string;
  nome: string;
  img: string;
}

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

export async function createSubCategoria({idcategoria, nome, img}: createSub){

  let formData = new FormData();
  formData.append("idcategoria", idcategoria);
  formData.append("nome", nome);
  formData.append("img", img);

  const response = await api.post("/subcategoria", formData, { headers: header });
  return response;
}


export async function updateSubCategoria(subcategorias: update) {
  //console.log(categorias);

  let formData = new FormData();

  formData.append("img", subcategorias.scr);
  formData.append("nome", subcategorias.nome);
  formData.append("old", subcategorias.old);
  formData.append("id", subcategorias.id);

  const response = await api.put("/subcategoria", formData, { headers: header });
  return response;
}

export async function deleteSubCategoria(subcategorias: elimina) {
  //console.log(categorias);

  let formData = new FormData();

  formData.append("old", subcategorias.old);
  formData.append("id", subcategorias.id);

   const response = await api.delete("/subcategoria", {
    data: {old: subcategorias.old, id: subcategorias.id},
    headers: header,
  });
  //console.log(response);
  return response;
}
