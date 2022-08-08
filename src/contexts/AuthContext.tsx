import Router from "next/router";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useToast, Spinner, Flex, Box } from "@chakra-ui/react";
import { api } from "../config/config";
import router, { useRouter } from "next/router";

import { parseCookies, setCookie, destroyCookie } from "nookies";
import { QueryObserverResult, useQuery } from "react-query";

type SignInCredentials = {
  email: string;
  password: string;
};

type CookiesProps = {
  name: string;
  value: string;
};

type categoriaProps = {
  nome: string;
  id: string;
};

type jobberProps = {
  id: string;
};

type employerProps = {
  id: string;
};

type propostaProps = {
  id: string;
  subcategoria: string;
  employer: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  showModal: boolean;
  alert: Object;
  categoria: Object;
  jobber: Object;
  employer: Object;
  search: Object;
  proposta: Object;
  valUserValidation(): Promise<void>;
  SetCategoria: (categorias: categoriaProps) => void;
  SetJobber: (jobber: jobberProps) => void;
  SetEmployer: (employer: employerProps) => void;
  SetLoading: (type) => void;
  SetSearch: (word: string) => void;
  SetProposta: (proposta: propostaProps) => void;
  signOut(): Promise<void>;
  refetch(): Promise<QueryObserverResult<void, unknown>>;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  firstName: string;
  lastName: string;
  img: string;
  email: string;
  id: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const cookies = parseCookies();

  const [user, setUser] = useState<User>({
    firstName: cookies.FIRSTNAME,
    lastName: cookies.LASTNAME,
    img: cookies.IMG,
    email: cookies.EMAIL,
    id: cookies.ID,
  });
  //const isAuthenticated = !!user;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [showModal, setShow] = useState(false);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState({ search: "" });

  const [categoria, setCategoria] = useState({
    nome: cookies.NAME_CATEGORIE ? cookies.NAME_CATEGORIE : "",
    id: cookies.ID_CATEGORIE ? cookies.ID_CATEGORIE : "",
  });

  const [jobber, setJobber] = useState({
    id: cookies.ID_JOBBER ? cookies.ID_JOBBER : "",
  });

  const [employer, setEmployer] = useState({
    id: cookies.ID_EMPLOYER ? cookies.ID_EMPLOYER : "",
  });

  const [proposta, setProposta] = useState({
    subcategoria: cookies.NAME_SUBCATEGORIE ? cookies.NAME_SUBCATEGORIE : "",
    id: cookies.ID_PROPOSTA ? cookies.ID_PROPOSTA : "",
    employer: cookies.NAME_EMPLOYER ? cookies.NAME_EMPLOYER : "",
  });

  function SetProposta({id, subcategoria, employer}: propostaProps) {
    setProposta({
      id: id,
      subcategoria: subcategoria,
      employer: employer,
    });
  }

  function SetSearch(searchWord: string) {
    setSearch({
      search: searchWord,
    });
  }

  function SetCategoria({ nome, id }: categoriaProps) {
    setCategoria({
      nome: nome,
      id: id,
    });
  }

  function SetJobber({ id }: jobberProps) {
    setJobber({
      id: id,
    });
  }

  function SetEmployer({ id }: employerProps) {
    setEmployer({
      id: id,
    });
  }

  function SetLoading(type) {
    setLoading(type);
  }

  const [alert, setAlert] = useState({
    messege: "",
    type: "",
  });

  const header1 = {
    "Content-Type": "application/json;charset=UTF-8",
  };

  useEffect(() => {
    const checkAuthenticate = async () => {
      const token = cookies.AUTH_TOKEN;
      if (!!token) {
        //api.defaults.headers.Authorization = `Bearer ${token}`;
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setLoading(false);
        Router.push("/");
      }
    };
    checkAuthenticate();
    valUserValidation();

    router.events.on("routeChangeStart", () => {
      SetSearch("");
    });
  }, []);

/*   const { asPath } = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      //refetch();
    });
  }, [asPath]); */

  async function signIn({ email, password }: SignInCredentials) {
    try {
      await api
        .post(
          "/login",
          { email, password },
          {
            headers: header1,
          }
        )
        .then((response) => {
          if (response.data.erro === true && response.data.mensagem) {
            //console.log(response.data.mensagem);
            setLoading(false);
            setAlert({ messege: response.data.mensagem, type: "error" });
            return response.data.mensagem;
          } else {
            setAlert({ messege: "", type: "" });

            setUser({
              firstName: response.data.user.firstName,
              lastName: response.data.user.lastName,
              img: response.data.user.img,
              email: response.data.user.email,
              id: response.data.user.id,
            });

            setCookie(undefined, "AUTH_TOKEN", response.data.token, {
              maxAge: 60 * 60 * 24 * 30, // 30 dias
              path: "/",
            });

            setCookie(undefined, "ID", response.data.user.id, {
              maxAge: 60 * 60 * 24 * 30, // 30 dias
              path: "/",
            });

            setCookie(undefined, "FIRSTNAME", response.data.user.firstName, {
              maxAge: 60 * 60 * 24 * 30, // 30 dias
              path: "/",
            });

            setCookie(undefined, "LASTNAME", response.data.user.lastName, {
              maxAge: 60 * 60 * 24 * 30, // 30 dias
              path: "/",
            });

            setCookie(undefined, "IMG", response.data.user.img, {
              maxAge: 60 * 60 * 24 * 30, // 30 dias
              path: "/",
            });

            setCookie(undefined, "EMAIL", response.data.user.email, {
              maxAge: 60 * 60 * 24 * 30, // 30 dias
              path: "/",
            });

            setIsAuthenticated(true);
            Router.push("/dashboard");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function signOut() {
    destroyCookie(undefined, "AUTH_TOKEN");
    destroyCookie(undefined, "ID");
    destroyCookie(undefined, "FIRSTNAME");
    destroyCookie(undefined, "LASTNAME");
    destroyCookie(undefined, "IMG");
    destroyCookie(undefined, "EMAIL");
    destroyCookie(undefined, "ID_CATEGORIE");
    destroyCookie(undefined, "NAME_CATEGORIE");
    destroyCookie(undefined, "ID_JOBBER");
    destroyCookie(undefined, "ID_EMPLOYER");
    destroyCookie(undefined, "ID_PROPOSTA");
    destroyCookie(undefined, "NAME_SUBCATEGORIE");
    destroyCookie(undefined, "NAME_EMPLOYER");
    //api.defaults.headers.Authorization = undefined;
    api.defaults.headers.common["Authorization"] = undefined;
    setIsAuthenticated(false);
    //Router.replace("/");
    if (isAuthenticated) {
      Router.reload();
    } else {
      Router.replace("/");
    }
    //redirect("/");
  }

  /*   if (loading) {
    return (<h1>Carregando...</h1>);
  } */

  async function SetCookies({ name, value }: CookiesProps) {
    setCookie(undefined, name, value, {
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: "/",
    });
  }

  const valUserValidation = async () => {
    const val_token = cookies.AUTH_TOKEN;
    const headers = {
      Authorization: "Bearer " + val_token,
    };

    await api
      .get("/validate", {
        headers: headers,
      })
      .then((response) => {
        //console.log(response);
        if (response.data.error == true) {
          if (isAuthenticated) {
            setIsAuthenticated(false);
            setAlert({
              messege: response.data.mensagem + "111",
              type: "error",
            });
            //Router.reload();
            signOut();
          }
        } else {
          setUser({
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            img: response.data.user.img,
            email: response.data.user.email,
            id: response.data.user.id,
          });
          return true;
        }
      })
      .catch((err) => {
        setIsAuthenticated(false);
        setAlert({ messege: "Erro no servidor", type: "error" });
        api.defaults.headers.common["Authorization"] = undefined;

        destroyCookie(undefined, "AUTH_TOKEN");
        destroyCookie(undefined, "ID");
        destroyCookie(undefined, "NAME");
        destroyCookie(undefined, "EMAIL");
        destroyCookie(undefined, "ID_CATEGORIE");
        destroyCookie(undefined, "NAME_CATEGORIE");
        destroyCookie(undefined, "ID_JOBBER");
        destroyCookie(undefined, "ID_EMPLOYER");
        destroyCookie(undefined, "ID_PROPOSTA");
        destroyCookie(undefined, "NAME_SUBCATEGORIE");
        destroyCookie(undefined, "NAME_EMPLOYER");

        signOut();

        return false;
      });
  };

  const { refetch } = useQuery(["validate"], async () => {
    const val_token = cookies.AUTH_TOKEN;
    const headers = {
      Authorization: "Bearer " + val_token,
    };
    console.log("validated");
    await api
      .get("/validate", {
        headers: headers,
      })
      .then((response) => {
        //console.log(response);
        if (response.data.error == true) {
          console.log("error true");
          if (isAuthenticated == true) {
            console.log("error true true");
            setIsAuthenticated(false);
            setAlert({
              messege: response.data.mensagem + "000",
              type: "error",
            });
            //Router.reload();
            signOut();
          } /* else {
            console.log("error else");
            signOut();
          } */
        } else {
          setUser({
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            img: response.data.user.img,
            email: response.data.user.email,
            id: response.data.user.id,
          });

          setCookie(undefined, "FIRSTNAME", response.data.user.firstName, {
            maxAge: 60 * 60 * 24 * 30, // 30 dias
            path: "/",
          });

          setCookie(undefined, "LASTNAME", response.data.user.lastName, {
            maxAge: 60 * 60 * 24 * 30, // 30 dias
            path: "/",
          });

          setCookie(undefined, "IMG", response.data.user.img, {
            maxAge: 60 * 60 * 24 * 30, // 30 dias
            path: "/",
          });

          setCookie(undefined, "EMAIL", response.data.user.email, {
            maxAge: 60 * 60 * 24 * 30, // 30 dias
            path: "/",
          });
        }
      });
  }, /* {
    staleTime: 1000 * 1,
  } */);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
        user,
        categoria,
        jobber,
        employer,
        loading,
        search,
        showModal,
        proposta,
        valUserValidation,
        refetch,
        SetCategoria,
        SetJobber,
        SetEmployer,
        SetLoading,
        SetSearch,
        SetProposta,
        alert,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
