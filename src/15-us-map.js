import * as d3 from 'd3';

// Width and height
const w = 500;
const h = 300;

// Define path generator, using the Albers USA projection
const projection = d3
  .geoAlbersUsa()
  .translate([w / 2, h / 2])
  .scale([500]);
const path = d3.geoPath().projection(projection);

// Define quantize scale to sort data values into buckets of color
var color = d3
  .scaleQuantize()
  .range([
    'rgb(237,248,233)',
    'rgb(186,228,179)',
    'rgb(116,196,118)',
    'rgb(49,163,84)',
    'rgb(0,109,44)'
  ]);
// Colors derived from ColorBrewer, by Cynthia Brewer, and included in
// https://github.com/d3/d3-scale-chromatic

// Number formatting for population values
const formatAsThousands = d3.format(','); // e.g. converts 123456 to "123,456"

// Create SVG element
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

// Load in agriculture data
d3.csv('data/us-ag-productivity.csv').then(data => {
  // Set input domain for color scale
  color.domain([d3.min(data, d => d.value), d3.max(data, d => d.value)]);

  // Load in GeoJSON data
  d3.json('data/us-states.json').then(json => {
    // Merge the ag. data and GeoJSON
    // Loop through once for each ag. data value
    for (let i = 0; i < data.length; i++) {
      // Grab state name
      const dataState = data[i].state;

      // Grab data value, and convert from string to float
      const dataValue = parseFloat(data[i].value);

      // Find the corresponding state inside the GeoJSON
      for (let j = 0; j < json.features.length; j++) {
        const jsonState = json.features[j].properties.name;

        if (dataState == jsonState) {
          // Copy the data value into the JSON
          json.features[j].properties.value = dataValue;

          // Stop looking through the JSON
          break;
        }
      }
    }

    // Bind data and create one path per GeoJSON feature
    svg
      .selectAll('path')
      .data(json.features)
      .enter()
      .append('path')
      .attr('d', path)
      .style('fill', d => {
        // Get data value
        const value = d.properties.value;

        if (value) {
          // If value exists...
          return color(value);
        } else {
          // If value is undefined...
          return '#ccc';
        }
      });

    // Load in cities data
    d3.csv('data/us-cities.csv').then(cities => {
      svg
        .selectAll('circle')
        .data(cities)
        .enter()
        .append('circle')
        .attr('cx', d => projection([d.lon, d.lat])[0])
        .attr('cy', d => projection([d.lon, d.lat])[1])
        .attr('r', d => Math.sqrt(parseInt(d.population) * 0.00004))
        .style('fill', 'yellow')
        .style('stroke', 'gray')
        .style('stroke-width', 0.25)
        .style('opacity', 0.75)
        .append('title') // Simple tooltip
        .text(d => `${d.place}: Pop. ${formatAsThousands(d.population)}`);
    });
  });
});
