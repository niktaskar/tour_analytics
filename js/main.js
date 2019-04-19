var height = 600;
var width = 1000;
var barWidth = 1100;
var artists = ["weeknd", 'beyonce', "lamar", "bieber", "drake", "mendes", "grande", "pitbull", "mars", "jayz", "maluma"];
var descriptions = ["This is The Weeknd", "This is Beyonce", "This is Kendrick Lamar", "This is Justin Bieber", "This is Drake", "This is Shawn Mendes", "This is Ariana Grande", "This is Pitbull", "This is Bruno Mars", "This is Jay-Z", "This is Maluma"];
var tours = ["Starboy:_Legend_of_the_Fall_Tour", "The_Formation_World_Tour", "The_Damn_Tour", "Purpose_World_Tour", "Summer_Sixteen_Tour", "Illuminate_World_Tour", "Dangerous_Woman_Tour", "Enrique_Iglesias_and_Pitbull_Live", "24K_Magic_World_Tour", "On_the_Run_II_Tour", "F.A.M.E._Tour_(Maluma)"];
var defaultTour = tours[0];
var defaultData = [];

// var attBarChartArea = d3.select("#att-barchart-area").append("svg")
//     .attr("id", "attBar-svg")
//     .attr("height", height)
//     .attr("width", width);
//
// var revBarChartArea = d3.select("#rev-barchart-area").append("svg")
//     .attr("id", "revBar-svg")
//     .attr("height", height)
//     .attr("width", width);

var barChartArea = d3.select("#barchart-area").append("svg")
    .attr("id", "bar-svg")
    .attr("height", height)
    .attr("width", barWidth);

var textArea = d3.select("#text-area").append("svg")
    .attr("id", "text-svg")
    .attr("height", 30)
    .attr("width", 400);

var svg = d3.select("#chart-area").append("svg")
    .attr("id", "map-svg")
    .attr("height", height)
    .attr("width", width);

barChartArea.append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("transform", "translate(70, 90)")
    .text("Revenue");

barChartArea.append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("transform", "translate(954, 90)")
    .text("Attendance");

function loadData(tour) {
    queue()
        .defer(d3.json, "data/" + tour + ".json")
        // .defer(d3.json, "data/us-10m.json")
        .defer(d3.json, "data/us.json")
        .await(createVisualization);
}

function createVisualization(error, tourData, mapData) {
    svg.selectAll("path").remove();

    console.log(tourData);

    console.log(mapData);

    // console.log(statesData);

    var projection = d3.geoAlbersUsa()
        .translate([width / 2, height / 2]);

    var path = d3.geoPath()
        .projection(projection);

    var usa = topojson.feature(mapData, mapData.objects.usStates).features;


    dataWrangle(tourData.Concerts);

    var tourDataReduced = [];

    for(var i = 0; i < tourData.Concerts.length; i++){
        if(tourDataReduced[tourData.Concerts[i].City]){
            tourDataReduced[tourData.Concerts[i].City].Attendance += tourData.Concerts[i].Attendance;
            tourDataReduced[tourData.Concerts[i].City].Revenue += tourData.Concerts[i].Revenue;
        } else {
            tourDataReduced[tourData.Concerts[i].City] = tourData.Concerts[i];
        }
    }

    var tourDataReducedFinal = [];
    for(val in tourDataReduced){
        tourDataReducedFinal.push(tourDataReduced[val]);
    }

    // renderBarCharts(tourData.Concerts);
    // renderBarCharts(tourDataReducedFinal);

    defaultData = tourDataReducedFinal;

    renderBarChartDouble(tourDataReducedFinal);

    var totals = [];

    for(var i = 0; i < tourData.Concerts.length; i++){
        if(totals[tourData.Concerts[i].Abbr]){
            totals[tourData.Concerts[i].Abbr].Attendance += tourData.Concerts[i].Attendance;
            totals[tourData.Concerts[i].Abbr].Revenue += tourData.Concerts[i].Revenue;
        } else {
            totals[tourData.Concerts[i].Abbr] = tourData.Concerts[i];
        }
    }

    var totalsReduced = [];
    for(val in totals){
        totalsReduced.push(totals[val]);
    }

    var sortedRevenue = totalsReduced.sort(function(a,b){
        return b.Revenue - a.Revenue;
    });

    var topRevenues = sortedRevenue.filter( function(d){
        return d.Revenue > sortedRevenue[5].Revenue;
    });

    var sortedAttendance = totalsReduced.sort(function(a,b){
        return b.Attendance - a.Attendance;
    });

    var topAttendances = sortedAttendance.filter( function(d){
        return d.Attendance > sortedAttendance[5].Attendance;
    });

    svg.selectAll("path")
        .data(usa)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "map")
        .attr("stroke", "white")
        .attr("stroke-width", "2px")
        .attr("fill", function(d){
            var i = 0;
            while(i < tourData.Concerts.length){
                // STATES WHERE THEY HAD THEIR BEST PERFORMANCES ON BOTH CRITERIA
                if(tourData.Concerts[i].Abbr === d.properties.STATE_ABBR && ((topRevenues.indexOf(tourData.Concerts[i]) !== -1) && (topAttendances.indexOf(tourData.Concerts[i]) !== -1))){
                    return "purple";
                }
                    // STATES WHERE THEY HAD THEIR HIGHEST REVENUES
                else if (tourData.Concerts[i].Abbr === d.properties.STATE_ABBR && (topRevenues.indexOf(tourData.Concerts[i]) !== -1)){
                    return "red";
                }
                // STATES WHERE THEY HAD THEIR HIGHEST ATTENDANCES
                else if (tourData.Concerts[i].Abbr === d.properties.STATE_ABBR && (topAttendances.indexOf(tourData.Concerts[i]) !== -1)){
                    return "blue";
                }
                i++;
            }
            return "lightgray";
        })
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
                if(tourData.Concerts[i].Abbr === d.properties.STATE_ABBR) {
                    totalRevenue += tourData.Concerts[i].Revenue;
                    totalAttendance += tourData.Concerts[i].Attendance;
                }
            }

            var tip = d3.tip()
                .attr("class", "tooltip")
                .direction("e")
                .html(function(){
                    if(totalAttendance !== 0) {
                        return "<p><h4>State: " + d.properties.STATE_ABBR + "</h4></p><p>Total Attendance: " + totalAttendance + "</p><p>Total Revenue: $" + totalRevenue + "</p>";
                    } else {
                        return "<p><h4>State: " + d.properties.STATE_ABBR + "</h4></p><p>No Concerts</p>";
                    }
                });

            svg.call(tip);

            tip.show();
        })
        .on("mouseout", function(d){
            textArea.selectAll("text").remove();
            d3.select(".tooltip").remove();
        });
}

