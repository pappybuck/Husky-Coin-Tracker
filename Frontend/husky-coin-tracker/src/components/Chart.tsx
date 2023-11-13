import { SolidApexCharts } from 'solid-apexcharts';



export default function Chart ({Data} : {Data: number[][]}) {



    return (
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
                data: Data.map((coin: number[]) => {
                    return coin[1]
                })
            },
        ],
        xaxis: {
            categories: Data.map((coin: number[]) => {
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
    )
}