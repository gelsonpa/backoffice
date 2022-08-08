import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import RatingJobber from "../../components/rating";
import { AuthContext } from "../../contexts/AuthContext";
import { usePropostaByIdJobber } from "../../hooks/useProposta";

export function Avaliation() {
  const { jobber } = useContext(AuthContext);

  function Aval(min: number) {
    return Array(5)
      .fill("")
      .map((_, i) => (
        <StarIcon
          key={i}
          style={{ fontSize: 18 }}
          color={i < min ? "yellow.400" : "white.200"}
        />
      ));
  }

  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch, isFetching } = usePropostaByIdJobber(
    page,
    jobber["id"]
  );

  var [dadosAvalhacao, setDadosAvalhacao] = useState({
    ApFisica: 4,
    Pontualidade: 2,
    Equipamento: 4,
    Limpesa: 4,
    Gloval: 4,
  });

  var ApFisica = 0, Pontualidade = 0, Feramenta = 0, Limpesa = 0, Geral = 0;
  let MApFisica = 0, MPontualidade = 0, MFeramenta = 0, MLimpesa = 0, MGeral = 0;

  if (!isLoading) {
    if (data != null) {
      data.propostas.map((item) => {
        ApFisica = ApFisica + item.apresentacao;
        Pontualidade = Pontualidade + item.pontualidade;
        Feramenta = Feramenta + item.feramenta;
        Limpesa = Limpesa + item.limpesa;
        Geral = Geral + item.geral;
      });
      MApFisica = ApFisica/data.totalCount;
      MPontualidade = Pontualidade/data.totalCount;
      MFeramenta = Feramenta/data.totalCount;
      MLimpesa = Limpesa/data.totalCount;
      MGeral = Geral/data.totalCount;
    }
  }


  return (
    <Box marginTop={6}>
      <List spacing={8}>
        <ListItem>
          <Text as={"span"} mr={10} fontWeight={"bold"}>
            Apresentação Fisica:
          </Text>
          {Aval(parseInt(MApFisica.toString()))}
        </ListItem>
        <ListItem>
          <Text as={"span"} mr={85} fontWeight={"bold"}>
            Pontualidade:
          </Text>
          {Aval(parseInt(MPontualidade.toString()))}
        </ListItem>
        <ListItem>
          <Text as={"span"} mr={78} fontWeight={"bold"}>
            Equipamentos:
          </Text>
          {Aval(parseInt(MFeramenta.toString()))}
        </ListItem>
        <ListItem>
          <Text as={"span"} mr={125} fontWeight={"bold"}>
            Limpesa:
          </Text>
          {Aval(parseInt(MLimpesa.toString()))}
        </ListItem>
        <ListItem>
          <Text as={"span"} mr={70} fontWeight={"bold"}>
            Avaliação Geral:
          </Text>
          {Aval(parseInt(MGeral.toString()))}
        </ListItem>
      </List>
    </Box>
  );
}
