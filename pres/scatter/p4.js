var svg = d3.select('#p4');

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
  .domain([minX, maxX])
  .range([0, 750]);
var yScale = d3.scaleLinear()
  .domain([minY, maxY])
  .range([400, 0]);

var dataPoints = svg
  .selectAll('circle')
  .data(data)
  .enter()
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