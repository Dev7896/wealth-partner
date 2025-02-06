const DashboardStats = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <StatBox title="Total Revenue" value="$50,000" />
        <StatBox title="Total Sales" value="1,200" />
        <StatBox title="Total Stock" value="5,000 items" />
      </div>
    );
  };
  
  const StatBox = ({ title, value }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    );
  };
  
  export default DashboardStats;
  