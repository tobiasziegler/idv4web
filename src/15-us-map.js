import * as d3 from 'd3';
import './15-us-map.css';

// Width and height
const w = 500;
const h = 300;

// Define path generator, using the Albers USA projection
const projection = d3.geoAlbersUsa().translate([0, 0]);
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

// Define what to do when panning or zooming
const zooming = d => {
  // Log out d3.event.transform, so you can see all the goodies inside
  // console.log(d3.event.transform);

  // New offset array
  const offset = [d3.event.transform.x, d3.event.transform.y];

  // Calculate new scale
  const newScale = d3.event.transform.k * 2000;

  // Update projection with new offset and scale
  projection.translate(offset).scale(newScale);

  // Update all paths and circles
  svg.selectAll('path').attr('d', path);
  svg
    .selectAll('circle')
    .attr('cx', d => projection([d.lon, d.lat])[0])
    .attr('cy', d => projection([d.lon, d.lat])[1]);
};

// Then define the zoom behavior
const zoom = d3.zoom().on('zoom', zooming);

// The center of the country, roughly
const center = projection([-97.0, 39.0]);

// Create a container in which all zoom-able elements will live
const map = svg
  .append('g')
  .attr('id', 'map')
  .call(zoom) // Bind the zoom behavior
  .call(
    zoom.transform,
    d3.zoomIdentity // Then apply the initial transform
      .translate(w / 2, h / 2)
      .scale(0.25)
      .translate(-center[0], -center[1])
  );

// Create a new, invisible background rect to catch zoom events
map
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', w)
  .attr('height', h)
  .attr('opacity', 0);

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
    map
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
      map
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

      createPanButtons();
      createZoomButtons();
    });
  });
});

const createPanButtons = () => {
  // Create the clickable groups

  // North
  const north = svg
    .append('g')
    .attr('class', 'pan') // All share the 'pan' class
    .attr('id', 'north'); // The ID will tell us which direction to head
  north
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', w)
    .attr('height', 30);
  north
    .append('text')
    .attr('x', w / 2)
    .attr('y', 20)
    .html('&uarr;');

  // South
  const south = svg
    .append('g')
    .attr('class', 'pan')
    .attr('id', 'south');
  south
    .append('rect')
    .attr('x', 0)
    .attr('y', h - 30)
    .attr('width', w)
    .attr('height', 30);
  south
    .append('text')
    .attr('x', w / 2)
    .attr('y', h - 10)
    .html('&darr;');

  // West
  const west = svg
    .append('g')
    .attr('class', 'pan')
    .attr('id', 'west');
  west
    .append('rect')
    .attr('x', 0)
    .attr('y', 30)
    .attr('width', 30)
    .attr('height', h - 60);
  west
    .append('text')
    .attr('x', 15)
    .attr('y', h / 2)
    .html('&larr;');

  // East
  const east = svg
    .append('g')
    .attr('class', 'pan')
    .attr('id', 'east');
  east
    .append('rect')
    .attr('x', w - 30)
    .attr('y', 30)
    .attr('width', 30)
    .attr('height', h - 60);
  east
    .append('text')
    .attr('x', w - 15)
    .attr('y', h / 2)
    .html('&rarr;');

  // Panning interaction
  d3.selectAll('.pan').on('click', function() {
    // Set how much to move on each click
    const moveAmount = 50;

    // Set x/y to zero for now
    let x = 0;
    let y = 0;

    // Which way are we headed?
    const direction = d3.select(this).attr('id');

    // Modify the offset, depending on the direction
    switch (direction) {
      case 'north':
        y += moveAmount; // Increase y offset
        break;
      case 'south':
        y -= moveAmount; // Decrease y offset
        break;
      case 'west':
        x += moveAmount; // Increase x offset
        break;
      case 'east':
        x -= moveAmount; // Decrease x offset
        break;
      default:
        break;
    }

    // This triggers a zoom event, translating by x, y
    map.transition().call(zoom.translateBy, x, y);
  });
};

// Create zoom buttons
const createZoomButtons = () => {
  // Create the clickable groups
  // Zoom in button
  const zoomIn = svg
    .append('g')
    .attr('class', 'zoom') // All share the 'zoom' class
    .attr('id', 'in') // The ID will tell us which direction to head
    .attr('transform', 'translate(' + (w - 110) + ',' + (h - 70) + ')');
  zoomIn
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 30)
    .attr('height', 30);
  zoomIn
    .append('text')
    .attr('x', 15)
    .attr('y', 20)
    .text('+');

  // Zoom out button
  const zoomOut = svg
    .append('g')
    .attr('class', 'zoom')
    .attr('id', 'out')
    .attr('transform', 'translate(' + (w - 70) + ',' + (h - 70) + ')');
  zoomOut
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 30)
    .attr('height', 30);
  zoomOut
    .append('text')
    .attr('x', 15)
    .attr('y', 20)
    .html('&ndash;');

  // Zooming interaction
  d3.selectAll('.zoom').on('click', function() {
    // Set how much to scale on each click
    let scaleFactor;

    // Which way are we headed?
    const direction = d3.select(this).attr('id');

    // Modify the k scale value, depending on the direction
    switch (direction) {
      case 'in':
        scaleFactor = 1.5;
        break;
      case 'out':
        scaleFactor = 0.75;
        break;
      default:
        break;
    }

    // This triggers a zoom event, scaling by 'scaleFactor'
    map.transition().call(zoom.scaleBy, scaleFactor);
  });
};
