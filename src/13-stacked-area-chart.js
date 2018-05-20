import * as d3 from 'd3';
import './13-stacked-area-chart.css';

// Width and height
const w = 800;
const h = 500;
const padding = 20;

let dataset, xScale, yScale, xAxis, yAxis, area; // Empty, for now

// For converting strings to Dates
const parseTime = d3.timeParse('%Y-%m');

// For converting Dates to strings
const formatTime = d3.timeFormat('%b %Y');

// Function for converting CSV values from strings to Dates and numbers
// We assume one column named 'Date' plus several others that will be converted to ints
const rowConverter = (d, i, cols) => {
  // Initial 'row' object includes only date
  let row = {
    date: parseTime(d.Date) // Make a new Date object for each year + month
  };
  // Loop once for each vehicle type
  for (let i = 1; i < cols.length; i++) {
    const col = cols[i];
    // If the value exists…
    if (d[cols[i]]) {
      row[cols[i]] = +d[cols[i]]; // Convert from string to int
    } else {
      // Otherwise…
      row[cols[i]] = 0; // Set to zero
    }
  }
  return row;
};

// Set up stack method
const stack = d3.stack().order(d3.stackOrderDescending); // <-- Flipped stacking order

// Load in data
d3.csv('data/ev_sales_data.csv', rowConverter).then(data => {
  const dataset = data;
  // console.log(dataset);

  //Now that we know the column names in the data…
  let keys = dataset.columns;
  keys.shift(); // Remove first column name ('Date')
  stack.keys(keys); // Stack using what's left (the car names)

  // Data, stacked
  const series = stack(dataset);
  // console.log(series);

  // Create scale functions
  xScale = d3
    .scaleTime()
    .domain([d3.min(dataset, d => d.date), d3.max(dataset, d => d.date)])
    .range([padding, w - padding * 2]);
  yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataset, d => {
        let sum = 0;
        // Loops once for each row, to calculate
        // the total (sum) of sales of all vehicles
        for (let i = 0; i < keys.length; i++) {
          sum += d[keys[i]];
        }
        return sum;
      })
    ])
    .range([h - padding, padding / 2])
    .nice();

  // Define axes
  xAxis = d3
    .axisBottom()
    .scale(xScale)
    .ticks(10)
    .tickFormat(formatTime);

  // Define Y axis
  yAxis = d3
    .axisRight()
    .scale(yScale)
    .ticks(5);

  // Define area generator
  area = d3
    .area()
    .x(d => xScale(d.data.date))
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]));

  // Create SVG element
  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  // Create areas
  svg
    .selectAll('path')
    .data(series)
    .enter()
    .append('path')
    .attr('class', 'area')
    .attr('d', area)
    .attr('fill', (d, i) => d3.schemeCategory10[i])
    .append('title') // Make tooltip
    .text(d => d.key);

  // Create axes
  svg
    .append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0,${h - padding})`)
    .call(xAxis);
  svg
    .append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(${w - padding * 2},0)`)
    .call(yAxis);
});
