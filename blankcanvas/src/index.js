const svg = select('svg')

const width = document.body.clientWidth
const height = document.body.clientHeight

svg
  .attr('width', width)
  .attr('height', height)
  .append('rect')
  .attr('width', width)
  .attr('height', height)
  .att('rx', 40)
