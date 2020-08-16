import * as d3 from 'd3'

const svg = d3.select('svg')


const height = +svg.attr('height')
const width = +svg.attr('width')

const g = svg.append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`)


const circle = g.append('circle')
  .attr('r', height / 2)
  .attr('fill', '#BCD4DE')
  .attr('stroke', '#000')


const eyeSpacing = 100
const eyeYOffset = -70
const eyeRadius = 40


const eyesGroup = g.append('g')
  .attr('transform', `translate(0, ${eyeYOffset})`);

const leftEye = eyesGroup.append('circle')
  .attr('r', eyeRadius)
  .attr('cx', -eyeSpacing)

const rightEye = eyesGroup.append('circle')
  .attr('r', eyeRadius)
  .attr('cx', eyeSpacing)

const eyebrowWidth = 70
const eyebrowHeight = 15
const eyebrowYOffset = -80


const eyesbrowsGroup = eyesGroup.append('g')
  .attr('transform', `translate(0, ${eyebrowYOffset})`);

eyesbrowsGroup.transition().duration(2000)
  .attr('transform', `translate(0, ${eyebrowYOffset - 50})`)
  .transition().duration(2000)
  .attr('transform', `translate(0, ${eyebrowYOffset})`)

const leftEyebrow = eyesbrowsGroup.append('rect')
  .attr('x', -eyeSpacing - eyebrowWidth / 2)
  .attr('width', eyebrowWidth)
  .attr('height', eyebrowHeight)

const rightEyebrow = eyesbrowsGroup
  .append('rect')
  .attr('x', eyeSpacing - eyebrowWidth / 2)
  .attr('width', eyebrowWidth)
  .attr('height', eyebrowHeight)

const mouth = g.append('path')

const mouthArc = mouth.attr('d', d3.arc()
  .innerRadius(150)
  .outerRadius(170)
  .startAngle(Math.PI / 2)
  .endAngle(Math.PI * 3 / 2)
)