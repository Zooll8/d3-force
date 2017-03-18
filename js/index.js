'use strict';

//I used d3 v3 due to lack of tutorials on v4 to Force Directed Graphs.

var w = 800;
var h = 550;
d3.json('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json', function (json) {

   var svg = d3.select('.render').append('svg').attr('width', w).attr('height', h);
   var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
   var force = d3.layout.force().nodes(json.nodes).links(json.links).size([w, h]).linkDistance([25]).charge([-40]).start();

   var links = svg.selectAll('line').data(json.links).enter().append('line').attr('class', 'link');

   var nodes = d3.select('.imageplacer').selectAll('image').data(json.nodes).enter().append('image').attr("class", function (d) {
      return 'flag flag-' + d.code;
   }).call(force.drag).on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", .9);
      div.html(d.country).style("left", d3.event.pageX + "px").style("top", d3.event.pageY - 28 + "px");
   }).on("mouseout", function (d) {
      div.transition().duration(200).style("opacity", 0);
   });

   force.on('tick', function () {

      links.attr('x1', function (d) {
         return d.source.x;
      }).attr('y1', function (d) {
         return d.source.y;
      }).attr('x2', function (d) {
         return d.target.x;
      }).attr('y2', function (d) {
         return d.target.y;
      });

      nodes.attr('x', function (d) {
         return d.x;
      }).attr('y', function (d) {
         return d.y;
      }).style("left", function (d) {
         return "" + d.x - 8 + "px";
      }).style("top", function (d) {
         return "" + d.y - 5 + "px";
      });
   });
});