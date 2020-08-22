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
  const xValue = d => d.population
  const yValue = d => d.country

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth])

  const yScale = d3.scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1)

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top} )`)


  const xAxisTickFormat = number =>
    d3.format('.3s')(number)
      .replace('G', 'B')
      .replace('0.00', '0')

  const xAxis = d3.axisBottom(xScale)
    .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight)

  const xAxisGroup = g.append('g').call(xAxis)
    .attr('transform', `translate(0, ${innerHeight} )`)

  xAxisGroup.select('.domain').remove()

  xAxisGroup.append('text')
    .attr('class', 'axis-label')
    .attr('y', 65)
    .attr('x', innerWidth / 2)
    .attr('fill', '#000')
    .text('Population')

  g.append('g')
    .call(d3.axisLeft(yScale))
    .selectAll('.domain, .tick line')
    .remove()

  g.selectAll('rect').data(data)
    .enter().append('rect')
    .attr('y', d => yScale(yValue(d)))
    .attr('width', d => xScale(xValue(d)))
    .attr('height', yScale.bandwidth())

  g.append('text')
    .attr('class', 'title')
    .attr('y', -10)
    .text('The 10 Most Populous Contries')

}

d3.csv('http://localhost:3333/worldpopulationdata.csv').then((data) => {
  data.forEach(d => {
    d.population = +d.population * 1000
  })

  render(data)

})

