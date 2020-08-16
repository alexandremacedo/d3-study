import * as d3 from 'd3'
import { format } from 'upath'

const svg = d3.select('svg')

const height = +svg.attr('height')
const width = +svg.attr('width')
const margin = {
  top: 80,
  right: 20,
  bottom: 100,
  left: 100
}
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

const render = data => {
  const title = 'World Population'

  const xValue = d => d.year
  const xAxisLabel = 'Year'

  const yValue = d => d.population
  const yAxisLabel = 'Population'

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, yValue)])
    .range([innerHeight, 0])
    .nice()

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top} )`)

  const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(15)

  const xAxisGroup = g.append('g').call(xAxis)
    .attr('transform', `translate(0, ${innerHeight} )`)

  xAxisGroup.select('.domain').remove()

  xAxisGroup.append('text')
    .attr('class', 'axis-label')
    .attr('y', 65)
    .attr('x', innerWidth / 2)
    .attr('fill', '#000')
    .text(xAxisLabel)

  const yAxisTickFormat = number =>
    d3.format('.1s')(number)
      .replace('G', 'B')
      .replace('0.00', '0')

  const yAxis = d3.axisLeft(yScale)
    .tickFormat(yAxisTickFormat)
    .tickSize(-innerWidth)
    .tickPadding(10)

  const yAxisGroup = g.append('g').call(yAxis)

  yAxisGroup.select('.domain').remove()

  yAxisGroup.append('text')
    .attr('class', 'axis-label')
    .attr('y', -65)
    .attr('x', -innerHeight / 2)
    .attr('fill', '#000')
    .attr('transform', `rotate(-90)`)
    .attr('text-anchor', 'middle')
    .text(yAxisLabel)

  const areaGenerator = d3.area()
    .x(d => xScale(xValue(d)))
    .y0(innerHeight)
    .y1(d => yScale(yValue(d)))
    .curve(d3.curveBasis)

  g.append('path')
    .attr('class', 'line-path')
    .attr('d', areaGenerator(data))

  g.append('text')
    .attr('class', 'title')
    .attr('y', -25)
    .attr('x', innerWidth / 2)
    .attr('text-anchor', 'middle')
    .text(title)

  console.log(svg.node()?.outerHTML)

}

d3.csv('http://localhost:3333/worldpopulation.csv')
  .then((data) => {
    const rawwordldata = Object.values(data)

    const worlddata = []

    rawwordldata[1].map((d) => {
      worlddata.push({
        population: +rawwordldata[0][d],
        year: new Date(d)
      })
    })

    render(worlddata)
  })

