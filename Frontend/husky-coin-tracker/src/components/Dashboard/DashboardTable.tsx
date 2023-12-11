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

export default function DashboardTable({ coins }: { coins: Coin[] }) {

    const [coinList, filterCoinList] = createStore({ coinList: coins, originalCoinList: coins });
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
        <div>
            <div class="pb-4 bg-white">
                <div class="w-full mb-2">
                    <form class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button
                                type="submit"
                                class="p-1 focus:outline-none focus:shadow-outline"
                            >
                                <svg height="16" width="16" viewBox="0 0 512 512">
                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                </svg>
                            </button>
                        </span>
                        <input
                            type="text"
                            id="table-search"
                            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search for coins..."
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
                    </form>
                </div>
            </div>

            <table class="border w-full text-sm text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Coin
                                <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <button class="flex items-center" onClick={() => sortCoinsPrice()}>
                                Price
                                <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                            </button>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                1h %
                                <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                24 %
                                <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                7d %
                                <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Market Cap
                                <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <For each={coinList.coinList}>
                        {(coin) => (
                            <tr class="bg-white border-b">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <a href={`/coins/${coin.id}`}>
                                        <div class="flex items-center">
                                            <img
                                                src={`/icons/${coin.symbol}.svg`}
                                                alt="Icon Picture"
                                                class="rounded-full w-10 h-10 mr-2"
                                            />
                                            {coin.name} <span class="text-gray-400">({coin.symbol})</span>
                                        </div>
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
        </div>
    )


}