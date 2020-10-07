import React, { CanvasHTMLAttributes } from 'react';

import Chart from 'chart.js';

import { Container } from './styles';

interface ILineChartProps extends CanvasHTMLAttributes<HTMLCanvasElement> {
  data: any;
  average?: any;
  labels: any;
}

const LineChart: React.FC<ILineChartProps> = ({ data, average, labels }) => {
  const chartRef = React.useRef<HTMLCanvasElement | any>();

  React.useEffect(() => {
    const myChartRef: any = chartRef.current?.getContext('2d');
    new Chart(myChartRef, {
      type: 'bar',
      data: {
        labels,
        datasets: data,
      },
      options: {},
    });
  }, [data, labels]);
  return (
    <Container>
      <canvas id="myChart" ref={chartRef} />
    </Container>
  );
};
export default LineChart;
