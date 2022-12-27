
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import {useParams, useLocation, Outlet, Link, useMatch} from 'react-router-dom'
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from './api';
import { Helmet } from 'react-helmet';

const Overview = styled.div`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  padding: 20px 20px;
  border-radius: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  font-size: 16px;
  padding: 10px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.bgColor};
  border-radius: 10px;
  a {
    display: block;
  }
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Title = styled.h1`
font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
    text-align: center;
    display: block;
`
const Btn = styled.button`
  position: relative;
  left: 150px;
  border-radius: 15px;
  padding: 5px 10px;
  margin-top: 10px;
  /* background-color: ${(props) => props.theme.accentColor}; */
  color: ${(props) => props.theme.textColor};
  border: 1px solid ${(props) => props.theme.textColor};
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

const OverviewItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ContentTitle = styled.span`
  font-size: 12px;
  text-align: center;
  margin-bottom: 5px;
`;

const ContentText = styled.span`
  font-size: 16px;
  text-align: center;
  line-height: 20px;
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
  contract: string;
  platform: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
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
        <Btn>
        <Link to={"/"}>HOME</Link></Btn>
        <Header>
          <Helmet>
            <ContentTitle>
              {state?.name
                ? state.name
                : loading
                ? "Loading..."
                : infoData?.name}
              {` $${tickersData?.quotes.USD.price.toFixed(2)}`}
            </ContentTitle>
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
              <ContentTitle>
                <span>Rank:</span>
              </ContentTitle>
              <ContentText><span>{infoData?.rank}</span></ContentText>
              </OverviewItem>
              <OverviewItem>
              <ContentTitle><span>Symbol:</span></ContentTitle>
              <ContentText><span>${infoData?.symbol}</span></ContentText>
              </OverviewItem>
              <OverviewItem>
              <ContentTitle><span>Price:</span></ContentTitle>
              <ContentText><span>{tickersData?.quotes.USD.price.toFixed(2)}</span></ContentText>
              </OverviewItem>
            </Overview>
            <Overview><ContentText>{infoData?.description}</ContentText></Overview>
            <Overview>
              <OverviewItem>
              <ContentTitle><span>Total Suply:</span></ContentTitle>
                <ContentText><span>{tickersData?.total_supply}</span></ContentText>
              </OverviewItem>
              <OverviewItem>
              <ContentTitle><span>Max Supply:</span></ContentTitle>
              <ContentText><span>{tickersData?.max_supply}</span></ContentText>
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

          </>
        )}
      </Container>
    );
}
export default Coin;