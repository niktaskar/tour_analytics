var height = 600;
var width = 1000;
var artists = ["weeknd", 'beyonce', "lamar", "bieber", "drake"];
var tours = ["Starboy:_Legend_of_the_Fall_Tour", "The_Formation_World_Tour", "The_Damn_Tour", "Purpose_World_Tour", "Summer_Sixteen_Tour"];
var defaultTour = tours[0];

var textArea = d3.select("#text-area").append("svg")
    .attr("id", "text-svg")
    .attr("height", 20)
    .attr("width", 200);

var svg = d3.select("#chart-area").append("svg")
    .attr("id", "map-svg")
    .attr("height", height)
    .attr("width", width);

function loadData(tour) {
    queue()
        .defer(d3.json, "data/" + tour + ".json")
        // .defer(d3.json, "data/us-10m.json")
        .defer(d3.json, "data/us.json")
        .await(createVisualization);
}

function createVisualization(error, tourData, mapData) {
        // console.log(tourData);

        console.log(mapData);

        // console.log(statesData);

        var projection = d3.geoAlbersUsa()
            .translate([width / 2, height / 2]);

        var path = d3.geoPath()
            .projection(projection);

        var usa = topojson.feature(mapData, mapData.objects.usStates).features;


        svg.selectAll("path")
            .data(usa)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "map")
            .attr("stroke", "white")
            .attr("stroke-width", "2px")
            .attr("fill", "lightgray")
            .attr("id", function(d) {
                return d.properties.STATE_ABBR;
            })
            .on("mouseover", function(d) {
                var stateName = d.properties.STATE_ABBR;
                textArea.append("text")
                    .text(stateName)
                    .attr("x", 100)
                    .attr("y", 20)
                    .attr("class", "state-text");
            })
            .on("mouseout", function(d){
                textArea.selectAll("text").remove();
            })


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

    loadData(tour);

}


document.getElementById("selector-select").addEventListener("change", handleChange);

loadData(defaultTour);
