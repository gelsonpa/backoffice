import { theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { api } from "../config/config";
import { useQuery } from "react-query";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    forecolor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: true,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    categories: [
      startsWithCapital(-3),
      startsWithCapital(-2),
      startsWithCapital(-1),
      startsWithCapital(0),
      startsWithCapital(1),
      startsWithCapital(2),
      startsWithCapital(3),
    ],
    /* title: {
      text: "Month",
    }, */
  },
};

function startsWithCapital(monthSum: number) {
  //return word.charAt(0) === word.charAt(0).toUpperCase()
  let date = new Date();
  const str = new Date(
    new Date(date.setMonth(date.getMonth() + monthSum))
  ).toLocaleDateString("pt-BR", {
    month: "long",
  });
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  return str2;
}

let valuesJobber = [];
let valuesEmployer = [];

async function countJobber(month: number, year: number) {
  const { data } = await api.get("/count-jobber", { params: { month, year } });
  //console.log(data);
  valuesJobber.push(data.total);
}

async function countEmployer(month: number, year: number) {
  const { data } = await api.get("/count-employer", { params: { month, year } });
  //console.log(data);
  valuesEmployer.push(data.total);
}


for (var i = -3; i < 4; i++) {
  let data = new Date();
  let y = data.getFullYear(),
    m = data.getMonth();
  let date = new Date(y, m, 1);

  countJobber(
    Number(
      new Date(new Date(data.setMonth(data.getMonth() + i))).toLocaleDateString(
        "pt-BR",
        {
          month: "numeric",
        }
      )
    ),
    Number(
      new Date(new Date(date.setMonth(date.getMonth() + i))).toLocaleDateString(
        "pt-BR",
        {
          year: "numeric",
        }
      )
    )
  );

  countEmployer(
    Number(
      new Date(new Date(data.setMonth(data.getMonth() + i))).toLocaleDateString(
        "pt-BR",
        {
          month: "numeric",
        }
      )
    ),
    Number(
      new Date(new Date(date.setMonth(date.getMonth() + i))).toLocaleDateString(
        "pt-BR",
        {
          year: "numeric",
        }
      )
    )
  );
}


const seriesJobber = [{ name: "seriesjobber", data: valuesJobber /* [110, 120, 130, 140, 150, 160, 170] */ }];

const seriesEmployer = [{ name: "seriesjobber", data: valuesEmployer /* [110, 120, 130, 140, 150, 160, 170] */ }];

export function ChartsJobber() {

  useQuery(["categorias", Date()], () =>{

  })
  return <Chart options={options} series={seriesJobber} type="area" height={160} />;
}


export function ChartsEmployer() {
  return <Chart options={options} series={seriesEmployer} type="area" height={160} />;
}
