export const sizeLegend = (selection, props) => {
  const {
    sizeScale,
    spacing,
    textOffset,
    numTicks,
    tickFormat
  } = props;

  const ticks = sizeScale.ticks(numTicks)
    .filter(d => d !== 0)
    .reverse();
  const spacingLegend = i => {
    var sum = 0;
    for (let j = 0; j <= i; j++) {
      if (i == j) {

        console.log(sizeScale(ticks[j]))
        sum += sizeScale(ticks[j])
      } else {

        console.log(sizeScale(ticks[j]) * 2)
        sum += sizeScale(ticks[j]) * 2.4
      }
    }
    console.log('Sum: ' + sum)
    return sum
  }
  const groups = selection.selectAll('g').data(ticks);
  const groupsEnter = groups
    .enter().append('g')
    .attr('class', 'tick');
  groupsEnter
    .merge(groups)
    .attr('transform', (d, i) => {
      console.log('i: ' + i + ' | d: ' + sizeScale(ticks[i - 1]))
      return `translate(0, ${spacingLegend(i)})`
    });
  groups.exit().remove();

  groupsEnter.append('circle')
    .merge(groups.select('circle'))
    .attr('r', sizeScale);

  groupsEnter.append('text')
    .merge(groups.select('text'))
    .text(tickFormat)
    .attr('dy', '0.32em')
    .attr('x', d => sizeScale(ticks[0]) + textOffset);
}