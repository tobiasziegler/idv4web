import * as d3 from 'd3';

// Dynamic, random dataset
let dataset = [];
const numDataPoints = 50;
const xRange = Math.random() * 1000;
const yRange = Math.random() * 1000;
for (let i = 0; i < numDataPoints; i++) {
  const newNumber1 = Math.floor(Math.random() * xRange);
  const newNumber2 = Math.floor(Math.random() * yRange);
  dataset.push([newNumber1, newNumber2]);
}

// Width and height
const w = 500;
const h = 300;
const padding = 30;

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
  .attr('class', 'axis')
  .attr('transform', 'translate(0,' + (h - padding) + ')')
  .call(xAxis);

svg
  .append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(' + padding + ',0)')
  .call(yAxis);
