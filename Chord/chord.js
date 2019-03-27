width = 1000
height = 1000
outerRadius = Math.min(width, height) * 0.5 - 30
innerRadius = outerRadius - 20
    
data = [
    [ 0, 1, 0, 0],
    [ 0.3, 0, 0.3, 0.3],
    [ 0, 1, 0, 0],
    [ 0, 1, 0, 0]
  ]

function groupTicks(d, step) {
    const k = (d.endAngle - d.startAngle) / d.value;
    return d3.range(0, d.value, step).map(value => {
      return {value: value, angle: value * k + d.startAngle};
    });
  }

  formatValue = d3.formatPrefix(",.0", 1e0)

  chord = d3.chord()
    .padAngle(0.05)
    .sortSubgroups(d3.descending)

    arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)

    ribbon = d3.ribbon()
    .radius(innerRadius)

    color = d3.scaleOrdinal()
    .domain(d3.range(4))
    .range(["#000000", "#FFDD89", "#957244", "#F26223"])
    
    const svg = d3.select("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("font-size", 10)
        .attr("font-family", "sans-serif");
  
    const chords = chord(data);
  
    const group = svg.append("g")
      .selectAll("g")
      .data(chords.groups)
      .join("g");
  
    group.append("path")
        .attr("fill", d => color(d.index))
        .attr("stroke", d => d3.rgb(color(d.index)).darker())
        .attr("d", arc);
  
    const groupTick = group.append("g")
      .selectAll("g")
      .data(d => groupTicks(d, 1e3))
      .join("g")
        .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(${outerRadius},0)`);
  
    groupTick.append("line")
        .attr("stroke", "#000")
        .attr("x2", 6);
  
    groupTick
      .filter(d => d.value % 5e3 === 0)
      .append("text")
        .attr("x", 8)
        .attr("dy", ".35em")
        .attr("transform", d => d.angle > Math.PI ? "rotate(180) translate(-16)" : null)
        .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
        .text(d => formatValue(d.value));
  
    svg.append("g")
        .attr("fill-opacity", 0.67)
      .selectAll("path")
      .data(chords)
      .join("path")
        .attr("d", ribbon)
        .attr("fill", d => color(d.target.index))
        .attr("stroke", d => d3.rgb(color(d.target.index)).darker());