function renderBarChartDouble(data){
    barChartArea.selectAll("rect").remove();
    barChartArea.selectAll("g").remove();
    
    if(document.getElementById("sort-select").value === "Revenue"){
        data = data.sort(function(a, b){
            return b.Revenue - a.Revenue;
        });
    } else if(document.getElementById("sort-select").value === "Attendance"){
        data = data.sort(function(a, b){
            return a.Attendance - b.Attendance;
        });
    }

    // REVENUE
    var minRevenue = d3.min(data, function(d) {
        return d.Revenue;
    });

    var maxRevenue = d3.max(data, function(d) {
        return d.Revenue;
    });

    var revenueScale = d3.scaleLinear()
        .domain([maxRevenue, 0])
        .range([0, height-200]);

    // ATTENDANCE
    var minAttend = d3.min(data, function(d) {
        return d.Attendance;
    });

    var maxAttend = d3.max(data, function(d) {
        return d.Attendance;
    });

    var attendScale = d3.scaleLinear()
        .domain([maxAttend, 0])
        .range([0, height-200]);

    var i = 0;
    var length = data.length;
    var rectWidth = (barWidth-200)/(length*2);


    var groups = barChartArea.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("id", function(d, i) {
            return d.City;
        });

    // REVENUE
    groups.append("rect")
        .attr("x", function() {
            i++;
            return 2*rectWidth * (i - 1);
        })
        .attr("y", function(d) {
            return revenueScale(d.Revenue);
        })
        .attr("height", function(d) {
            return height - 200 - revenueScale(d.Revenue);
        })
        .attr("width", rectWidth-3)
        .attr("fill", "lightgray")
        .attr("transform", "translate(100, 100)")
        .on("mouseover", function(d) {
            var tip = d3.tip()
                .attr("class", "tooltip")
                .direction("e")
                .html(function(){
                    return "<p><h4>City: " + d.City + "</h4><p>Venue: " + d.Venue + "</p></p>"+"</p><p>Revenue: $" + d.Revenue + "</p>"
                });

            svg.call(tip);

            tip.show();

            this.setAttribute("fill", "black");
        })
        .on("mouseout", function(d){
            d3.select(".tooltip").remove();
            this.setAttribute("fill", "lightgray");
        });


    i = 0;
    // ATTENDANCE
    groups.append("rect")
        .attr("x", function() {
            i++;
            return 2*rectWidth * (i - 1) + rectWidth-3;
        })
        .attr("y", function(d) {
            return attendScale(d.Attendance);
        })
        .attr("height", function(d) {
            return height - 200 - attendScale(d.Attendance)
        })
        .attr("width", rectWidth-3)
        .attr("fill", "darkgray")
        .attr("transform", "translate(100, 100)")
        .on("mouseover", function(d) {
            var tip = d3.tip()
                .attr("class", "tooltip")
                .direction("e")
                .html(function(){
                    return "<p><h4>City: " + d.City + "</h4><p>Venue: " + d.Venue + "</p></p>"+"</p><p>Attendance: " + d.Attendance + "</p>"
                });

            svg.call(tip);

            tip.show();

            this.setAttribute("fill", "black");
        })
        .on("mouseout", function(d){
            d3.select(".tooltip").remove();
            this.setAttribute("fill", "darkgray");
        });

    // REVENUE Y AXIS
    var revYAxis = d3.axisLeft()
        .scale(revenueScale);

    barChartArea.append("g")
        .call(revYAxis)
        .attr("stroke", "black")
        .attr("transform", "translate(99, 100)");

    // ATTENDANCE Y AXIS
    var attYAxis = d3.axisRight()
        .scale(attendScale);

    barChartArea.append("g")
        .call(attYAxis)
        .attr("stroke", "black")
        .attr("transform", "translate(994 100)");

    // X AXIS
    var labelArray = [];
    var labelXArray = [];

    for(var j = 0; j < data.length; j++){
        // revArray[j] = data[j].Venue;
        labelArray[j] = data[j].City;
        labelXArray[j] = j* (barWidth-200)/data.length + 10;
    }

    var xOrdinalScale = d3.scaleOrdinal()
        .domain(labelArray)
        .range(labelXArray);

    var xAxis = d3.axisLeft()
        .scale(xOrdinalScale);

    barChartArea.append("g")
        .call(xAxis)
        .attr("stroke", "black")
        .attr("transform", "translate(100, 501) rotate(-90)")
        .attr("class", "xAxis");
}

