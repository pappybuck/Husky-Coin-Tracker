import { SolidApexCharts } from 'solid-apexcharts';



export default function Chart ({Data, name} : {Data: number[][], name: string}) {



    return (
    <SolidApexCharts options={{
        title: {
            text: name,
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
            width: "100%",
            height: 650,
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