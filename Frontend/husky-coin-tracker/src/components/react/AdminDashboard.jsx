import StatisticBox from "./StatisticBox";
import UserList from "./UserList";

function AdminDashboard({users, coins, transactions}) {
    return (
    <div>
        <p className ="ms-12 mt-10 text-4xl font-bold text-gray-700"> Admin Dashboard </p>
        <div className="grid grid-rows-1 grid-flow-col mx-60 my-24">
            <StatisticBox title={'Users'} statistic={users.length}/>
            <StatisticBox title={'Coins'} statistic={coins.length}/>
            <StatisticBox title={'Transactions'} statistic={transactions}/>
        </div>
        <UserList users={users}/>
    </div>)
}

export default AdminDashboard;