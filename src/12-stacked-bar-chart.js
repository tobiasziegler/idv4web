import * as d3 from 'd3';

const dataset = [
  { apples: 5, oranges: 10, grapes: 22 },
  { apples: 4, oranges: 12, grapes: 28 },
  { apples: 2, oranges: 19, grapes: 32 },
  { apples: 7, oranges: 23, grapes: 35 },
  { apples: 23, oranges: 17, grapes: 43 }
];

const w = 500;
const h = 300;

// Set up stack method
const stack = d3
  .stack()
  .keys(['apples', 'oranges', 'grapes'])
  .order(d3.stackOrderDescending);

// Data, stacked
const series = stack(dataset);

// Set up scales
const xScale = d3
  .scaleBand()
  .domain(d3.range(dataset.length))
  .range([0, w])
  .paddingInner(0.05);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, d => d.apples + d.oranges + d.grapes)])
  .range([h, 0]);

// Easy colors accessible via a 10-step ordinal scale
const colors = d3.scaleOrdinal(d3.schemeCategory10);

// Create SVG element
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

// Add a group for each row of data
const groups = svg
  .selectAll('g')
  .data(series)
  .enter()
  .append('g')
  .style('fill', (d, i) => colors(i));

// Add a rect for each data value
const rects = groups
  .selectAll('rect')
  .data(d => d)
  .enter()
  .append('rect')
  .attr('x', (d, i) => xScale(i))
  .attr('y', d => yScale(d[1]))
  .attr('height', d => yScale(d[0]) - yScale(d[1]))
  .attr('width', xScale.bandwidth());
