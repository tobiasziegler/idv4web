import * as d3 from 'd3';

let dataset = [
  5,
  10,
  13,
  19,
  21,
  25,
  22,
  18,
  15,
  13,
  11,
  12,
  15,
  20,
  18,
  17,
  16,
  18,
  23,
  25
];

// Width and height
const w = 600;
const h = 250;

const xScale = d3
  .scaleBand()
  .domain(d3.range(dataset.length))
  .rangeRound([0, w])
  .paddingInner(0.05);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, h]);

// Create SVG element
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

svg
  .selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', (d, i) => xScale(i))
  .attr('y', d => h - yScale(d))
  .attr('width', xScale.bandwidth())
  .attr('height', d => yScale(d))
  .attr('fill', d => 'rgb(0, 0, ' + Math.round(d * 10) + ')');

svg
  .selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(d => d)
  .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
  .attr('y', d => h - yScale(d) + 14)
  .attr('font-family', 'sans-serif')
  .attr('font-size', '11px')
  .attr('fill', 'white')
  .attr('text-anchor', 'middle');

d3.select('p').on('click', () => {
  dataset = [
    11,
    12,
    15,
    20,
    18,
    17,
    16,
    18,
    23,
    25,
    5,
    10,
    13,
    19,
    21,
    25,
    22,
    18,
    15,
    13
  ];

  svg
    .selectAll('rect')
    .data(dataset)
    .transition()
    .attr('y', d => h - yScale(d))
    .attr('height', d => yScale(d))
    .attr('fill', d => 'rgb(0, 0, ' + Math.round(d * 10) + ')');

  svg
    .selectAll('text')
    .data(dataset)
    .text(d => d)
    .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr('y', d => h - yScale(d) + 14);
});
