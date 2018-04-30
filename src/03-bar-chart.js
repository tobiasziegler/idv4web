import * as d3 from 'd3';
import './03-bar-chart.css';

let dataset = []; // Initialise empty array

for (let i = 0; i < 25; i++) {
  // Loop 25 times
  const newNumber = Math.floor(Math.random() * 30); // New random number 0-30
  dataset.push(newNumber); // Add new number to the array
}

d3
  .select('body')
  .selectAll('div')
  .data(dataset)
  .enter()
  .append('div')
  .attr('class', 'bar')
  .style('height', d => d * 5 + 'px');
