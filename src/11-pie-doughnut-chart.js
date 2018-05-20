import * as d3 from 'd3';
import './11-pie-doughnut-chart.css';

const dataset = [5, 10, 20, 45, 6, 25];

const w = 300;
const h = 300;

const outerRadius = w / 2;
const innerRadius = w / 3;
const arc = d3
  .arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);

const pie = d3.pie();

// Easy colors accessible via a 10-step ordinal scale
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Create SVG element
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

// Set up groups
const arcs = svg
  .selectAll('g.arc')
  .data(pie(dataset))
  .enter()
  .append('g')
  .attr('class', 'arc')
  .attr('transform', `translate(${outerRadius},${outerRadius})`);

// Draw arc paths
arcs
  .append('path')
  .attr('fill', (d, i) => color(i))
  .attr('d', arc);

arcs
  .append('text')
  .attr('transform', d => `translate(${arc.centroid(d)})`)
  .attr('text-anchor', 'middle')
  .text(d => d.value);
