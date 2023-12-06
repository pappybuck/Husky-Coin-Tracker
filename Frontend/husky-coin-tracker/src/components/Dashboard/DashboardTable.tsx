import { For, createEffect, createSignal } from "solid-js";
import type { Coin } from "./dashboard.astro";
import { createStore } from "solid-js/store";

enum Sort {
    NAME,
    NAME_REVERSE,
    PRICE,
    PRICE_REVERSE,
    HOUR,
    HOUR_REVERSE,
    DAY,
    DAY_REVERSE,
    WEEK,
    WEEK_REVERSE,
    MARKETCAP,
    MARKETCAP_REVERSE
}

export default function DashboardTable( {coins} : {coins: Coin[]} ) {

    const [coinList, filterCoinList] = createStore({coinList: coins, originalCoinList: coins});
    const [search, setSearch] = createSignal("");
    const [sort, setSort] = createSignal<Sort>();



    const sortCoinsPrice = (reverse = true) => {
        const sortedCoins = [...coinList.coinList].sort((a, b) => {
            return b.price - a.price;
        });
        if (sort() === Sort.PRICE) {
            sortedCoins.reverse();
            setSort(Sort.PRICE_REVERSE);
        } else {
            setSort(Sort.PRICE);
        }
        filterCoinList("coinList", sortedCoins);
    }

    

    return (
        <>
            <div class="pb-4 bg-white dark:bg-gray-900">
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative mt-1">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" id="table-search" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"
                        onInput={(e) => {
                            setSearch(e.currentTarget.value);
                            filterCoinList(
                                "coinList",
                                coinList.originalCoinList.filter((coin) => {
                                    return coin.name.toLowerCase().includes(search().toLowerCase());
                                })
                            );
                            if (sort() !== undefined) {
                                sortCoinsPrice(false);
                            }
                        }}
                    />
                </div>
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        Coin Name
                    <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                    </svg>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    <button class="flex items-center" onClick={() => sortCoinsPrice()}>
                        Price
                    <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                    </svg>
                    </button>
                </th>
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        1h %
                    <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                    </svg>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        24 %
                    <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                    </svg>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        7d %
                    <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                    </svg>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        Market Cap
                    <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                    </svg>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <For each={coinList.coinList}>
                {(coin) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <a href={`/coins/${coin.id}`}>
                        {coin.name} <span class="text-gray-400 dark:text-gray-300">({coin.symbol})</span>
                    </a>
                    </th>
                    <td class="px-6 py-4 text-black">
                        ${coin.price.toLocaleString()}
                    </td>
                    {coin.hour < 0 ? (
                        <td class="px-6 py-4 text-red-500">
                            <div class="flex items-center">
                                <svg class="w-3 h-3 ms-1.5 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path class="cls-1" d="M8,2L2,14H14L8,2Z"></path> 
                                </svg>
                                {coin.hour.toLocaleString()}%
                            </div>
                        </td>
                    ) : (
                        <td class="px-6 py-4 text-green-500">
                            <div class="flex items-center">
                                <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path class="cls-1" d="M8,2L2,14H14L8,2Z"></path> 
                                </svg>
                                {coin.hour.toLocaleString()}%
                            </div>
                        </td>
                    )}
                    {coin.day < 0 ? (
                        <td class="px-6 py-4 text-red-500">
                            <div class="flex items-center">
                                <svg class="w-3 h-3 ms-1.5 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path class="cls-1" d="M8,2L2,14H14L8,2Z"></path> 
                                </svg>
                                {coin.day.toLocaleString()}%
                            </div>
                        </td>
                    ) : (
                        <td class="px-6 py-4 text-green-500">
                            <div class="flex items-center">
                                <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path class="cls-1" d="M8,2L2,14H14L8,2Z"></path> 
                                </svg>
                                {coin.day.toLocaleString()}%
                            </div>
                        </td>
                    )}
                    {coin.week < 0 ? (
                        <td class="px-6 py-4 text-red-500">
                            <div class="flex items-center">
                                <svg class="w-3 h-3 ms-1.5 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path class="cls-1" d="M8,2L2,14H14L8,2Z"></path> 
                                </svg>
                                {coin.week.toLocaleString()}%
                            </div>
                        </td>
                    ) : (
                        <td class="px-6 py-4 text-green-500">
                            <div class="flex items-center">
                                <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path class="cls-1" d="M8,2L2,14H14L8,2Z"></path> 
                                </svg>
                                {coin.week.toLocaleString()}%
                            </div>
                        </td>
                    )}
                    <td class="px-6 py-4 text-black">
                        ${coin.marketcap.toLocaleString()}
                    </td>
                </tr>
                )}
            </For>
            
            </tbody>
    </table>
        </>
    )


}