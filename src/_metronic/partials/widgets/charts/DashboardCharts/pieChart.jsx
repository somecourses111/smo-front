import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export const PieChart = ({ numbers }) => {
  const [series] = useState(numbers);
    console.log('numbers',numbers);
  const [options] = useState({
    chart: {
      width: 500,
      type: 'pie',
    },
    labels: ['new users', 'new orders from users'],
    responsive: [
      {
        breakpoint: 20,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="pie" width={500} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
