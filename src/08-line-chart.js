import * as d3 from 'd3';

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
  const dataset = data;

  // Print data to console as table, for verification
  console.table(dataset, ['date', 'average']);
});
