import * as d3 from 'd3';
import './05-svg-bar-chart.css';

let dataset = [
  { key: 0, value: 5 },
  { key: 1, value: 10 },
  { key: 2, value: 13 },
  { key: 3, value: 19 },
  { key: 4, value: 21 },
  { key: 5, value: 25 },
  { key: 6, value: 22 },
  { key: 7, value: 18 },
  { key: 8, value: 15 },
  { key: 9, value: 13 },
  { key: 10, value: 11 },
  { key: 11, value: 12 },
  { key: 12, value: 15 },
  { key: 13, value: 20 },
  { key: 14, value: 18 },
  { key: 15, value: 17 },
  { key: 16, value: 16 },
  { key: 17, value: 18 },
  { key: 18, value: 23 },
  { key: 19, value: 25 }
];

const key = d => d.key;

// Width and height
const w = 600;
const h = 250;

const xScale = d3
  .scaleBand()
  .domain(d3.range(dataset.length))
  .rangeRound([0, w])
  .paddingInner(0.05);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, d => d.value)])
  .range([0, h]);

// Create SVG element
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

svg
  .selectAll('rect')
  .data(dataset, key)
  .enter()
  .append('rect')
  .attr('x', (d, i) => xScale(i))
  .attr('y', d => h - yScale(d.value))
  .attr('width', xScale.bandwidth())
  .attr('height', d => yScale(d.value))
  .attr('fill', d => 'rgb(0, 0, ' + Math.round(d.value * 10) + ')')
  .on('mouseover', function(d) {
    // Get this bar's x/y values, then augment for the tooltip
    const xPosition =
      parseFloat(d3.select(this).attr('x')) + xScale.bandwidth() / 2;
    const yPosition = parseFloat(d3.select(this).attr('y')) / 2 + h / 2;

    // Update the tooltip position and value
    d3
      .select('#tooltip')
      .style('left', xPosition + 'px')
      .style('top', yPosition + 'px')
      .select('#value')
      .text(d.value);

    // Show the tooltip
    d3.select('#tooltip').classed('hidden', false);
  })
  .on('mouseout', () => d3.select('#tooltip').classed('hidden', true))
  .on('click', () => sortBars());

d3.selectAll('p').on('click', function() {
  // See which p was clicked
  const paragraphId = d3.select(this).attr('id');

  // Decide what to do next
  if (paragraphId == 'add') {
    // Add a data value
    const maxValue = 25;
    const newValue = Math.floor(Math.random() * maxValue);
    const lastKeyValue = dataset[dataset.length - 1].key;
    dataset.push({ key: lastKeyValue + 1, value: newValue });
  } else if (paragraphId == 'remove') {
    // Remove one value from the dataset
    dataset.shift();
  }

  // Update scale domains
  xScale.domain(d3.range(dataset.length));
  yScale.domain([0, d3.max(dataset, d => d.value)]);

  // Select...
  const bars = svg.selectAll('rect').data(dataset, key);

  // Enter...
  bars
    .enter()
    .append('rect')
    .attr('x', w)
    .attr('y', d => h - yScale(d.value))
    .attr('width', xScale.bandwidth())
    .attr('height', d => yScale(d.value))
    .attr('fill', d => 'rgb(0, 0, ' + Math.round(d.value * 10) + ')')
    .merge(bars) // Update...
    .transition()
    .duration(500)
    .attr('x', (d, i) => xScale(i))
    .attr('y', d => h - yScale(d.value))
    .attr('width', xScale.bandwidth())
    .attr('height', d => yScale(d.value));

  // Exit
  bars
    .exit()
    .transition()
    .duration(500)
    .attr('x', -xScale.bandwidth())
    .remove();
});

// Define sort order flag
let sortOrder = false;

// Define sort order function
const sortBars = () => {
  // Flip value of sortOrder
  sortOrder = !sortOrder;

  svg
    .selectAll('rect')
    .sort(
      (a, b) =>
        sortOrder
          ? d3.ascending(a.value, b.value)
          : d3.descending(a.value, b.value)
    )
    .transition()
    .delay((d, i) => i * 50)
    .duration(1000)
    .attr('x', (d, i) => xScale(i));
};

// On change, update styling
d3.select('input').on('change', function() {
  const threshold = +d3.select(this).node().value;

  svg
    .selectAll('rect')
    .attr('fill', d => 'rgb(0, 0, ' + d.value * 10 + ')')
    .filter(d => d.value <= threshold)
    .attr('fill', 'red');
});
