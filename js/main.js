var height = 600;
var width = 1000;

var svg = d3.select("#chart-area").append("svg")
    .attr("height", height)
    .attr("width", width);

// ADD DATA IN THE FORM OF A JSON FILE THEN USE QUEUE
// queue()
//     .defer(d3.json, "data/world-110m.json")
//     .await(createVisualization());

d3.json("data/us-10m.json" ,function(error, data) {

    console.log(data);

    var projection = d3.geoAlbersUsa()
        .translate([width / 2, height / 2]);

    var path = d3.geoPath()
        .projection(projection);

    var usa = topojson.feature(data, data.objects.states).features;


    svg.selectAll("path")
        .data(usa)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "map")
        .attr("border", "black");

});