// function renderBarCharts(data) {
//     revBarChartArea.selectAll("rect").remove();
//     attBarChartArea.selectAll("rect").remove();
//
//     revBarChartArea.selectAll("g").remove();
//     attBarChartArea.selectAll("g").remove();
//
//     // REVENUE SCALE
//     var minRevenue = d3.min(data, function(d) {
//         return d.Revenue;
//     });
//
//     var maxRevenue = d3.max(data, function(d) {
//         return d.Revenue;
//     });
//
//     var revenueScale = d3.scaleLinear()
//         .domain([maxRevenue, 0])
//         .range([0, height-200]);
//
//     // ATTENDANCE SCALE
//     var minAttend = d3.min(data, function(d) {
//         return d.Attendance;
//     });
//
//     var maxAttend = d3.max(data, function(d) {
//         return d.Attendance;
//     });
//
//     var attendScale = d3.scaleLinear()
//         .domain([maxAttend, 0])
//         .range([0, height-200]);
//
//     var revYAxis = d3.axisLeft()
//         .scale(revenueScale);
//
//     revBarChartArea.append("g")
//         .call(revYAxis)
//         .attr("stroke", "black")
//         .attr("transform", "translate(99, 100)");
//
//     data = sortData(data, "Revenue");
//
//     // X AXIS FOR REVENUE
//     var revArray = [];
//     var revXArray = [];
//
//     for(var j = 0; j < data.length; j++){
//         // revArray[j] = data[j].Venue;
//         revArray[j] = data[j].City;
//         revXArray[j] = j* (width-200)/data.length + 10;
//     }
//
//     // console.log(revArray);
//     // console.log(revXArray);
//
//     var revOrdinalScale = d3.scaleOrdinal()
//         .domain(revArray)
//         .range(revXArray);
//
//     var revXAxis = d3.axisLeft()
//         .scale(revOrdinalScale);
//
//     revBarChartArea.append("g")
//         .call(revXAxis)
//         .attr("stroke", "black")
//         .attr("transform", "translate(100, 501) rotate(-90)")
//         .attr("class", "xAxis");
//
//     // CREATE BAR CHART FOR REVENUE
//     var i = 0;
//     var length = data.length;
//     var rectWidth = (width-200)/length;
//     revBarChartArea.selectAll("rect")
//         .data(data)
//         .enter()
//         .append("rect")
//         .attr("x", function(d){
//             i++;
//             return rectWidth*(i-1);
//         })
//         .attr("y", function(d){
//             return revenueScale(d.Revenue);
//         })
//         .attr("width", function(d){
//             return rectWidth-3;
//         })
//         .attr("height", function(d){
//             return height-200-revenueScale(d.Revenue);
//         })
//         .attr("fill", "lightgray")
//         .attr("transform", "translate(100, 100)")
//         .on("mouseover", function(d) {
//             var tip = d3.tip()
//                 .attr("class", "tooltip")
//                 .direction("e")
//                 .html(function(){
//                     return "<p><h4>City: " + d.City + "</h4><p>Venue: " + d.Venue + "</p></p>"+"</p><p>Revenue: $" + d.Revenue + "</p>"
//                 });
//
//             svg.call(tip);
//
//             tip.show();
//
//             this.setAttribute("fill", "darkgray");
//         })
//         .on("mouseout", function(d){
//             d3.select(".tooltip").remove();
//             this.setAttribute("fill", "lightgray");
//         });
//
//     // SCALE FOR ATTENDANCE
//     var attYAxis = d3.axisLeft()
//         .scale(attendScale);
//
//     attBarChartArea.append("g")
//         .call(attYAxis)
//         .attr("stroke", "black")
//         .attr("transform", "translate(99, 100)");
//
//     data = sortData(data, "Attendance");
//
//     // CREATE X AXIS FOR ATTENDANCE
//     var attArray = [];
//     var attXArray = [];
//
//     for(var j = 0; j < data.length; j++){
//         // attArray[j] = data[j].Venue;
//         attArray[j] = data[j].City;
//         attXArray[j] = j* (width-200)/data.length + 10;
//     }
//
//     var attOrdinalScale = d3.scaleOrdinal()
//         .domain(attArray)
//         .range(attXArray);
//
//     var attXAxis = d3.axisLeft()
//         .scale(attOrdinalScale);
//
//     attBarChartArea.append("g")
//         .call(attXAxis)
//         .attr("stroke", "black")
//         .attr("transform", "translate(100, 501) rotate(-90)")
//         .attr("class", "xAxis");
//
//     // CREATE BAR CHART FOR ATTENDANCE
//     var j = 0;
//     attBarChartArea.selectAll("rect")
//         .data(data)
//         .enter()
//         .append("rect")
//         .attr("x", function(d){
//             j++;
//             return rectWidth*(j-1);
//         })
//         .attr("y", function(d){
//             return attendScale(d.Attendance);
//         })
//         .attr("width", function(d){
//             return rectWidth-3;
//         })
//         .attr("height", function(d){
//             return height-200-attendScale(d.Attendance);
//         })
//         .attr("fill", "lightgray")
//         .attr("transform", "translate(100, 100)")
//         .on("mouseover", function(d) {
//             var tip = d3.tip()
//                 .attr("class", "tooltip")
//                 .direction("e")
//                 .html(function(){
//                     return "<p><h4>City: " + d.City + "</h4><p>Venue: " + d.Venue + "</p></p>"+"</p><p>Attendance: " + d.Attendance + "</p>"
//                 });
//
//             svg.call(tip);
//
//             tip.show();
//
//             this.setAttribute("fill", "darkgray");
//         })
//         .on("mouseout", function(d){
//             d3.select(".tooltip").remove();
//             this.setAttribute("fill", "lightgray");
//         });
//
// }

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
    } else if(artist === "Shawn Mendes"){
        artist = "mendes";
    } else if(artist === "Ariana Grande"){
        artist = "grande";
    } else if(artist === "Pitbull"){
        artist = "pitbull";
    } else if(artist === "Bruno Mars"){
        artist = "mars";
    } else if(artist === "Jay-Z"){
        artist = "jayz";
    } else if(artist === "Maluma"){
        artist = "maluma";
    }

    var index = artists.indexOf(artist);

    var tour = tours[index];

    document.getElementById("description").innerText = descriptions[index];

    loadData(tour);

}

function dataWrangle(data) {
    for(var i = 0; i < data.length; i++){
        data[i].Attendance = parseInt(data[i].Attendance);
        data[i].Revenue = parseInt(data[i].Revenue);
    }
}

// function sortData(data, measure){
//     if(measure === "Revenue"){
//         data = data.sort(function(a,b){
//             return b.Revenue - a.Revenue;
//         });
//     } else {
//         data = data.sort(function (a, b) {
//             return b.Attendance - a.Attendance;
//         });
//     }
//     return data;
// }

document.getElementById("selector-select").addEventListener("change", handleChange);
// document.getElementById("selector-select").addEventListener("click", handleChange);

document.getElementById("sort-select").addEventListener("change", handleChange);
// document.getElementById("sort-select").addEventListener("click", handleChange);

loadData(defaultTour);
