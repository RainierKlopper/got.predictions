
var dataAll = [
    {"house": "Stark", "supporters": 39, "color": 1},
    {"house": "Lannister", "supporters": 21, "color": 2},
    {"house": "Targaryen", "supporters": 28, "color": 3}
];

var dataLiving = [
    {"house": "Stark", "supporters": 22, "color": 1},
    {"house": "Lannister", "supporters": 11, "color": 2},
    {"house": "Targaryen", "supporters": 17, "color": 3}
];

var dataDead = [
    {"house": "Stark", "supporters": 17, "color": 1},
    {"house": "Lannister", "supporters": 10, "color": 2},
    {"house": "Targaryen", "supporters": 11, "color": 3}
];

var dats = [dataAll, dataDead, dataLiving];
var offsets = [0, 400, 800];
var names = ["All supporters", "Dead supporters", "Living supporters"];

var svgWidth = 1400, svgHeight = 500, radius = 200;
var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

getTotals = d => {
  var i = 0, all = 0;
  for (i = 0; i < d.length; i++) {
    all += d[i].supporters;
  }
  return all;
};

getPercent = (a, d) => {
  return (100 * a / getTotals(d)).toFixed(2);
};

var color = d3.scaleOrdinal(d3.schemeCategory10);
drawPie = (dat, off) => {
  var g = svg.append("g")
    .attr("transform", "translate(" + (off + radius) + "," + radius + ")");

  var pie = d3.pie().value(function(d) { return getPercent(d.supporters, dat); });
  var path = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);

  var arc = g.selectAll("arc")
      .data(pie(dat))
      .enter()
      .append("g");

  arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.color); });

  var label = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("text-anchor", "middle")
      .text(function(d) { return d.data.house + ": " + getPercent(d.data.supporters, dat) + "%"; });
};

var i = 0;
for (i = 0; i < 3; i++) {
  drawPie(dats[i], offsets[i]);

  svg.append("text")
    .attr("x", offsets[i] + radius - 40)
    .attr("y", svgHeight - 80)
    .text(names[i]);
}
