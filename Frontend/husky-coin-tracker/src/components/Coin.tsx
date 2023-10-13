import { Show, createSignal, onMount } from "solid-js"
import { SolidApexCharts } from 'solid-apexcharts';
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
                <SolidApexCharts options={{
                    title: {
                        text: "Bitcoin Price",
                        align: "left",
                    },
                    grid: {
                        row: {
                          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                          opacity: 0.5
                        },
                    },
                    chart: {
                        id: "datetime",
                        width: "50%",
                        height: 380,
                    },
                    stroke: {
                        width: 2,
                    },
                    tooltip: {
                        x: {
                            format: "dd MMM yyyy"
                        },
                        y: {
                            formatter: function (val: string) {
                                return `$${val}`
                            }
                        }
                    },
                    series: [
                        {
                            name: "Price",
                            data: coinData().map((coin: number[]) => {
                                return coin[1]
                            })
                        },
                    ],
                    xaxis: {
                        categories: coinData().map((coin: number[]) => {
                            return new Date(coin[0]).toLocaleTimeString()
                        })
                    },
                    yaxis: {
                        title: {
                            text: "Price",
                        },
                        labels: {
                            formatter: function (val: string) {
                                return `$${val}`
                            }
                        }
                    }
                }}/>
             </Show>
        </div>
    )
}