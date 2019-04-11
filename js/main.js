var height = 600;
var width = 1000;
var artists = ["weeknd", 'beyonce', "lamar", "bieber", "drake"];
var tours = ["Starboy:_Legend_of_the_Fall_Tour", "The_Formation_World_Tour", "The_Damn_Tour", "Purpose_World_Tour", "Summer_Sixteen_Tour"];
var defaultTour = tours[0];

var attBarChartArea = d3.select("#att-barchart-area").append("svg")
    .attr("id", "attBar-svg")
    .attr("height", height)
    .attr("width", width);

var revBarChartArea = d3.select("#rev-barchart-area").append("svg")
    .attr("id", "revBar-svg")
    .attr("height", height)
    .attr("width", width);

var textArea = d3.select("#text-area").append("svg")
    .attr("id", "text-svg")
    .attr("height", 30)
    .attr("width", 400);

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
        console.log(tourData);

        console.log(mapData);

        // console.log(statesData);

        var projection = d3.geoAlbersUsa()
            .translate([width / 2, height / 2]);

        var path = d3.geoPath()
            .projection(projection);

        var usa = topojson.feature(mapData, mapData.objects.usStates).features;


        dataWrangle(tourData.Concerts);


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
                    .text("State: " + stateName)
                    .attr("x", 100)
                    .attr("y", 20)
                    .attr("class", "state-text");

                var totalRevenue = 0;
                var totalAttendance = 0;

                for(var i = 0; i < tourData.Concerts.length; i++){
                    if(tourData.Concerts[i].Abbr === d.properties.STATE_ABBR){
                        totalRevenue += tourData.Concerts[i].Revenue;
                        totalAttendance += tourData.Concerts[i].Attendance;
                    }
                }

                var tip = d3.tip()
                    .attr("class", "tooltip")
                    .direction("e")
                    .html(function(){
                        return "<p><h4>State: " + d.properties.STATE_ABBR + "</h4></p><p>Total Attendance: " + totalAttendance + "</p><p>Total Revenue: " + totalRevenue + "</p>"
                    });

                svg.call(tip);

                tip.show();
            })
            .on("mouseout", function(d){
                textArea.selectAll("text").remove();
                d3.select(".tooltip").remove();
                // tip.hide();
            });

        renderBarCharts(tourData.Concerts);
}

function renderBarCharts(data) {
        revBarChartArea.selectAll("rect").remove();
        // REVENUE SCALE
        var minRevenue = d3.min(data, function(d) {
            return d.Revenue;
        });

        var maxRevenue = d3.max(data, function(d) {
            return d.Revenue;
        });

        var revenueScale = d3.scaleLinear()
            .domain([0, maxRevenue])
            .range([0, height-200]);

        // ATTENDANCE SCALE
        var minAttend = d3.min(data, function(d) {
            return d.Attendance;
        });

        var maxAttend = d3.max(data, function(d) {
            return d.Attendance;
        });

        var attendScale = d3.scaleLinear()
            .domain([0, maxAttend])
            .range([0, height-200]);

        data = sortData(data, "Revenue");
        var i = 0;
        var length = data.length;
        var rectWidth = (width-200)/length;
        revBarChartArea.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d){
                i++;
                return rectWidth*(i-1);
            })
            .attr("y", function(d){
                return height-revenueScale(d.Revenue);
            })
            .attr("width", function(d){
                return rectWidth-3;
            })
            .attr("height", function(d){
                return revenueScale(d.Revenue);
            })
            .attr("fill", "lightgray")
            .attr("transform", "translate(100, -100)")
            .on("mouseover", function(d) {
                var tip = d3.tip()
                    .attr("class", "tooltip")
                    .direction("e")
                    .html(function(){
                        return "<p><h4>City: " + d.City + "</h4><p>Venue: " + d.Venue + "</p></p>"+"</p><p>Revenue: " + d.Revenue + "</p>"
                    });

                svg.call(tip);

                tip.show();

                this.setAttribute("fill", "darkgray");
            })
            .on("mouseout", function(d){
                d3.select(".tooltip").remove();
                this.setAttribute("fill", "lightgray");
            });


        data = sortData(data, "Attendance");
        var j = 0;
        attBarChartArea.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d){
                j++;
                return rectWidth*(j-1);
            })
            .attr("y", function(d){
                return height-attendScale(d.Attendance);
            })
            .attr("width", function(d){
                return rectWidth-3;
            })
            .attr("height", function(d){
                return attendScale(d.Attendance);
            })
            .attr("fill", "lightgray")
            .attr("transform", "translate(100, -100)")
            .on("mouseover", function(d) {
                var tip = d3.tip()
                    .attr("class", "tooltip")
                    .direction("e")
                    .html(function(){
                        return "<p><h4>City: " + d.City + "</h4><p>Venue: " + d.Venue + "</p></p>"+"</p><p>Attendance: " + d.Attendance + "</p>"
                    });

                svg.call(tip);

                tip.show();

                this.setAttribute("fill", "darkgray");
            })
            .on("mouseout", function(d){
                d3.select(".tooltip").remove();
                this.setAttribute("fill", "lightgray");
            });

}

function handleChange(){
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

function dataWrangle(data) {
    for(var i = 0; i < data.length; i++){
        data[i].Attendance = parseInt(data[i].Attendance);
        data[i].Revenue = parseInt(data[i].Revenue);
    }
}

function sortData(data, measure){
    if(measure === "Revenue"){
        data = data.sort(function(a,b){
            return b.Revenue - a.Revenue;
        });
    } else {
        data = data.sort(function (a, b) {
            return b.Attendance - a.Attendance;
        });
    }
    return data;
}

document.getElementById("selector-select").addEventListener("change", handleChange);

loadData(defaultTour);
