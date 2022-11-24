
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import {useParams, useLocation, Outlet, Link, useMatch} from 'react-router-dom'
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from './api';
import { Helmet } from 'react-helmet';

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 7px 0px;
    display: block;
  }
`;

const Title = styled.h1`
font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Container = styled.div`
padding: 0px  20px;
max-width: 450px;
margin: 0 auto;
    
`
const Loader = styled.span`
    text-align: center;
    display: block;
`

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`
const Btn = styled.button`
  display: flex;
  margin: 20px;
  justify-content: right;
  color: ${(props) => props.theme.textColor};
  font-size: 28px;
  .list {
    margin: 0 0 -3px;
  }
  &:hover {
    transition: 0.3s linear;
    color: ${(props) => props.theme.accentColor};
  }
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface RouteState {
    name: string
}


interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: Date;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: Date;
  last_data_at: Date;
}
interface IPriceData {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
  total_supply: number;
  max_supply: number;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin(){
    const {coinId} = useParams();
    const location = useLocation();
    const state = location.state as RouteState
    const priceMatch = useMatch('/:coinId/price')
    const chartMatch = useMatch('/:coinId/chart') 
    const { isLoading:infoLoading, data: infoData} = useQuery<IInfoData>(['info', coinId], ()=>fetchCoinInfo(coinId))
    const { isLoading: tickersLoading, data: tickersData } =
      useQuery<IPriceData>(["tickers", coinId], () => fetchCoinTickers(coinId), {
        refetchInterval: 5000
      });
      const loading = infoLoading ||  tickersLoading
      return (
        <Container>
        <Btn style={{ display: "abso" }}>
        <Link to={"/"}>GO HOME</Link></Btn>
        <Header>
          <Helmet>
            <title>
              {state?.name
                ? state.name
                : loading
                ? "Loading..."
                : infoData?.name}
              {` $${tickersData?.quotes.USD.price.toFixed(2)}`}
            </title>
          </Helmet>
          <Title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
        </Header>
        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>${infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                <span>{tickersData?.quotes.USD.price.toFixed(2)}</span>
              </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>

            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
            </Tabs>

            <Outlet context={{ coinId }} />

            {/* <Link to={`/${coinId}/chart`} >Chart</Link>
          <Link to={`/${coinId}/price`}>Price</Link> */}
          </>
        )}
      </Container>
    );
}
export default Coin;