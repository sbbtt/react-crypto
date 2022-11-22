import styled from "styled-components";
import {Link} from 'react-router-dom'
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";


const Container = styled.div`
padding: 0px  20px;
max-width: 450px;
margin: 0 auto;
    
`
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
background-color: #fff;
color: ${props=> props.theme.textColor};
border-radius: 15px;
margin-bottom: 10px;
a{
    padding: 20px;
    transition: color .6s ease-in-out;
    display: flex;
    align-items: center;
}
&:hover{
    a{
        color: ${(props)=> props.theme.accentColor}
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
`

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`
    
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function Coins(){
    const setDarkAtom = useSetRecoilState(isDarkAtom)
    const toggleDarkAtom = ()=> setDarkAtom(x=> !x)
    const { isLoading, data } = useQuery<ICoin[]>(['allCoins'], fetchCoins, {})
    // const [coins, setCoins] = useState<CoinInterface[]>([])
    // const [loading, setLoading] = useState(true)
    // useEffect(()=>{
    //     (async()=>{
            
    //         setCoins(json.slice(0,100))
    //         setLoading(false)
    //     })();
    // },[])
    
    return (
      <Container>
        <Header>
          <Title>코인</Title>
          <button onClick={toggleDarkAtom}>Toggle Mode</button>
        </Header>
        {isLoading ? 
        <Loader>
        Loading...
        </Loader>: (<CoinsList>
          {data?.slice(0,100).map((x) => (
            <Coin key={x.id}>
              <Link to={`/${x.id}`} state={x}>
                <Img 
                src={`https://coinicons-api.vercel.app/api/icon/${x.symbol.toLowerCase()}`} 
                />
                {x.name} &rarr;</Link>
            </Coin>
          ))}
        </CoinsList>
        )}
      </Container>
    );
}
export default Coins;