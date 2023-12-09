import { useEffect, useState } from "react";
import "./Portfolio.css"

function Portfolio({ user, portfolio, transactions }) {
    const exampleAssets = [{name: "Bitcoin", price: 24500, change: 22.1, marketCap: "22.4B"}, {name: "Ethereum", price: 15000, change: -14.2, marketCap: "5.4B"}]

    const [totalBalance, setTotalBalance] = useState(Math.round((user?.balance + Number.EPSILON) * 100) / 100);
    const [totalInvested, setTotalInvested] = useState(200);
    const [totalReturn, setTotalReturn] = useState(-150);
    const [dayReturn, setDayReturn] = useState(100);

    const [buyingPower, setBuyingPower] = useState(100)

    const [assets, setAssets] = useState(exampleAssets);

    console.log("User:", user);
    console.log("Portfolios", portfolio);
    console.log("User balance:", user?.balance);
    console.log("Transactions:", transactions)

    return (
        <div className="portfolio-page-container mt-10">
            <div className="title">
                {user?.name}'s Portfolio
            </div>
            <div className="statistic-boxes-container mt-5">
                <div className="statistic-box">
                    <p className="mx-2">Total Balance</p>
                    <div className="center mt-2">${totalBalance}</div>
                </div>
                <div className="statistic-box">
                    <p className="mx-2">Total Invested</p>
                    <div className="center mt-2">${totalInvested}</div>
                </div>
                <div className="statistic-box">
                    <p className="mx-2">Total Return</p>
                    <div className="center mt-2">${totalReturn}</div>
                </div>
                <div className="statistic-box">
                    <p className="mx-2">Day Return</p>
                    <div className="center mt-2">${dayReturn}</div>
                </div>
            </div>
            <div className="graph-container mt-2">
                Graph goes here
            </div>
            <div className="buying-power-container">
                    Buying Power: ${buyingPower}
            </div>
            <div className="assets-container mt-10">
                <div className="assets-title mx-2">Your Assets</div>
                <div className="table-container">
                    <table className="asset-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Change</th>
                                <th>Market Cap</th>
                            </tr>
                            <tr style={{ borderBottom: "1px solid black" }}>
                                <td colspan="100%"></td>
                            </tr>
                        </thead>
                        <tbody>
                            {assets.map((asset) =>
                                <>
                                    <tr>
                                        <td>{asset.name}</td>
                                        <td>{asset.price}</td>
                                        <td>{asset.change}</td>
                                        <td><div className="market-cap-container"><div>{asset.marketCap}</div><button className="trade-btn">Trade</button></div></td>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid black" }}>
                                        <td colspan="100%"></td>
                                    </tr>
                                </>
                    
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Portfolio;