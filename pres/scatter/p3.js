var svg = d3.select('#p3');

var dataPoints = svg
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle');

var dataAttributes = dataPoints
  .attr('cx', function (d) {
    return d.len;
  })
  .attr('cy', function (d) {
    return d.view;
  })
  .attr('r', 5)
  .style("fill", "red");