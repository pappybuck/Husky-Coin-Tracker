import { Show, Suspense, createSignal, lazy, onMount } from "solid-js"
const Chart = lazy(() => import('./Chart'))

async function getCoinData(coinName: string) {
    let res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinName}/market_chart?vs_currency=usd&days=1`)
    let data = await res.json()
    return data
}

function sentenceCase(str: string) {
    return str.toLowerCase().replace(/(^|\s)\S/g,
        (firstLetter) => firstLetter.toUpperCase());
}

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// TODO: make coin take in a coin name/ticker 
export default function Coin(coin: any) {

    const [coinData, setCoinData] = createSignal<number[][]>([])

    onMount(async () => {
        let data = await getCoinData(coin.coin.CoinId)
        let prices = data.prices
        setCoinData(prices)
    })

    // console.log("Coin data: " + JSON.stringify(coinData))
    // console.dir(coinData)

    return (
        <div class="container ml-4">
            <Show when={coinData().length > 0}>

                <div>
                    <nav aria-label="Breadcrumb" class="p-6">
                        <ol class="flex leading-none divide-x divide-red-400">
                            <li class="pr-4">
                                <a href="/" class="text-red-500 hover:text-red-600">
                                    Coins
                                </a>
                            </li>
                            <li class="px-4 text-black" aria-current="page">
                                {sentenceCase(coin.coin.CoinId)}
                            </li>
                        </ol>
                    </nav>

                    {/* <div class="columns-2"> */}

                    <div class="">


                        <span>
                            <span class=""
                                style="width: 219px; height: 76px; color: black; font-size: 40px; font-family: Poppins; font-weight: 500; word-wrap: break-word">
                                {sentenceCase(coin.coin.CoinId)}
                            </span>
                            <span class="ml-2"
                                style="opacity: 0.30; color: black; font-size: 15px; font-family: Poppins; font-weight: 500;">{coin.coin.Symbol}</span>

                            <br />
                            <span style="width: 219px; height: 76px; color: black; font-size: 40px; font-family: Poppins; font-weight: 500; word-wrap: break-word">
                                ${numberWithCommas(coin.coin.Price)}
                            </span>

                            <span class="ml-3" style="color: #12A318; font-size: 15px; font-family: Poppins; font-weight: 500; word-wrap: break-word"></span>
                            <div style="width: 461px; height: 101px; position: relative">
                                <div style="left: 0px; top: 0px; position: absolute; opacity: 0.60; color: black; font-size: 16px; font-family: Poppins; font-weight: 500; word-wrap: break-word">Market Cap </div>
                                <div style="left: 0px; top: 60px; position: absolute; opacity: 0.60; color: black; font-size: 16px; font-family: Poppins; font-weight: 500; word-wrap: break-word">24 Hour Trading Volume</div>
                                <div style="width: 461px; height: 0px; left: 0px; top: 30px; position: absolute; opacity: 0.10; border: 1px black solid"></div>
                                <div style="left: 295px; top: 0px; position: absolute; opacity: 0.60; color: black; font-size: 16px; font-family: Poppins; font-weight: 500; word-wrap: break-word">{numberWithCommas(coin.coin.Marketcap)}</div>
                                <div style="width: 461px; height: 0px; left: 0px; top: 100px; position: absolute; opacity: 0.10; border: 1px black solid"></div>
                                <div style="left: 295px; top: 70px; position: absolute; opacity: 0.60; color: black; font-size: 16px; font-family: Poppins; font-weight: 500; word-wrap: break-word">$6,646,952,699</div>
                            </div>

                        </span>

                        {/* </div> */}
                        {/* <div class="ml-2" sytle="width:100%" > */}
                        <Suspense fallback={<div>Loading...</div>}>
                            <Chart Data={coinData()} />
                        </Suspense>
                        {/* </div> */}
                    </div>


                </div>
            </Show>
        </div>

    );
}