import AirQualityDashboard from './components/Dashboard/AirQualityDashboard';
import AirQualityChart from './components/Chart/AirQualityChart'
import ClircleAirQualityChart from './components/Chart/CircleChart/CircleAirQualityChart'

const Page = () => {
  return (
    <div className="flex h-screen">
      {/* Metade esquerda ocupada pelo ClircleAirQualityChart */}
      <div className="w-1/2 h-full flex items-center justify-center p-4">
        <ClircleAirQualityChart className="w-full h-full" />
      </div>

      {/* Metade direita dividida entre AirQualityDashboard e AirQualityChart */}
      <div className="w-1/2 h-full flex flex-col gap-3 p-4">
        <div className="flex-1 w-full">
          <AirQualityDashboard /*className="w-full h-full dashboard-container" *//>
        </div>
        <div className="flex-1 w-full flex items-center justify-center">
          <AirQualityChart className="w-full h-full chart-container"/>
        </div>
      </div>
    </div>
  );
};

export default Page;
