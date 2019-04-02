var svg = d3.select('#p5');

var maxX = d3.max(data, function (d) {
  return d.len;
});
var minX = d3.min(data, function (d) {
  return d.len;
});
var maxY = d3.max(data, function (d) {
  return d.view;
});
var minY = d3.min(data, function (d) {
  return d.view;
});

var xScale = d3.scaleLinear()
  .domain([minX, maxX]) // Define the x domain by the max and min x values
  .range([0, 750]);
var yScale = d3.scaleLinear()
  .domain([minY, maxY]) // Define the y domain by the max and min y values
  .range([400, 0]);

var dataPoints = svg
  .selectAll('circle') // selects all circles (whether they exist or not)
  .data(data) // joins the data to the current selection (all circles)
  .enter() // joins the data to placeholders for the circles
  .append('circle');

var dataAttributes = dataPoints
  .attr('cx', function (d) {
    return xScale(d.len);
  })
  .attr('cy', function (d) {
    return yScale(d.view);
  })
  .attr('r', 5)
  .style("fill", "red");


var text = svg
  .selectAll('text')
  .data(data)
  .enter()
  .append('text');
var dataLabels = text
  .attr('x', function (d) {
    return xScale(d.len) + 8;
  }) // Add some x offset
  .attr('y', function (d) {
    return yScale(d.view) + 2.5;
  }) // Add some y offset
  .text(function (d) {
    return d.title;
  }) // The text string
  .attr('font-family', 'helvetica')
  .attr('font-size', '5px')
  .attr('fill', 'red');