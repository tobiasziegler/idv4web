import * as d3 from 'd3';

// Dynamic, random dataset
let dataset = [];
const numDataPoints = 50;
let xRange = Math.random();
let yRange = Math.random();
for (let i = 0; i < numDataPoints; i++) {
  const newNumber1 = Math.random() * xRange;
  const newNumber2 = Math.random() * yRange;
  dataset.push([newNumber1, newNumber2]);
}

// Width and height
const w = 500;
const h = 300;
const padding = 40;

const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, d => d[0])])
  .range([padding, w - padding * 2]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, d => d[1])])
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

svg
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
  xRange = Math.random();
  yRange = Math.random();
  dataset = [];
  for (let i = 0; i < numDataPoints; i++) {
    const newNumber1 = Math.random() * xRange;
    const newNumber2 = Math.random() * yRange;
    dataset.push([newNumber1, newNumber2]);
  }

  // Update scale domains
  xScale.domain([0, d3.max(dataset, d => d[0])]);
  yScale.domain([0, d3.max(dataset, d => d[1])]);

  // Update all circles
  svg
    .selectAll('circle')
    .data(dataset)
    .transition()
    .duration(1000)
    .attr('cx', d => xScale(d[0]))
    .attr('cy', d => yScale(d[1]));

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
