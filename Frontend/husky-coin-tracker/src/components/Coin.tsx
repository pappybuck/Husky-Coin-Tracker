import { Show, Suspense, createSignal, lazy, onMount } from "solid-js"
import _ from "lodash";

const Chart = lazy(() => import('./Chart'))

async function getCoinData(coinName: string) {
    let res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinName}/market_chart?vs_currency=usd&days=1`)
    let data = await res.json()
    return data
}

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// TODO: make coin take in a coin name/ticker 
export default function Coin(props: any) {
    const [coinData, setCoinData] = createSignal<number[][]>([])

    onMount(async () => {
        let data = await getCoinData(props.coin.CoinId)
        let prices = data.prices
        setCoinData(prices)
    })

    return (
        <div class="container pl-6 pr-6">
            <Show when={coinData().length > 0}>
                <div>
                    <div>
                        <div class="flex items-cente mb-2">
                            <img
                                src={`/icons/${props.coin.Symbol}.svg`}
                                alt="Icon Picture"
                                class="rounded-full w-10 h-10 mr-2"
                            />
                            <div>
                                <span class="text-4xl font-medium text-black">
                                    {_.capitalize(props.coin.CoinId)}
                                </span>
                                <span class="ml-2 text-sm font-medium text-black opacity-30">
                                    {props.coin.Symbol}
                                </span>
                            </div>
                        </div>
                        <span class="text-3xl font-light text-gray-800">
                            ${numberWithCommas(props.coin.Price)}
                        </span>

                        <div class="flex flex-col mt-3 space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="opacity-60 font-medium text-black">Market Cap</span>
                                <span class="opacity-60 font-medium text-black">
                                    ${numberWithCommas(props.coin.Marketcap)}
                                </span>
                            </div>
                            <div class="h-px bg-black opacity-10"></div>
                        </div>

                        <div class="w-full mt-4">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Chart Data={coinData()} name={`${_.capitalize(props.coin.CoinId)} Price History`} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </Show>
        </div>
    );
}