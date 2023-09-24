import ChartHolder from "./chart";
import Provider from "./provider";



export default function Page() {
    return (
        <>
        <h1>Chart Page</h1>
        <Provider>
            <ChartHolder />
        </Provider>
        </>
    )
}

