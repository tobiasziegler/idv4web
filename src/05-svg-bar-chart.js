import * as d3 from 'd3';

const dataset = [
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
const w = 500;
const h = 100;
const barPadding = 1;

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
  .attr('x', (d, i) => i * (w / dataset.length)) // Bar width of 20 plus 1 for padding
  .attr('y', 0)
  .attr('width', w / dataset.length - barPadding)
  .attr('height', 100);
