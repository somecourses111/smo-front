import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export const BarChart = ({ names, numbers }) => {
  const [series] = useState([
    {
      name: 'new users',
      data: numbers,
    },
  ]);

  const [options] = useState({
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: '10px',
        colors: ['#304758'],
      },
    },
    xaxis: {
      categories: names,
      position: 'top',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + '%';
        },
      },
    },
    title: {
      text: 'new users count',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444',
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
