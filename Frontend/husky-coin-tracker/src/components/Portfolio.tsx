import { For, createSignal } from "solid-js";
import "./Portfolio.css"

export default function Portfolio(props: any) {
    const exampleAssets = [{name: "Bitcoin", price: 24500, change: 22.1, marketCap: "22.4B"}, {name: "Ethereum", price: 15000, change: -14.2, marketCap: "5.4B"}]

    const [totalBalance, setTotalBalance] = createSignal<Number>(Math.round((props.user?.balance + Number.EPSILON) * 100) / 100)
    const [totalInvested, setTotalInvested] = createSignal<Number>(200);
    const [totalReturn, setTotalReturn] = createSignal<Number>(-150);
    const [dayReturn, setDayReturn] = createSignal<Number>(100);

    const [buyingPower, setBuyingPower] = createSignal<Number>(100)

    const [assets, setAssets] = createSignal<any[]>(exampleAssets);

    console.log("Portfolios", props.portfolio);

    return (
        <div class="portfolio-page-container mt-10">
            <div class="title">
                {props.user?.name}'s Portfolio
            </div>
            <div class="statistic-boxes-container mt-5">
                <div class="statistic-box">
                    <p class="mx-2">Total Balance</p>
                    <div class="center mt-2">${totalBalance().toString()}</div>
                </div>
                <div class="statistic-box">
                    <p class="mx-2">Total Invested</p>
                    <div class="center mt-2">${totalInvested().toString()}</div>
                </div>
                <div class="statistic-box">
                    <p class="mx-2">Total Return</p>
                    <div class="center mt-2">${totalReturn().toString()}</div>
                </div>
                <div class="statistic-box">
                    <p class="mx-2">Day Return</p>
                    <div class="center mt-2">${dayReturn().toString()}</div>
                </div>
            </div>
            <div class="graph-container mt-2">
                Graph goes here
            </div>
            <div class="buying-power-container">
                    Buying Power: ${buyingPower().toString()}
            </div>
            <div class="assets-container mt-10">
                <div class="assets-title mx-2">Your Assets</div>
                <div class="table-container">
                    <table class="asset-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Change</th>
                                <th>Market Cap</th>
                            </tr>
                            <tr class="hor-line">
                                <td colspan="100%"></td>
                            </tr>
                        </thead>
                        <tbody>
                            <For
                                each={assets()}
                            >
                                {(asset: any) => (
                                    <>
                                    <tr>
                                        <td>{asset.name}</td>
                                        <td>{asset.price}</td>
                                        <td>{asset.change}</td>
                                        <td><div class="market-cap-container"><div>{asset.marketCap}</div><button class="trade-btn">Trade</button></div></td>
                                    </tr>
                                    <tr class="hor-line">
                                        <td colspan="100%"></td>
                                    </tr>
                                </>     
                                )}
                            </For>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}