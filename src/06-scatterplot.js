import * as d3 from 'd3';

const dataset = [
  [5, 20],
  [480, 90],
  [250, 50],
  [100, 33],
  [330, 95],
  [410, 12],
  [475, 44],
  [25, 67],
  [85, 21],
  [220, 88]
];

// Width and height
const w = 500;
const h = 100;
const barPadding = 1;

const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, d => d[0])])
  .range([0, w]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, d => d[1])])
  .range([0, h]);

// Create SVG element
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

svg
  .selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', d => xScale(d[0]))
  .attr('cy', d => yScale(d[1]))
  .attr('r', d => Math.sqrt(h - d[1]));

svg
  .selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(d => d[0] + ',' + d[1])
  .attr('x', d => xScale(d[0]))
  .attr('y', d => yScale(d[1]))
  .attr('font-family', 'sans-serif')
  .attr('font-size', '11px')
  .attr('fill', 'red');
