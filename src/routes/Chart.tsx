import { useQuery } from "react-query";
import { useOutletContext } from "react-router";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import { fetchCoinHistory } from "./api";
import ApexChart from 'react-apexcharts'


type ChartProps={
  coinId: string;
}

interface Idata {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart() {
  const {coinId} =useOutletContext<ChartProps>(); // {food: "pizza"}
  console.log('coinid:: ',coinId)
  const isDark = useRecoilValue(isDarkAtom);
   const {isLoading, data} = useQuery<Idata[]>(['ohlcv', coinId], ()=>fetchCoinHistory(coinId))
  return (
    <div>
      {isLoading ? "loading chart.." : <ApexChart type="line" 
      series={[
        {
          name: 'chart',
          data: 
          data?.map((x)=>x.close) as number[]
        },
      ]}
      options={{
        theme:{
          mode:'dark'
        },
        chart:{
            height: 300,
            width: 500,
            background: 'transparent',
            toolbar: {
              show: false
            }
        },
        grid: {show: false},
        yaxis: {show: false},
        xaxis: {labels: {show: false}, 
        axisTicks:{show:false},
        type: 'datetime',
        categories: data?.map((x)=>
        new Date(+x.time_close * 1000).toISOString()
        ) 
      },
        stroke:{
          // width: 1
        },
        // fill: {type: 'gradient', gradient:{gradientToColors:['blue'], stops:[0, 1]}},
        // colors:['red']
        tooltip:{
          y: {
            formatter: (val)=> `$ ${val.toFixed(2)}`
          }
        }

      }} 
      />
      }
    </div>
  );
}

export default Chart