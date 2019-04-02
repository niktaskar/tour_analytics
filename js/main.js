var height = 600;
var width = 1000;
var artists = ["weeknd", 'beyonce', "lamar", "bieber", "drake"];
var tours = ["Starboy:_Legend_of_the_Fall_Tour", "The_Formation_World_Tour", "The_Damn_Tour", "Purpose_World_Tour", "Summer_Sixteen_Tour"];
var defaultTour = tours[0];

var svg = d3.select("#chart-area").append("svg")
    .attr("id", "map-svg")
    .attr("height", height)
    .attr("width", width);

function loadData(tour) {
    queue()
        .defer(d3.json, "data/" + tour + ".json")
        .defer(d3.json, "data/us-10m.json")
        .await(createVisualization);
}

function createVisualization(error, tourData, mapData) {
        console.log(tourData);

        console.log(mapData);

        var projection = d3.geoAlbersUsa()
            .translate([width / 2, height / 2]);

        var path = d3.geoPath()
            .projection(projection);

        var usa = topojson.feature(mapData, mapData.objects.states).features;


        svg.selectAll("path")
            .data(usa)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "map")
            .attr("stroke", "black")
            .attr("fill", "lightgray");

        svg.append("path")
           .attr("class", "state-borders")
           // .attr("d", path(topojson.mesh(mapData, mapData.objects.states, function(a, b) { return a !== b; })));

}

function handleChange(event){
    var artist = document.getElementById("selector-select").value;

    if(artist === "The Weeknd"){
        artist = "weeknd";
    } else if(artist === "Beyonce"){
        artist = "beyonce";
    } else if(artist === "Kendrick Lamar"){
        artist = "lamar";
    } else if(artist === "Justin Bieber"){
        artist = "bieber";
    } else if(artist === "Drake"){
        artist = "drake";
    }

    var index = artists.indexOf(artist);

    var tour = tours[index];
    console.log(tour);

    loadData(tour);
}


document.getElementById("selector-select").addEventListener("change", handleChange);

loadData(defaultTour);
