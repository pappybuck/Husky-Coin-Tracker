import { For, Suspense, createSignal } from "solid-js";
import "./Portfolio.css"


export default function Portfolio(props: any) {
    let initialTotalInvested: any = 0

    props.portfolio.forEach((entry: any) => {
        initialTotalInvested += entry.Amount * entry.Coin.Price
    })
    const [totalBalance, setTotalBalance] = createSignal<Number>((props.user?.balance + initialTotalInvested).toFixed(2))
    const [totalInvested, setTotalInvested] = createSignal<Number>(initialTotalInvested.toFixed(2));

    const [buyingPower, setBuyingPower] = createSignal<Number>(totalBalance() - totalInvested());

    const [assets, setAssets] = createSignal<any[]>(props.portfolio.filter((entry: any) => {
        return entry.Amount !== 0;
    }));

    let recentTransactions = props.transactions.sort((a: any, b: any) => {
        return new Date(b.created) - new Date(a.created);
    })

    recentTransactions = recentTransactions.slice(0, Math.min(recentTransactions.length, 10));

    const [transactions, setTransactions] = createSignal<any[]>(recentTransactions);

    return (
        <>
        {!props.user && <div class="portfolio-page-container mt-10">
            Login to view your Portfolio</div>}
        {props.user && <div class="portfolio-page-container mt-10">
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
            </div>
            <div class="buying-power-container">
                    Buying Power: ${buyingPower().toFixed(2).toString()}
            </div>
            <div class="assets-container mt-10">
                <div class="panel-title mx-2">Assets</div>
                <div class="table-container">
                    <table class="border w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    <div class="flex items-center">
                                        Coin Name
                                        <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </div>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <button class="flex items-center">
                                        Price
                                        <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </button>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <div class="flex items-center">
                                        Day Change
                                        <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </div>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <div class="flex items-center">
                                        Amount
                                        <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </div>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <div class="flex items-center">
                                        Value
                                        <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <For each={assets()}>
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
                </div>
            </div>
            <div class="recent-transactions-container mt-10">
                <div class="panel-title mx-2">Recent Transactions</div>
                <div class="table-container">
                    <table class="border w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    <div class="flex items-center">
                                        Type
                                        <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </div>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <button class="flex items-center">
                                        Coin Name
                                        <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </button>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <div class="flex items-center">
                                        Amount
                                        <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </div>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <div class="flex items-center">
                                        Date
                                        <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <For each={transactions()}>
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
                                            {transaction.Amount}
                                        </td>
                                        <td class="px-6 py-4 text-black">
                                            {new Date(transaction.created).toLocaleString()}
                                        </td>
                                    </tr>
                                )}
                            </For>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>}
        </>
    );
}