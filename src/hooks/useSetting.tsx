import { parseCookies } from "nookies";
import { useQuery } from "react-query";
import { api } from "../config/config";

type setting = {
  id: number;
  logotipo: string;
  taxa: string;
  createdAt: string;
};

type update = {
  id: string;
  taxa: string;
  scr: string;
  old: string;
};

type create = {
  taxa: string;
  logotipo: string;
};

const cookies = parseCookies();
const token = cookies.AUTH_TOKEN;
const header = {
  Authorization: "Bearer " + token,
};

export function useSetting() {
  return useQuery(
    ["setting"],
    () => getSetting()  , {
        staleTime: 1000 * 5,
      }
  );
}

export async function getSetting(): Promise<setting[]> {
  const { data } = await api.get("/Setting", {
    headers: header,
  });
  //console.log(data);
  const setting = data.setting.map((setting) => {
    return {
      id: setting.id,
      logotipo: setting.logotipo,
      taxa: setting.taxa,
      createdAt: new Date(setting.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  //console.log(setting);
  return setting;
}

export async function createSetting({ taxa, logotipo }: create) {
  let formData = new FormData();
  formData.append("img", logotipo);
  formData.append("taxa", taxa);

  const response = await api.post("/setting", formData, { headers: header });
  return response;
}

export async function updateSetting(setting: update) {
  console.log(setting);

  let formData = new FormData();

  formData.append("img", setting.scr);
  formData.append("taxa", setting.taxa);
  formData.append("old", setting.old);
  formData.append("id", setting.id);

  const response = await api.put("/setting", formData, { headers: header });
  return response;
}

export async function updatePoliticSetting(politic: string) {
  console.log(politic);

  let formData = new FormData();

  formData.append("politic", politic);
  const response = await api.put("/setting-politic", {data: {politic: politic}, headers: header });
  return response;
}
