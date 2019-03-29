var margin = {
  top: 20,
  right: 80,
  bottom: 20,
  left: 20
};
var height = 400 - margin.top - margin.bottom;
var width = 750 - margin.left - margin.right;

var svg = d3.select('#p7').append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');;

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
  .domain([minX - 1, maxX + 1])
  .range([0, width]);
var yScale = d3.scaleLinear()
  .domain([minY - 1, maxY + 1])
  .range([height, 0]);

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


var text = svg
  .selectAll('text')
  .data(data)
  .enter()
  .append('text');
var dataLabels = text
  .attr('x', function (d) {
    return xScale(d.len) + 8;
  })
  .attr('y', function (d) {
    return yScale(d.view) + 2.5;
  })
  .text(function (d) {
    return d.title;
  })
  .attr('font-family', 'helvetica')
  .attr('font-size', '5px')
  .attr('fill', 'red');

var xAxis = d3.axisBottom()
  .scale(xScale)
  .ticks(8);
var yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(5);

svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(0, ' + height + ')')
  .call(xAxis);
svg.append('g')
  .attr('class', 'axis')
  .call(yAxis);