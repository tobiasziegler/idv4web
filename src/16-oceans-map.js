import * as d3 from 'd3';
import './15-us-map.css';

// Width and height
const w = 500;
const h = 300;

// Define path generator, using the Albers USA projection
const projection = d3
  .geoMercator()
  .translate([w / 2, h / 2])
  .scale([w * 0.16]);
const path = d3.geoPath().projection(projection);

// Create SVG element
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

// Load in GeoJSON data
d3.json('data/oceans.json').then(json => {
  // Bind data and create one path per GeoJSON feature
  svg
    .selectAll('path')
    .data(json.features)
    .enter()
    .append('path')
    .attr('d', path)
    .style('fill', 'steelblue');
});
