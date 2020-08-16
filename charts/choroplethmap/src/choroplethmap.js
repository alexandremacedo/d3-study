import {
  geoPath,
  geoNaturalEarth1,
  zoom,
  event
} from 'd3';

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);

export const choroplethMap = (selection, props) => {
  const {
    features,
    colorScale,
    colorValue,
    selectedColorValue
  } = props;

  console.log(features);

  const gUpdate = selection.selectAll('g').data([null]);
  const gEnter = gUpdate.enter().append('g');
  const g = gUpdate.merge(gEnter);

  gEnter
    .append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({ type: 'Sphere' }))
    .merge(gUpdate.select('.sphere'))
    .attr('opacity', selectedColorValue ? 0.05 : 1);

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
    .attr('fill', d => colorScale(colorValue(d)))
    .attr('opacity', d =>
      (!selectedColorValue || selectedColorValue === colorValue(d))
        ? 1
        : 0.1
    )
    .classed('highlighted', d =>
      selectedColorValue && selectedColorValue === colorValue(d)
    )

  countryPathsEnter.append('title')
    .text(d => d.properties.name + ': ' + colorValue(d));
};