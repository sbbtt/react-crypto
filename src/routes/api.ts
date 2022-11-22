const BASE_URL = `https://api.coinpaprika.com/v1`
export function fetchCoins(){
    return fetch(`${BASE_URL}/coins`).then(response => 
    response.json()
    );
}

export function fetchCoinInfo(coinId:string|undefined){
    return fetch(`${BASE_URL}/coins/${coinId}`).then(response => 
        response.json()
        );
}
export function fetchCoinTickers(coinId:string|undefined){
    return fetch(`${BASE_URL}/tickers/${coinId}`).then(response => 
        response.json()
        );
}
export function fetchCoinHistory(coinId:string|undefined){
    // const endDate = Math.floor(Date.now()/1000)
    // const startDate = endDate - 60 * 60 * 23;
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`)
    .then(response => {
        if(!response.ok) {
            throw new Error (`에러코드 ${response.status} 발생했습니다.`)
        }
        return response.json()
    })
}