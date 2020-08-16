import * as d3 from 'd3'
import { axisLeft, axisBottom } from 'd3'

const svg = d3.select('svg')

const height = +svg.attr('height')
const width = +svg.attr('width')
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 240
}
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

const render = data => {

  const episode = d => d.episode
  const rating = d => d.rating

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, rating)])
    .range([0, innerWidth])
    .nice()

  const yScale = d3.scaleBand()
    .domain(data.map(episode))
    .range([0, innerHeight])
    .padding(0.1)

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const xAxis = d3.axisBottom(xScale)
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
    .attr('y', d => yScale(episode(d)))
    .attr('width', d => xScale(rating(d)))
    .attr('height', yScale.bandwidth())


}

d3.csv('http://localhost:3333/startrekdata.csv').then((data) => {
  data.forEach(d => {
    d.rating = +d.rating
  })

  render(data)

})

