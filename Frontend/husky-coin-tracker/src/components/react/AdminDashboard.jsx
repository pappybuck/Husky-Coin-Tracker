import StatisticBox from "./StatisticBox";
import UserList from "./UserList";

function AdminDashboard({users, coins}) {
    return (
    <div>
        <p className ="ms-12 mt-10 font-bold text-xl"> Admin Dashboard </p>
        <div className="grid grid-rows-1 grid-flow-col mx-60 my-24">
            <StatisticBox title={'Users'} statistic={users.length}/>
            <StatisticBox title={'Transactions'} statistic={'300'}/>
            <StatisticBox title={'Coins'} statistic={coins.length}/>
        </div>
        <UserList users={users}/>
    </div>)
}

export default AdminDashboard;