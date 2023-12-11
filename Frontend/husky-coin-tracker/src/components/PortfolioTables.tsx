import { For } from "solid-js";

export default function Portfolio(props: any) {
    let initialTotalInvested: any = 0

    props.portfolio.forEach((entry: any) => {
        initialTotalInvested += entry.Amount * entry.Coin.Price
    })
    const totalBalance = (props.user?.balance + initialTotalInvested).toFixed(2);
    const totalInvested = initialTotalInvested.toFixed(2);
    const buyingPower = totalBalance - totalInvested;

    const assets = props.portfolio.filter((entry: any) => {
        return entry.Amount !== 0;
    });

    const recentTransactions = props.transactions.sort((a: any, b: any) => {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
    });

    const transactions = recentTransactions.slice(0, Math.min(recentTransactions.length, 10));

    return (
        <>
            <div class="portfolio-page-container mt-10">
                <div class="assets-container ml-12 mr-12 mb-6">
                    <div class="text-lg font-medium text-black mb-2">Portfolio Assets</div>
                    {assets.length > 0 ?
                        <div class="table-container">
                            <table class="border w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            <div class="flex items-center">
                                                Coin

                                            </div>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <button class="flex items-center">
                                                Price

                                            </button>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <div class="flex items-center">
                                                Day Change

                                            </div>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <div class="flex items-center">
                                                Amount

                                            </div>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <div class="flex items-center">
                                                Value

                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <For each={assets}>
                                        {(asset: any) => (
                                            <tr class="bg-white border-b">
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    <a href={`/coins/${asset.Coin.CoinId}`}>
                                                        <div class="flex items-center">
                                                            <img
                                                                src={`/icons/${asset.Coin.Symbol}.svg`}
                                                                alt="Icon Picture"
                                                                class="rounded-full w-10 h-10 mr-2"
                                                            />
                                                            {asset.Coin.Name}<span class="text-gray-400">({asset.Coin.Symbol})</span>
                                                        </div>
                                                    </a>
                                                </th>
                                                <td class="px-6 py-4 text-black">
                                                    ${asset.Coin.Price.toFixed(2)}
                                                </td>
                                                {asset.Coin.Day < 0 ? (
                                                    <td class="px-6 py-4 text-red-500">
                                                        <div class="flex items-center">
                                                            <svg class="w-3 h-3 ms-1.5 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                                <path class="cls-1" d="M8,2L2,14H14L8,2Z"></path>
                                                            </svg>
                                                            {asset.Coin.Day.toFixed(3)}%
                                                        </div>
                                                    </td>
                                                ) : (
                                                    <td class="px-6 py-4 text-green-500">
                                                        <div class="flex items-center">
                                                            <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                                <path class="cls-1" d="M8,2L2,14H14L8,2Z"></path>
                                                            </svg>
                                                            {asset.Coin.Day.toFixed(3)}%
                                                        </div>
                                                    </td>
                                                )}
                                                <td class="px-6 py-4 text-black">
                                                    {asset.Amount}
                                                </td>
                                                <td class="px-6 py-4 text-black">
                                                    ${(asset.Amount * asset.Coin.Price).toFixed(2)}
                                                </td>
                                            </tr>
                                        )}
                                    </For>
                                </tbody>
                            </table>
                        </div> : <div class="text-sm font-medium text-black mb-2">None</div>
                    }
                </div>
                <div class="recent-transactions-container ml-12 mr-12 mb-12">
                    <div class="text-lg font-medium text-black mb-2">Recent Transactions</div>
                    {transactions.length > 0 ?
                        <div class="table-container">
                            <table class="border w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            <div class="flex items-center">
                                                Type

                                            </div>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <button class="flex items-center">
                                                Coin

                                            </button>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <div class="flex items-center">
                                                Amount

                                            </div>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <div class="flex items-center">
                                                Date

                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <For each={transactions}>
                                        {(transaction: any) => (
                                            <tr class="bg-white border-b">
                                                <td class="px-6 py-4 text-black">
                                                    {transaction.Type}
                                                </td>
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {transaction.Coin !== "" && <a href={`/coins/${transaction.Coin.CoinId}`}>
                                                        <div class="flex items-center">
                                                            <img
                                                                src={`/icons/${transaction.Coin.Symbol}.svg`}
                                                                alt="Icon Picture"
                                                                class="rounded-full w-10 h-10 mr-2"
                                                            />
                                                            {transaction.Coin.Name}<span class="text-gray-400">({transaction.Coin.Symbol})</span>
                                                        </div>
                                                    </a>}
                                                    {transaction.Coin === "" && <div class="flex items-center">
                                                        N/A
                                                    </div>}
                                                </th>
                                                <td class="px-6 py-4 text-black">
                                                    {transaction.Type == "Withdraw" || transaction.Type == "Deposit" ? `$${transaction.Amount}` : transaction.Amount}
                                                </td>
                                                <td class="px-6 py-4 text-black">
                                                    {new Date(transaction.created).toLocaleString()}
                                                </td>
                                            </tr>
                                        )}
                                    </For>
                                </tbody>
                            </table>
                        </div> : <div class="text-sm font-medium text-black mb-2">None</div>
                    }
                </div>
            </div>
        </>
    );
}