import {
  geoPath,
  geoNaturalEarth1,
  zoom,
  event,
  geoCentroid,
  scaleSqrt,
  max,
  format
} from 'd3';

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);

const populationFormat = format(',');

const year = '2020'

const radiusScale = scaleSqrt()
const radiusValue = d => d.properties[year]

export const choroplethMap = (selection, props) => {
  const {
    features,
    featuresWithPopulation,
  } = props;

  const gUpdate = selection.selectAll('g').data([null]);
  const gEnter = gUpdate.enter().append('g');
  const g = gUpdate.merge(gEnter);

  gEnter
    .append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({ type: 'Sphere' }))
    .merge(gUpdate.select('.sphere'))

  selection.call(zoom().on('zoom', () => {
    g.attr('transform', event.transform);
  }));

  const countryPaths = g.selectAll('.country')
    .data(features);
  const countryPathsEnter = countryPaths
    .enter().append('path')
    .attr('class', 'country');
  countryPaths
    .merge(countryPathsEnter)
    .attr('d', pathGenerator)
    .attr('fill', d => d.properties[year] ? '#e8e8e8' : '#fecccc')
  countryPathsEnter.append('title')
    .text(d => isNaN(radiusValue(d))
      ? 'Missing data'
      : `${d.properties.name}: ${populationFormat(d.properties[year])}`);

  radiusScale
    .domain([0, max(features, radiusValue)])
    .range([0, 20])

  featuresWithPopulation.forEach(d => {
    d.properties.projected = projection(geoCentroid(d))
  });

  const countryCircles = g.selectAll('.population')
    .data(featuresWithPopulation);
  const countryCirclesEnter = countryCircles
    .enter().append('circle')
    .attr('class', 'population')
    .attr('cx', d => d.properties.projected[0])
    .attr('cy', d => d.properties.projected[1])
    .attr('r', d => radiusScale(d.properties[year]))
};