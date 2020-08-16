import { feature } from 'topojson-client'
import { tsv, geoNaturalEarth1, zoom, event, select, geoPath, json } from 'd3'

const svg = select('svg')

const projection = geoNaturalEarth1()
const pathGenerator = geoPath().projection(projection)


const g = svg.append('g')

svg.call(zoom().on('zoom', () => {
  g.attr('transform', event.transform)
}))

g.append('path')
  .attr('class', 'sphere')
  .attr('d', pathGenerator({ type: 'Sphere' }))

json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
  .then(data => {
    const countries = feature(data, data.objects.countries)
    g.selectAll('path').data(countries.features)
      .enter().append('path')
      .attr('class', 'country')
      .attr('d', d => pathGenerator(d))
      .append('title')
      .text(d => d.properties.name)

  })
