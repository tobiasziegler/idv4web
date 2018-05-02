import * as d3 from 'd3';

// Width and height
const w = 500;
const h = 300;
const padding = 40;

let dataset, xScale, yScale; // Empty, for now

// For converting strings to Dates
const parseTime = d3.timeParse('%m/%d/%y');

// For converting Dates to strings
const formatTime = d3.timeFormat('%e');

// Function for converting CSV values from strings to Dates and numbers
const rowConverter = d => ({
  Date: parseTime(d.Date),
  Amount: parseInt(d.Amount)
});

// Load in the data
d3.csv('data/time_scale_data.csv', rowConverter).then(data => {
  // Copy data into global dataset
  dataset = data;

  // Discover start and end dates in dataset
  const startDate = d3.min(dataset, d => d.Date);
  const endDate = d3.max(dataset, d => d.Date);

  // Create scale functions
  xScale = d3
    .scaleTime()
    .domain([d3.timeDay.offset(startDate, -1), d3.timeDay.offset(endDate, 1)])
    .range([padding, w - padding]);

  yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, d => d.Amount)])
    .range([h - padding, padding]);

  const xAxis = d3
    .axisBottom()
    .scale(xScale)
    .ticks(9)
    .tickFormat(formatTime);

  const yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(10);

  // Create SVG element
  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  // Generate guide lines
  svg
    .selectAll('line')
    .data(dataset)
    .enter()
    .append('line')
    .text(d => formatTime(d.Date))
    .attr('x1', d => xScale(d.Date))
    .attr('x2', d => xScale(d.Date))
    .attr('y1', h - padding)
    .attr('y2', d => yScale(d.Amount))
    .attr('stroke', '#ddd')
    .attr('stroke-width', '1');

  // Generate circles last, so they appear in front
  svg
    .selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.Date))
    .attr('cy', d => yScale(d.Amount))
    .attr('r', 2);

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
});
