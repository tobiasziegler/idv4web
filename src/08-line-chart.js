import * as d3 from 'd3';
import './08-line-chart.css';

// Width and height
const w = 800;
const h = 300;
const padding = 40;

let dataset = []; // Empty for now

//For converting Dates to strings
const formatTime = d3.timeFormat('%Y');

const rowConverter = d => {
  return {
    // Make a new Date object for each year + month
    date: new Date(+d.year, +d.month - 1),
    // Convert from string to float
    average: parseFloat(d.average)
  };
};

// Load in data
d3.csv('data/mauna_loa_co2_monthly_averages.csv', rowConverter).then(data => {
  dataset = data;

  // Print data to console as table, for verification
  // console.table(dataset, ['date', 'average']);

  const xScale = d3
    .scaleTime()
    .domain([d3.min(dataset, d => d.date), d3.max(dataset, d => d.date)])
    .range([padding, w]);

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(dataset, d => (d.average >= 0 ? d.average - 10 : undefined)) - 10,
      d3.max(dataset, d => d.average)
    ])
    .range([h - padding, 0]);

  //Define axes
  const xAxis = d3
    .axisBottom()
    .scale(xScale)
    .ticks(10)
    .tickFormat(formatTime);

  //Define Y axis
  const yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(10);

  // Define line generators
  const line = d3
    .line()
    .defined(d => d.average >= 0 && d.average <= 350)
    .x(d => xScale(d.date))
    .y(d => yScale(d.average));
  const dangerLine = d3
    .line()
    .defined(d => d.average >= 350)
    .x(d => xScale(d.date))
    .y(d => yScale(d.average));

  // Create SVG element
  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  //Draw 350 ppm line
  svg
    .append('line')
    .attr('class', 'line safeLevel')
    .attr('x1', padding)
    .attr('x2', w)
    .attr('y1', yScale(350))
    .attr('y2', yScale(350));

  // Label 350 ppm line
  svg
    .append('text')
    .attr('class', 'dangerLabel')
    .attr('x', padding + 20)
    .attr('y', yScale(350) - 7)
    .text('350 ppm “safe” level');

  // Create lines
  svg
    .append('path')
    .datum(dataset)
    .attr('class', 'line')
    .attr('d', line);
  svg
    .append('path')
    .datum(dataset)
    .attr('class', 'line danger')
    .attr('d', dangerLine);

  //Create axes
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
