import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

export const OwnerChartMonth = ({ names, numbers , type , colors  }) => {
      function format_number(number)
      {
        return number;
      }
      let new_total = numbers
      let new_color =['#0095e8'] 
      if(type === 'total')
      {
         new_total = numbers.map(number => format_number(number))
         new_color =['#11d339'] 
      }
      

    const [state, setState] = useState({
        options: {
          chart: {
            id: 'basic-area',
            type: 'area',
            height: 10,
            zoom: {
              enabled: false
            }
          },
          colors: new_color,
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            categories: names
          },
          yaxis: {
            opposite: true
          },
          
          
          legend: {
            horizontalAlign: 'left'
          },
          grid: {
            padding: {
              top: 10,
              right: 20,
              bottom: 10,
              left: 20
            }
          }
        },
        
        series: [
          {
            name: 'Orders',
            data: new_total
          }
        ]
      });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        xaxis: {
          categories: names
        }
      },
      series: [
        {
          name: 'Orders',
          data: new_total
        }
      ]
    }));
  }, [names, numbers]);

  return (
    <div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        width="100%"
        height={400}
      />
    </div>
  );
};
