import * as d3 from 'd3';
import './08-line-chart.css';

// Width and height
const w = 800;
const h = 300;
const padding = 40;

let dataset = []; // Empty for now

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
    .range([0, w]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, d => d.average)])
    .range([h, 0]);

  // Define line generator
  const line = d3
    .line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.average));

  // Create SVG element
  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  // Create line
  svg
    .append('path')
    .datum(dataset)
    .attr('class', 'line')
    .attr('d', line);
});
