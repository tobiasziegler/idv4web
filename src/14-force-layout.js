import * as d3 from 'd3';

const dataset = {
  nodes: [
    { name: 'Adam' },
    { name: 'Bob' },
    { name: 'Carrie' },
    { name: 'Donovan' },
    { name: 'Edward' },
    { name: 'Felicity' },
    { name: 'George' },
    { name: 'Hannah' },
    { name: 'Iris' },
    { name: 'Jerry' }
  ],
  edges: [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 0, target: 3 },
    { source: 0, target: 4 },
    { source: 1, target: 5 },
    { source: 2, target: 5 },
    { source: 2, target: 5 },
    { source: 3, target: 4 },
    { source: 5, target: 8 },
    { source: 5, target: 9 },
    { source: 6, target: 7 },
    { source: 7, target: 8 },
    { source: 8, target: 9 }
  ]
};

// Width and height
const w = 500;
const h = 300;

// Initialise a simple force layout, using the nodes and edges in dataset
const force = d3
  .forceSimulation(dataset.nodes)
  .force('charge', d3.forceManyBody())
  .force('link', d3.forceLink(dataset.edges))
  .force(
    'center',
    d3
      .forceCenter()
      .x(w / 2)
      .y(h / 2)
  );

// Easy colors accessible via a 10-step ordinal scale
const colors = d3.scaleOrdinal(d3.schemeCategory10);

// Create SVG element
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

// Create edges as lines
const edges = svg
  .selectAll('line')
  .data(dataset.edges)
  .enter()
  .append('line')
  .style('stroke', '#ccc')
  .style('stroke-width', 1);

// Create nodes as circles
const nodes = svg
  .selectAll('circle')
  .data(dataset.nodes)
  .enter()
  .append('circle')
  .attr('r', 10)
  .style('fill', (d, i) => colors(i))
  .call(
    d3
      .drag() // Define what to do on drag events
      .on('start', dragStarted)
      .on('drag', dragging)
      .on('end', dragEnded)
  );

// Add a simple tooltip
nodes.append('title').text(d => d.name);

// Every time the simulation 'ticks', this will be called
force.on('tick', () => {
  edges
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y);
  nodes.attr('cx', d => d.x).attr('cy', d => d.y);
});

// Define drag event functions
function dragStarted(d) {
  if (!d3.event.active) force.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragging(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragEnded(d) {
  if (!d3.event.active) force.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
