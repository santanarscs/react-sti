import React, { useEffect, useRef, useCallback } from 'react';

import Chart, { ChartLegendItem } from 'chart.js';

import {
  Container,
  Header,
  LegendContainer,
  customDatasets,
  createCustomOptions,
} from './styles';

interface IDataSet {
  label: string;
  data: number[];
  color: string;
  showBackground: boolean;
  backgroundColor: string[];
  showPoints: boolean;
}
interface ILineChartProps {
  title: string;
  data: {
    labels: string[];
    datasets: IDataSet[] | any;
  };
  options?:
    | {
        legend: boolean;
        aspectRatio: number;
        responsive: boolean;
        legendCallback: any;
        tooltips: any;
      }
    | any;
  comparative: boolean;
}

const LineChart: React.FC<ILineChartProps> = ({
  title,
  data,
  options,
  comparative = true,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const legendRef = useRef<any>(null);

  const registerToggleLegendLabel = useCallback(({ legend, chart }) => {
    const ul = legend.current.children[0];

    for (let index = 0; index < ul.children.length; index + 1) {
      ul.children[index].onclick = () => {
        const meta = chart.getDatasetMeta(index);

        if (meta.hidden === null) {
          meta.hidden = !chart.data.datasets[index].hidden;
          ul.children[index].children[0].children[0].style.opacity = 0;
        } else {
          meta.hidden = null;
          ul.children[index].children[0].children[0].style.opacity = 1;
        }

        chart.update();
      };
    }
  }, []);

  const registerOnHoverEffect = useCallback(
    ({ legend, chart }) => {
      const ul = legend.current.children[0];

      for (let index = 0; index < ul.children.length; index + 1) {
        ul.children[index].onmouseenter = () => {
          chart.data.datasets.forEach((dataset: any, datasetIndex: any) => {
            if (datasetIndex === index) {
              dataset.borderWidth += 2;
              dataset.pointRadius += 1;
              dataset.order = 1;
            } else {
              dataset.borderColor = '#aaaaaa30';
              dataset.backgroundColor = '#aaaaaa10';
              dataset.borderWidth = 2;
              dataset.pointRadius = 2;
              dataset.order = 2;
            }
          });

          chart.update();
        };

        ul.children[index].onmouseleave = () => {
          chart.data.datasets.forEach((dataset: any, datasetIndex: any) => {
            chart.data.datasets[datasetIndex] = {
              ...chart.data.datasets[datasetIndex],
              ...customDatasets,
              ...data.datasets[datasetIndex],
            };
          });

          chart.update();
        };
      }
    },
    [data],
  );

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const myChartRef: any = chartRef.current.getContext('2d');

      const chart = new Chart(myChartRef, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: data.datasets.map((dataset: IDataSet) => {
            if (dataset.backgroundColor && dataset.backgroundColor.length > 1) {
              const gradientFill = myChartRef.createLinearGradient(
                0,
                0,
                0,
                500,
              );

              dataset.backgroundColor.forEach((color, index) => {
                const offset =
                  index === 0
                    ? 0
                    : (index + 1) / dataset.backgroundColor.length;

                gradientFill.addColorStop(offset, color);
              });

              return {
                ...customDatasets,
                ...dataset,
                backgroundColor: gradientFill,
              };
            }

            return { ...customDatasets, ...dataset };
          }),
        },
        options: {
          ...createCustomOptions(comparative),
          ...options,
        },
      });

      legendRef.current.innerHTML = chart.generateLegend();
      !comparative && registerToggleLegendLabel({ legend: legendRef, chart });
      registerOnHoverEffect({ legend: legendRef, chart });
    }
  }, [
    chartRef,
    comparative,
    data.datasets,
    data.labels,
    options,
    registerOnHoverEffect,
    registerToggleLegendLabel,
  ]);

  return (
    <Container>
      <Header>
        <h1>{title}</h1>
        <LegendContainer ref={legendRef} comparative={comparative} />
      </Header>

      <canvas id="myChart" ref={chartRef} />
    </Container>
  );
};
export default LineChart;
