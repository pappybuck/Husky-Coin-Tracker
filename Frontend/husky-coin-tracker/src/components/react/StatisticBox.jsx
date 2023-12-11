function StatisticBox({ title, statistic }) {
    return (
        <div className="container flex border-2 mx-2 w-64 h-44 rounded-2xl justify-center items-center relative block bg-gray-50 rounded-lg shadow p-4">
            <div className="text-2xl self-start left-3 top-2 absolute">{title}</div>
            <span className="text-xl">
                {statistic}
            </span>
        </div>
    );
}
export default StatisticBox;