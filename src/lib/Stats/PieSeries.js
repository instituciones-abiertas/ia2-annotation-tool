import React from 'react';
import PropTypes from 'prop-types';
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from 'echarts/core';
import { PieChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from "echarts/components";
import {
  CanvasRenderer,
  // SVGRenderer,
} from 'echarts/renderers';

import {sequenceColor, colorPalette } from './colorPalette'

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, PieChart, CanvasRenderer, LegendComponent]
);

const PieSeries = ({ title, series, colors, textStyle }) => {
  const data = series.map(item => item.name)
  const seriesColor = series.map((item, idx) => ({ ...item, itemStyle: { color: sequenceColor(idx, colors) }}) );
  const option = {
    title: {
      text: title,
      x: "center",
      textStyle,
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: data
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: seriesColor,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
    />
  )
}


PieSeries.propTypes = {
  title: PropTypes.string,
  series:
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number
      })
    ),
  colors: PropTypes.array,
  textStyle: PropTypes.object
}

PieSeries.defaultProps = {
  colors: colorPalette,
  title: '',
  series: [],
  textStyle: {}
}

export default PieSeries;
