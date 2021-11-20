require('dotenv').config();
const axios = require('axios').default;
const moment = require('moment');

// Returns all transactions for block range
async function fetchFirstTransaction() {
    // Address of contract of interest
    const proxyAddr = `0x9992847Cb19492673457f7f088Eb2d102F98aeCC`;
    
    console.log(`Fetching all Txs For ${proxyAddr}`);

    // https://etherscan.io/apis#accounts

    // const URL = `https://api.etherscan.io/api?module=account&action=balance&address=${proxyAddr}&tag=latest&apikey=${process.env.ETHERSCAN}`
   
   // const URL = `https://api.etherscan.io/api?module=account&action=txlist&address=${proxyAddr}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${process.env.ETHERSCAN}`

    const URL = `https://api.etherscan.io/api?module=account&action=txlist&address=${proxyAddr}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN}`
    
    const response = await axios.get(URL);
    
    // console.log(response.data.status);
    // console.log(response.data.message);

    const data = await response.data.result[0].timeStamp;
    // console.log(data)

    const time = moment.unix(data).format("DD-MM-YYYY")

    // console.log(time)

    return time;
}


async function getPrice(dataa) {

    const URL = `https://api.coingecko.com/api/v3/coins/ethereum/history?date=${dataa}`

    const response = await axios.get(URL);

    const finalPrice = response.data.market_data.current_price.usd

    return finalPrice



}

async function returnPrice () {

    const date = await fetchFirstTransaction()
    const price = await getPrice(date)

    console.log(price)
    return price

}

returnPrice()