import * as d3 from 'd3'

const svg = d3.select('svg')

const height = +svg.attr('height')
const width = +svg.attr('width')
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 50
}
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

const render = data => {

  const series = d3.stack().keys(data.columns.slice(1))(data)


  const gSvg = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const xScale = d3.scaleBand()
    .domain(data.map(function (d) { return d.category; }))
    .range([0, innerWidth])
    .padding(0.1);


  const yScale = d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
    .range([innerHeight, 0]);

  const color = ['#2E628A', '#2D7886', '#2F8E81']

  const rects = gSvg.selectAll("g").data(series).enter()
    .append("g")
    .attr("fill", d => color[d.index]);

  rects.selectAll("rect")
    .data(d => d)
    .join("rect")
    .attr("x", d => xScale(d.data.category))
    .attr("y", d => yScale(d[1]))
    .attr("height", d => yScale(d[0]) - yScale(d[1]))
    .attr("width", xScale.bandwidth())

  const xAxis = gSvg.append("g")
    .attr("id", "xAxis")
    .attr("transform", "translate(0," + innerHeight + ")")
    .call(d3.axisBottom(xScale));

  const yAxis = gSvg.append("g")
    .attr("id", "yAxis")
    .call(d3.axisLeft(yScale));



}

d3.csv("https://gist.githubusercontent.com/ericd9799/7dbff03d779c15bd677fe3c8478d5731/raw/9dcb6efdf8b9a2da5dd51ec65e4cf11d9ead6dd3/test.csv").then((d) => {
  console.log(d)

  const columns = d.columns

  var t = 0

  for (var i = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;

  render(d);

});

