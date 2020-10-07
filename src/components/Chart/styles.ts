import styled, { css } from 'styled-components';

import formatLargeNumber from '../../utils/formatLargeNumbers';

export const Container = styled.div`
  padding: 1rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 1rem 0 3rem 0;

  h1 {
    font-size: 1.6rem;
    color: #a8a8b3;
  }
`;
interface ILegendContainerProps {
  comparative: any;
}
export const LegendContainer = styled.div<ILegendContainerProps>`
  ul {
    display: flex;
  }

  li {
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      font-size: 1.4rem;
      font-weight: ${({ comparative }) => (comparative ? 'normal' : 'bold')};

      transition: all 0.2s;
    }

    ${({ comparative }) =>
      !comparative &&
      css`
        span:nth-child(1) {
          width: 1.6rem;
          height: 1.6rem;
          margin-right: 0.5rem;

          border: 1px solid;
          border-radius: 3px;
          padding: 2px;

          div {
            background-color: white;
            height: 100%;
            width: 100%;

            transition: all 0.2s;
          }
        }
      `}

    :hover {
      span {
        transform: scale(1.1);
      }
    }
  }

  li + li {
    ${({ comparative }) =>
      comparative
        ? css`
            ::before {
              content: 'x';
              color: #737380;
              font-size: 1.4rem;
              margin: 0 1rem;
            }
          `
        : css`
            margin-left: 1.5rem;
          `}
  }
`;

export const customDatasets = {
  borderWidth: 3,
  borderCapStyle: 'round',
  borderJoinStyle: 'round',
  pointRadius: 4,
  pointBorderWidth: 2,
  pointBackgroundColor: '#fff',
};

export function createCustomOptions(comparative: any) {
  return {
    aspectRatio: 4,
    responsive: true,
    legend: {
      display: false,
    },
    legendCallback(chart: any) {
      const legendHtml = [];
      legendHtml.push('<ul>');

      const { datasets } = chart.data;

      for (let index = 0; index < datasets.length; index++) {
        legendHtml.push('<li>');

        !comparative &&
          legendHtml.push(
            `<span style="border-color:${datasets[index].borderColor}"><div></div></span>`,
          );

        legendHtml.push(
          `<span style="color:${datasets[index].borderColor}">${datasets[index].label}</span>`,
        );
        legendHtml.push('</li>');
      }

      legendHtml.push('</ul>');
      return legendHtml.join('');
    },

    tooltips: {
      displayColors: true,
      mode: comparative ? 'index' : 'nearest',
      intersect: false,
      titleAlign: 'center',
      callbacks: {
        label(tooltipItem: any, data: any) {
          const dataSetLabel = data.datasets[tooltipItem.datasetIndex].label;
          const valueLabel = formatLargeNumber(tooltipItem.value);
          return `${dataSetLabel}: ${valueLabel}`;
        },
        labelColor(tooltipItem: any, chart: any) {
          return {
            borderColor:
              chart.data.datasets[tooltipItem.datasetIndex].borderColor,
            backgroundColor:
              chart.data.datasets[tooltipItem.datasetIndex].borderColor,
          };
        },
      },
    },

    scales: {
      xAxes: [
        {
          gridLines: {
            drawTicks: false,
            display: false,
          },
          ticks: {
            fontColor: '#A8A8B3',
            fontStyle: '500',
            padding: 10,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            zeroLineColor: `#73738000`,
            lineWidth: 2,
            color: `#73738010`,
            drawBorder: false,
          },
          ticks: {
            maxTicksLimit: 6,
            suggestedMax: 100000,

            fontColor: '#A8A8B3',
            fontStyle: '500',
            padding: 10,
            callback: formatLargeNumber,
          },
        },
      ],
    },
  };
}
