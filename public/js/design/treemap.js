var treemap = d3.layout.treemap()
  .round(false)
  .size([640, 480])
  .sticky(true)
  .value(function(d) { return d.size; });

var svg = d3.select('.architecture')
  .append('svg')
    .attr('width', 640)
    .attr('height', 480)
  .append('svg:g')
    .attr('transform', 'translate(.5,.5)');

var visualize = function(error, dataset) {
  if (error) return console.warn(error);
  
  var root = dataset;
  var nodes = treemap.nodes(root)
    .filter(function(d) { return !d.children; });
  
  var cell = svg.selectAll('g')
    .data(nodes)
    .enter().append('svg:g')
      .attr('class', 'node')
      .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });

  var color = d3.scale.category20c();
  
  cell.append('svg:rect')
    .attr('width', function(d) { return d.dx - 1; })
    .attr('height', function(d) { return d.dy - 1; })
    .style('fill', function(d) { return color(d.parent.name); });

  cell.append('svg:text')
    .attr('x', function(d) { return d.dx / 2; })
    .attr('y', function(d) { return d.dy / 2; })
    .attr('dy', '.35em')
    .attr('text-anchor', 'middle')
    .text(function(d) { return d.name; })
    .style('opacity', function(d) { d.w = this.getComputedTextLength(); return d.dx > d.w ? 1 : 0; });
}

d3.json('data/design/architecture.json', visualize);


