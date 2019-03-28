width = 1000
height = 1000
outerRadius = width * 0.5 - 30
innerRadius = outerRadius - 20

data = [
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0], //Lannister
  [1, 0, 0, 0, 0, 3, 0, 0, 0, 0], //Baratheon
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 1], //Targaryen
  [0.5, 0, 1, 0, 1, 0, 0.5, 1, 0, 0], //Stark
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0], //Tully
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0], //Tyrell
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0], //Bolton
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], //Maegyr
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0], //Frey
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0] //Martell
]

//sets where and how much Ticks
function groupTicks(d, step) {
  const k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, step).map(value => {
    return {
      value: value,
      angle: value * k + d.startAngle
    };
  });
}

//sets Format (single, tens, thousands,...)
formatValue = d3.formatPrefix(",.0", 1)


const chord = d3.chord()
  .padAngle(0.05) //distance between arc parts
  .sortSubgroups(d3.descending) //order of persons

const arc = d3.arc()
  .innerRadius(innerRadius) //sets thickness of arc
  .outerRadius(outerRadius)

const ribbon = d3.ribbon() //determines where the chords start/finish
  .radius(innerRadius)

const color = d3.scaleOrdinal() //sets color in order of data
  .range(["#FF0000", "#000000", "#FFFFFF", "#6E6E6E", "#0000FF", "#00FF00", "#610B0B", "#CC2EFA", "#0B3B0B", "#F4FA58"])

const svg = d3.select("svg") //sets viewbox, because chord works with radius
  .attr("viewBox", [-width / 2, -height / 2, width, height]);

const chords = chord(data); //reads data from matrix

const group = svg.append("g") //sets houses to groups of chords
  .selectAll("g")
  .data(chords.groups)
  .join("g");

group.append("path") //sets color of arc parts
  .attr("fill", d => color(d.index))
  .attr("stroke", d => d3.rgb(color(d.index)).darker())
  .attr("d", arc);

const groupTick = group.append("g") //sets the right position of the Ticks
  .selectAll("g")
  .data(d => groupTicks(d, 1)) //how often should they appear per house
  .join("g")
  .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(${outerRadius},0)`);

groupTick.append("line") //small line from arc to number
  .attr("stroke", "#000")
  .attr("x2", 6);

groupTick.append("text") //sets number and when to rotate for readability
  .attr("x", 8)
  .attr("dy", ".35em")
  .attr("transform", d => d.angle > Math.PI ? "rotate(180) translate(-16)" : null)
  .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
  .text(d => formatValue(d.value));

svg.append("g") //sets chords opacity and color
  .attr("fill-opacity", 0.67)
  .selectAll("path")
  .data(chords)
  .join("path")
  .attr("d", ribbon)
  .attr("fill", d => color(d.target.index))
  .attr("stroke", d => d3.rgb(color(d.target.index)).darker());

const legend = svg.append("g") //adds a legend for the colors of the chord-diagramm
  .attr("class", "legend")
  .attr("x", -500)
  .attr("y", -500)
  .attr("height", 1000)
  .attr("width", 100);

legend.append("rect").attr("x", -500 + 5).attr("y", -500 + 5).attr("width", 17).attr("height", 14).style("fill", "Red");
legend.append("rect").attr("x", -500 + 5).attr("y", -500 + 25).attr("width", 17).attr("height", 14).style("fill", "Black");
legend.append("rect").attr("x", -500 + 5).attr("y", -500 + 45).attr("width", 17).attr("height", 14).style("fill", "White");
legend.append("rect").attr("x", -500 + 5).attr("y", -500 + 65).attr("width", 17).attr("height", 14).style("fill", "#6E6E6E");
legend.append("rect").attr("x", -500 + 5).attr("y", -500 + 85).attr("width", 17).attr("height", 14).style("fill", "#0000FF");
legend.append("rect").attr("x", -500 + 5).attr("y", -500 + 105).attr("width", 17).attr("height", 14).style("fill", "#00FF00");
legend.append("rect").attr("x", -500 + 5).attr("y", -500 + 125).attr("width", 17).attr("height", 14).style("fill", "#610B0B");
legend.append("rect").attr("x", -500 + 5).attr("y", -500 + 145).attr("width", 17).attr("height", 14).style("fill", "#CC2EFA");
legend.append("rect").attr("x", -500 + 5).attr("y", -500 + 165).attr("width", 17).attr("height", 14).style("fill", "#0B3B0B");
legend.append("rect").attr("x", -500 + 5).attr("y", -500 + 185).attr("width", 17).attr("height", 14).style("fill", "#F4FA58");

legend.append("text").attr("x", -500 + 25).attr("y", -500 + 18).attr("size", "200").text("Lannister");
legend.append("text").attr("x", -500 + 25).attr("y", -500 + 38).attr("size", "200").text("Baratheon");
legend.append("text").attr("x", -500 + 25).attr("y", -500 + 58).attr("size", "200").text("Targaryen");
legend.append("text").attr("x", -500 + 25).attr("y", -500 + 78).attr("size", "200").text("Stark");
legend.append("text").attr("x", -500 + 25).attr("y", -500 + 98).attr("size", "200").text("Tully");
legend.append("text").attr("x", -500 + 25).attr("y", -500 + 118).attr("size", "200").text("Tyrell");
legend.append("text").attr("x", -500 + 25).attr("y", -500 + 138).attr("size", "200").text("Bolton");
legend.append("text").attr("x", -500 + 25).attr("y", -500 + 158).attr("size", "200").text("Maegyr");
legend.append("text").attr("x", -500 + 25).attr("y", -500 + 178).attr("size", "200").text("Frey");
legend.append("text").attr("x", -500 + 25).attr("y", -500 + 198).attr("size", "200").text("Martell");