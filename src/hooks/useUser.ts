import { parseCookies } from "nookies";
import { useQuery } from "react-query";
import { api } from "../config/config";

type user = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  img: string;
  createdAt: string;
};

type createuser = {
  firstName: string;
  lastName: string;
  email: string;
  img: string;
  password: string;
};

type updateUser = {
  firstName: string;
  lastName: string;
  email: string;
  img: string;
  old: string;
  userEmail: string;
};

type changePass = {
  email: string;
  password: string;
  novo: string;
  confirm: string;
};

type elimina = {
  id: string;
  old: string;
};

type getUserResponse = {
  totalCount: number;
  users: user[];
};

const cookies = parseCookies();
const token = cookies.AUTH_TOKEN;
const header = {
  Authorization: "Bearer " + token,
};

export async function getUsers(
  page: number,
  user: number, search: string
): Promise<getUserResponse> {
  const { data } = await api.get("/users", {
    headers: header,
    params: { page, user, search },
  });
  //console.log(data);
  const totalCount = Number(data.total);
  const users = data.users.map((user) => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      img: user.img,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  //console.log(users)
  return { users, totalCount };
}

export function useListUser(page: number, user: number, search: string) {
  return useQuery(["users", page], () => getUsers(page, user, search)/* , {
    staleTime: 1000 * 1,
  } */);
}

export async function deleteUser(user: elimina) {
  console.log(user);

  let formData = new FormData();

  formData.append("old", user.old);
  formData.append("id", user.id);

  const response = await api.delete("/user", {
    data: { old: user.old, id: user.id },
    headers: header,
  });
  console.log(response);
  return response;
}

export async function createUser(user: createuser) {
  //console.log(user);
  let formData = new FormData();

  formData.append("firstName", user.firstName);
  formData.append("lastName", user.lastName);
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("img", user.img);

  const response = await api.post("/user", formData, { headers: header });
  //console.log(response);
  return response;
}

export async function changePassword({
  email,
  novo,
  confirm,
  password,
}: changePass) {
  const response = await api.post(
    "/password",
    { email: email, novo: novo, password: password, confirm: confirm },
    { headers: header }
  );
  return response;
}


export async function updateUser(user: updateUser) {
  //console.log(user);
  let formData = new FormData();

  formData.append("firstName", user.firstName);
  formData.append("lastName", user.lastName);
  formData.append("email", user.email);
  formData.append("old", user.old);
  formData.append("img", user.img);
  formData.append("userEmail", user.userEmail);

  const response = await api.put("/user", formData, { headers: header });
  //console.log(response);
  return response;
}