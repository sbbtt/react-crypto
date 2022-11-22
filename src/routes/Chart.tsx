import { useQuery } from "react-query";
import { useOutletContext } from "react-router";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import { fetchCoinHistory } from "./api";

type ChartProps={
  coinId: string;
}

function Chart() {
  const {coinId} =useOutletContext<ChartProps>(); // {food: "pizza"}
  console.log('coinid:: ',coinId)
  const isDark = useRecoilValue(isDarkAtom);
   const {isLoading, data} = useQuery(['ohlcv', coinId], ()=>fetchCoinHistory(coinId))
  return (
    <h1>{coinId}</h1>
  )
}

export default Chart