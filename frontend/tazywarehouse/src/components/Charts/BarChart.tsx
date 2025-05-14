// components/Charts/BarChart.tsx
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function BarChart({ data, labels, colors, isStacked = true, legend }: {
  data: number[] | number[][];
  labels: string[];
  colors: string[];
  isStacked?: boolean;
  legend?: string[];
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: !!legend,
      },
    },
    scales: {
      x: {
        stacked: isStacked,
      },
      y: {
        stacked: isStacked,
      },
    },
  };

  const chartData = {
    labels,
    datasets: Array.isArray(data[0]) 
      ? (data as number[][]).map((d, i) => ({
          label: legend?.[i] || '',
          data: d,
          backgroundColor: colors[i],
        }))
      : [{
          label: legend?.[0] || '',
          data: data as number[],
          backgroundColor: colors,
        }]
  };

  return <Bar options={options} data={chartData} />;
}