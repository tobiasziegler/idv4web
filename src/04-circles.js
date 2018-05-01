import * as d3 from 'd3';

const dataset = [5, 10, 15, 20, 25];

// Width and height
const w = 500;
const h = 50;

const svg = d3
  .select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

const circles = svg
  .selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle');

circles
  .attr('cx', (d, i) => i * 50 + 25)
  .attr('cy', h / 2)
  .attr('r', d => d)
  .attr('fill', 'yellow')
  .attr('stroke', 'orange')
  .attr('stroke-width', d => d / 2);
