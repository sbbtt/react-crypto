import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 450px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    padding: 20px;
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in-out;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
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
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function Coins() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((x) => !x);
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins, {});

  return (
    <Container>
      <Helmet>
        <title>Crypto Currencies</title>
      </Helmet>
      <Btn onClick={toggleDarkAtom}>
      {isDark ? "Light Mode" : "Dark Mode"}
        </Btn>
      <Header>
        <Title>Crypto Currencies</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((x) => (
            <Coin key={x.id}>
              <Link to={`/${x.id}`} state={x}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${x.symbol.toLowerCase()}`}
                />
                {x.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
