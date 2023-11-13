import { Show, Suspense, createSignal, lazy, onMount } from "solid-js"
const Chart = lazy(() => import('./Chart'))


async function getCoinData() {
    let res = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1')

    let data = await res.json()

    return data
}



export default function Coin() {

    const [coinData, setCoinData] = createSignal<number[][]>([])

    onMount(async () => {
        let data = await getCoinData()

        let prices = data.prices

        setCoinData(prices)
    })

    return (
        <div>
            <h1>Bitcoin</h1>
            <Show when={coinData().length > 0}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Chart Data={coinData()} />
                </Suspense>
            </Show>
        </div>
    );
}