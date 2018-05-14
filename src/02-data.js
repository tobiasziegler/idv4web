import * as d3 from 'd3';

const dataset = [5, 10, 15, 20, 25];

const allParas = d3
  .select('body')
  .selectAll('p')
  .data(dataset)
  .enter()
  .append('p')
  .text(d => 'I can count up to ' + d);

const redParas = allParas.filter(d => d > 15).style('color', 'red');
