import * as d3 from 'd3';

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

// On button click, execute a function for each circle in the allCircles selection
d3.selectAll('input').on(
  'click',
  () => allCircles.each(freakOut) // Hold on to your hats!
);

// Define the freakOut function
const freakOut = function(d, i) {
  // Since this function will be called by 'each()',
  // it will be aware of each element on which it operates.
  // The 'this' context will be updated, and d and i will
  // be populated with the associated values.
  const colors = d3.schemeCategory10;
  const colorIndex = Math.round(Math.random() * 10);
  d3
    .select(this)
    .transition()
    .delay(i * 25)
    .duration(2000)
    .ease(d3.easeElasticOut)
    .attr('fill', colors[colorIndex])
    .attr('r', 25);
};
