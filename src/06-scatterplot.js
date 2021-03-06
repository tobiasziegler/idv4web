import * as d3 from 'd3';
import './06-scatterplot.css';

// Dynamic, random dataset
let dataset = [];
const numDataPoints = 50;
for (let i = 0; i < numDataPoints; i++) {
  const newNumber1 = Math.random();
  const newNumber2 = Math.random();
  dataset.push([newNumber1, newNumber2]);
}

// Width and height
const w = 500;
const h = 300;
const padding = 40;

const xScale = d3
  .scaleLinear()
  .domain([0, 1])
  .range([padding, w - padding * 2]);

const yScale = d3
  .scaleLinear()
  .domain([0, 1])
  .range([h - padding, padding]);

const aScale = d3
  .scaleSqrt()
  .domain([0, d3.max(dataset, d => d[1])])
  .range([0, 10]);

const xAxis = d3
  .axisBottom()
  .scale(xScale)
  .ticks(5);

const yAxis = d3
  .axisLeft()
  .scale(yScale)
  .ticks(5);

const formatAsPercentage = d3.format('.1%');

xAxis.tickFormat(formatAsPercentage);
yAxis.tickFormat(formatAsPercentage);

// Create SVG element
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

// Define clipping path
svg
  .append('clipPath')
  .attr('id', 'chart-area')
  .append('rect')
  .attr('x', padding)
  .attr('y', padding)
  .attr('width', w - padding * 3)
  .attr('height', h - padding * 2);

const allCircles = svg
  .append('g')
  .attr('id', 'circles')
  .attr('clip-path', 'url(#chart-area)')
  .selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', d => xScale(d[0]))
  .attr('cy', d => yScale(d[1]))
  .attr('r', d => aScale(d[1]));

svg
  .append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (h - padding) + ')')
  .call(xAxis);

svg
  .append('g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + padding + ',0)')
  .call(yAxis);

// On click, update with new data
d3.select('p').on('click', () => {
  // New values for dataset
  dataset = [];
  for (let i = 0; i < numDataPoints; i++) {
    const newNumber1 = Math.random();
    const newNumber2 = Math.random();
    dataset.push([newNumber1, newNumber2]);
  }

  // Update all circles
  svg
    .selectAll('circle')
    .data(dataset)
    .transition()
    .duration(1000)
    .on('start', function() {
      d3
        .select(this)
        .attr('fill', 'magenta')
        .attr('r', 7);
    })
    .attr('cx', d => xScale(d[0]))
    .attr('cy', d => yScale(d[1]))
    .transition()
    .duration(1000)
    .attr('fill', 'black')
    .attr('r', 2);

  // Update x-axis
  svg
    .select('.x.axis')
    .transition()
    .duration(1000)
    .call(xAxis);

  // Update y-axis
  svg
    .select('.y.axis')
    .transition()
    .duration(1000)
    .call(yAxis);
});

// On radio button change, update styling
d3.selectAll('input').on('click', function() {
  const view = d3.select(this).node().value;
  // Reset all to black
  allCircles.attr('fill', 'black');
  const midpoint = 0.5;
  const colors = d3.schemeCategory10;
  const distance = 0.3;
  // Filter and highlight based on different conditions
  switch (view) {
    case 'centre':
      allCircles
        .filter(
          d =>
            Math.abs(midpoint - d[0]) < distance &&
            Math.abs(midpoint - d[1]) < distance
        )
        .attr('fill', colors[1]);
      break;
    case 'edges':
      allCircles
        .filter(
          d =>
            Math.abs(midpoint - d[0]) > distance ||
            Math.abs(midpoint - d[1]) > distance
        )
        .attr('fill', colors[3]);
      break;
    case 'quadrants':
      // Top left
      allCircles
        .filter(d => d[0] <= midpoint && d[1] >= midpoint)
        .attr('fill', colors[0]);

      // Top right
      allCircles
        .filter(d => d[0] > midpoint && d[1] >= midpoint)
        .attr('fill', colors[1]);
      // Bottom right
      allCircles
        .filter(d => d[0] > midpoint && d[1] < midpoint)
        .attr('fill', colors[2]);
      // Bottom left
      allCircles
        .filter(d => d[0] <= midpoint && d[1] < midpoint)
        .attr('fill', colors[3]);
      break;
    case 'none':
    default:
    // Do nothing more
  }
});
