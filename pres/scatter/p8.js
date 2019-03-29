    var margin = {
      top: 20,
      right: 80,
      bottom: 30,
      left: 40
    };
    var height = 400 - margin.top - margin.bottom;
    var width = 750 - margin.left - margin.right;

    var svg = d3.select('#p8').append('g') // This will append the group element
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
      .domain([minX - 1, maxX + 1]) // Define the x domain by the max and min x values
      .range([0, width]);
    var yScale = d3.scaleLinear()
      .domain([minY - 1, maxY + 1]) // Define the y domain by the max and min y values
      .range([height, 0]);

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

    var xAxis = d3.axisBottom() //create a generic axis function
      .scale(xScale) // pass in our scale
      .ticks(8); //This is the approximate number, d3 will make the numbers nice
    var yAxis = d3.axisLeft() //create a generic axis function
      .scale(yScale) // pass in our scale
      .ticks(5); //This is the approximate number, d3 will make the numbers nice

    svg.append('g') // use the group element for the x axis
      .attr('class', 'axis') // add a class for styling
      .attr('transform', 'translate(0, ' + height + ')') //translate in svg coordinates
      .call(xAxis); // Run the axis function on the newly created and appended group
    svg.append('g') // use the group element for the y axis
      .attr('class', 'axis') // same class again for styling
      .call(yAxis); // Run the axis function on the newly created and appended group


    svg.append('text') // Add title, simply append and define text 
      .attr('class', 'title') // attributes and position
      .attr('x', (width / 2))
      .attr('y', 0 - (margin.top / 2))
      .attr('dy', '10')
      .attr('text-anchor', 'middle')
      .style('font-size', '15px')
      .text('Game of Thrones episodes');
    svg.append('text') // Add x-axis label, similar to title
      .attr('class', 'label')
      .attr('x', (width / 2))
      .attr('y', height + margin.bottom / 2)
      .attr('dy', '10')
      .attr('text-anchor', 'middle')
      .style('font-size', '8px')
      .text('Episode length');
    svg.append('text') // Add y-axis label, similar to above, but with transform
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left / 2)
      .attr('x', 0 - height / 2)
      .attr('dy', '-4')
      .attr('text-anchor', 'middle')
      .style('font-size', '8px')
      .text('Viewers in million');