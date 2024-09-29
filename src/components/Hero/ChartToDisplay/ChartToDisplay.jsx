import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import css from './ChartToDisplay.module.css';

Chart.register(...registerables);

export const ChartToDisplay = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.date), 
        datasets: [
            {
                label: 'Bitcoin/USDT',
                data: data.map(item => item.value),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderWidth: 1,
                tension: 0.1,
                pointBackgroundColor: "rgba(152, 251, 152, 0.2)",
                pointHitRadius: 0.5,
                pointBorderWidth: 0.5,

            },
        ],

    }

    return <>
        <div className={css.chartConteiner}>
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    </>

};