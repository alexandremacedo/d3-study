import { json, tree, hierarchy, linkHorizontal, select, zoom, event } from 'd3'

const svg = select('svg')
const width = document.body.clientWidth
const height = document.body.clientHeight
const margin = { top: 0, right: 50, bottom: 0, left: 75 }
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom

const treeLayout = tree().size([innerHeight, innerWidth])


const zoomG = svg
  .attr('width', width)
  .attr('height', height)
  .append('g')

const g = zoomG.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

zoomG.call(zoom().on('zoom', () => {
  g.attr('transform', event.transform)
}))

json('http://localhost:3333/worldcountriesdata.json')
  .then(data => {

    console.log(data)

    const root = hierarchy(data)
    const links = treeLayout(root).links()
    const linkPathGenarator = linkHorizontal()
      .x(d => d.y)
      .y(d => d.x)

    g.selectAll('path').data(links)
      .enter().append('path')
      .attr('d', linkPathGenarator)

    g.selectAll('text').data(root.descendants())
      .enter().append('text')
      .attr('x', d => d.y)
      .attr('y', d => d.x)
      .attr('dy', '0.32em')
      .attr('text-anchor', d => d.children ? 'middle' : 'start')
      .attr('font-size', d => 3.25 - d.depth + 'em')
      .text(d => d.data.data.id)

  })