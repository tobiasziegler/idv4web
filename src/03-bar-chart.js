import * as d3 from 'd3';
import './03-bar-chart.css';

const dataset = [25, 7, 5, 26, 11];

d3
  .select('body')
  .selectAll('div')
  .data(dataset)
  .enter()
  .append('div')
  .attr('class', 'bar')
  .style('height', d => d * 5 + 'px');
