"use client"

import { useCubeQuery } from "@cubejs-client/react";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function ChartHolder() {
  
  const [data, setData] = useState<number[]>([]);
  
  const {resultSet, error, isLoading} = useCubeQuery(
    
    {
      limit: 5000,
      order: {
        "candlesticks.timestamp": "asc"
      },
      timeDimensions: [
        {
          dimension: "candlesticks.timestamp"
        }
      ],
      dimensions: [
        "candlesticks.timestamp",
        "candlesticks.open",
        "candlesticks.high",
        "candlesticks.low",
        "candlesticks.close"
      ],
      segments: [
        "candlesticks.eth"
      ]
    }, {
      subscribe: true,
    });

    useEffect(() => {
      console.log(resultSet)
      const data = resultSet?.chartPivot().map((row) => {
          return [Date.parse(row.xValues[0]), row.xValues[1] as unknown as number, row.xValues[2] as unknown as number, row.xValues[3] as unknown as number, row.xValues[4]] as unknown as number;
      });
      console.log("Updated data")
      if (data){
        setData(data);
      }
    }, [resultSet]);
    
    if (isLoading) {
        return <p>Loading...</p>;
      }
    if (error) {
        return <p>{error.toString()}</p>;
    }
    if (!resultSet) {
        return null;
    }





  return (
    <Chart 
    options={{
        chart: {
            type: 'candlestick',
            height: 350
        },
        title: {
            text: 'Etherium Price Chart',
            align: 'left'
        },
        xaxis: {
            type: 'category',
            labels: {
              formatter: function(val) {
                let date = new Date(val);
                date.setHours(date.getHours() - 4);
                return date.toLocaleTimeString([
                  'en-US'
                ], {hour: '2-digit', minute:'2-digit', hour12: true});
              }
            }
        },
        yaxis: {
            tooltip: {
                enabled: true,
            }
        }
    }} series={[{data}]}type="candlestick" height={350} 
    />
  )
}