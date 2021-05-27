import React from 'react';
import PropTypes from 'prop-types';
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from 'echarts/core';
import { BarChart } from "echarts/charts";
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
import { sequenceColor } from './colorPalette';

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer, LegendComponent]
);

const BarSeries = ({ title, series, orientation }) => {
	const data = series.map(item => item.name);
	const serie = series.map((item, idx) => ({ value: item.value, itemStyle: {color: sequenceColor(idx) }}) );

	const axisData = { data }
	const axisValue = { type: 'value' }
	const chooseAxis = (orientation) => ({
		"v": { xAxis: axisData, yAxis: axisValue },
		"h": { xAxis: axisValue, yAxis: axisData },
	})[orientation] || false;
	const axis = chooseAxis(orientation)

	const option = {
    title: {
      text: title,
      x: "center"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c}"
    },
		xAxis: axis.xAxis,
    yAxis: axis.yAxis,
    series: [{
        data: serie,
        type: 'bar',
				name: title,
			}]
	}

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
		/>
  )
}

BarSeries.propTypes = {
	title: PropTypes.string,
	series:
		PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				value: PropTypes.number
			})
		),
	orientation: PropTypes.oneOf(['v', 'f'])
}

export default BarSeries;
