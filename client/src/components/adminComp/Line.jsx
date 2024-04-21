import React from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

const line = ({count, count1, labels})=>{
    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Answered',
            data: count,
            fill: false,
            borderColor: '#1F75FE',
            borderWidth: 2.5,
            tension: 0.5
          },
          {
            label: 'Not Answered',
            data: count1,
            fill: false,
            borderColor: '#FF69B4',
            borderWidth: 2.5,
            tension: 0.5
          },
        ],
      };
    
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      };

    return(
        <div className='line'><Line data={data} options={options}/></div>      
    );
}

export default line;