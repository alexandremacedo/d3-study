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
  const title = 'A Week In San Francisco'

  const xValue = d => d.timestamp
  const xAxisLabel = 'Time'

  const yValue = d => d.temperature
  const yAxisLabel = 'Temperature'

  const circleRadius = 6

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
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

  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10)

  const yAxisGroup = g.append('g').call(yAxis)

  yAxisGroup.selectAll('.domain').remove()

  yAxisGroup.append('text')
    .attr('class', 'axis-label')
    .attr('y', -65)
    .attr('x', -innerHeight / 2)
    .attr('transform', `rotate(-90)`)
    .attr('text-anchor', 'middle')
    .text(yAxisLabel)

  const lineGenerator = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
    .curve(d3.curveBasis)

  g.append('path')
    .attr('class', 'line-path')
    .attr('d', lineGenerator(data))

  g.append('text')
    .attr('class', 'title')
    .attr('y', -25)
    .attr('x', innerWidth / 2)
    .attr('text-anchor', 'middle')
    .text(title)

}

d3.csv('https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv')
  .then((data) => {
    data.forEach(d => {
      d.temperature = +d.temperature
      d.timestamp = new Date(d.timestamp)
    })

    render(data)
  })

