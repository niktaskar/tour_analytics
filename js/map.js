function Map(tourData, reducedCityData, reducedStateData, mapData) {
    var self = this;
    self.tourData = tourData;
    self.reducedCityData = reducedCityData;
    self.reducedStateData = reducedStateData;
    self.mapData = mapData;
    self.init();
}

Map.prototype.init = function() {
  var self = this;

  self.height = 500;
  self.width = 800;

  self.svg = d3.select("#chart-area").append("svg")
      .attr("id", "map-svg")
      .attr("height", self.height)
      .attr("width", self.width);

  self.renderMap(self.mapData);
};


Map.prototype.update = function(tourData, reducedCityData, reducedStateData) {
    var self = this;

    self.svg.selectAll("path").remove();

    self.tourData = tourData;
    self.reducedCityData = reducedCityData;
    self.reducedStateData = reducedStateData;

    var sortedAttendances = self.reducedStateData.sort(function(a, b){
        return b.Attendance - a.Attendance;
    });

    var topAttendances = sortedAttendances.filter( function(d){
        return d.Attendance > sortedAttendances[5].Attendance;
    });

    var sortedRevenues = self.reducedStateData.sort(function(a, b){
        return b.Revenue - a.Revenue;
    });

    var topRevenues = sortedRevenues.filter( function(d){
        return d.Revenue > sortedRevenues[5].Revenue;
    });

    var trans = d3.transition()
        .duration(1000);

    var projection = d3.geoAlbersUsa()
        .translate([self.width / 2, self.height / 2]);

    var path = d3.geoPath()
        .projection(projection);

    var usa = topojson.feature(self.mapData, self.mapData.objects.usStates).features;

    // states
    self.svg.selectAll("path").data(usa)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "map")
        .attr("stroke", "white")
        .attr("stroke-width", "2px")
        .attr("fill", function(d){
            var stateAbbr = d.properties.STATE_ABBR;
            var i = 0;
            while(i < self.reducedStateData.length){
                // STATES WHERE THEY HAD THEIR BEST PERFORMANCES ON BOTH CRITERIA
                if(self.reducedStateData[i].Abbr === stateAbbr && ((topRevenues.indexOf(self.reducedStateData[i]) !== -1) && (topAttendances.indexOf(self.reducedStateData[i]) !== -1))){
                    return "purple";
                }
                // STATES WHERE THEY HAD THEIR HIGHEST REVENUES
                else if (self.reducedStateData[i].Abbr === stateAbbr && (topRevenues.indexOf(self.reducedStateData[i]) !== -1)){
                    return "red";
                }
                // STATES WHERE THEY HAD THEIR HIGHEST ATTENDANCES
                else if (self.reducedStateData[i].Abbr === stateAbbr && (topAttendances.indexOf(self.reducedStateData[i]) !== -1)){
                    return "blue";
                }
                // DEFAULT COLORING
                else if (self.reducedStateData[i].Abbr === stateAbbr){
                    return "#484D4D";
                }

                i++;
            }
            return "lightgray";
        })
        .attr("id", function(d) {
            return d.properties.STATE_ABBR;
        })
        .on("mouseover", function(d) {
            var stateAbbr = d.properties.STATE_ABBR;

            var totalRevenue = 0;
            var totalAttendance = 0;

            for(var i = 0; i < self.reducedStateData.length; i++){
                if(self.reducedStateData[i].Abbr === stateAbbr) {
                    totalRevenue = self.reducedStateData[i].Revenue;
                    totalAttendance = self.reducedStateData[i].Attendance;
                }
            }

            var tip = d3.tip()
                .attr("class", "tooltip")
                .direction("e")
                .html(function(){
                    if(totalAttendance !== 0) {
                        return "<p><h4>State: " + stateAbbr + "</h4></p><p>Total Attendance: " + totalAttendance + "</p><p>Total Revenue: $" + totalRevenue + "</p>";
                    } else {
                        return "<p><h4>State: " + stateAbbr + "</h4></p><p>No Concerts</p>";
                    }
                });

            self.svg.call(tip);

            tip.show();
        })
        .on("click", function(d){
            self.renderPie(d.properties.STATE_ABBR);
        })
        .on("mouseout", function(d){
            d3.select(".tooltip").remove();
        });
};

Map.prototype.renderMap = function(mapData) {
    var self = this;

    var projection = d3.geoAlbersUsa()
        .translate([self.width / 2, self.height / 2]);

    var path = d3.geoPath()
        .projection(projection);

    var usa = topojson.feature(mapData, mapData.objects.usStates).features;

    // console.log(mapData);

    var sortedAttendances = self.reducedStateData.sort(function(a, b){
        return b.Attendance - a.Attendance;
    });

    var topAttendances = sortedAttendances.filter( function(d){
        return d.Attendance > sortedAttendances[5].Attendance;
    });

    var sortedRevenues = self.reducedStateData.sort(function(a, b){
        return b.Revenue - a.Revenue;
    });

    var topRevenues = sortedRevenues.filter( function(d){
        return d.Revenue > sortedRevenues[5].Revenue;
    });

    self.svg.selectAll("path")
        .data(usa)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "map")
        .attr("stroke", "white")
        .attr("stroke-width", "2px")
        .attr("fill", function(d){
            var stateAbbr = d.properties.STATE_ABBR;
            var i = 0;
            while(i < self.reducedStateData.length){
                // STATES WHERE THEY HAD THEIR BEST PERFORMANCES ON BOTH CRITERIA
                if(self.reducedStateData[i].Abbr === stateAbbr && ((topRevenues.indexOf(self.reducedStateData[i]) !== -1) && (topAttendances.indexOf(self.reducedStateData[i]) !== -1))){
                    return "purple";
                }
                // STATES WHERE THEY HAD THEIR HIGHEST REVENUES
                else if (self.reducedStateData[i].Abbr === stateAbbr && (topRevenues.indexOf(self.reducedStateData[i]) !== -1)){
                    return "red";
                }
                // STATES WHERE THEY HAD THEIR HIGHEST ATTENDANCES
                else if (self.reducedStateData[i].Abbr === stateAbbr && (topAttendances.indexOf(self.reducedStateData[i]) !== -1)){
                    return "blue";
                }
                // DEFAULT COLORING
                else if (self.reducedStateData[i].Abbr === stateAbbr){
                    return "#484D4D";
                }

                i++;
            }
            return "lightgray";
        })
        .attr("id", function(d) {
            return d.properties.STATE_ABBR;
        })
        .on("mouseover", function(d) {
            var stateAbbr = d.properties.STATE_ABBR;

            var totalRevenue = 0;
            var totalAttendance = 0;

            for(var i = 0; i < self.reducedStateData.length; i++){
                if(self.reducedStateData[i].Abbr === stateAbbr) {
                    totalRevenue = self.reducedStateData[i].Revenue;
                    totalAttendance = self.reducedStateData[i].Attendance;
                }
            }

            var tip = d3.tip()
                .attr("class", "tooltip")
                .direction("e")
                .html(function(){
                    if(totalAttendance !== 0) {
                        return "<p><h4>State: " + stateAbbr + "</h4></p><p>Total Attendance: " + totalAttendance + "</p><p>Total Revenue: $" + totalRevenue + "</p>";
                    } else {
                        return "<p><h4>State: " + stateAbbr + "</h4></p><p>No Concerts</p>";
                    }
                });

            self.svg.call(tip);

            tip.show();
        })
        .on("click", function(d){
            self.renderPie(d.properties.STATE_ABBR);
        })
        .on("mouseout", function(d){
            // textArea.selectAll("text").remove();
            d3.select(".tooltip").remove();
        });
};

Map.prototype.renderPie = function(stateAbbr){
    var self = this;


    d3.select("#pie-area").selectAll("g").remove();
    d3.select("#pie-area").selectAll("path").remove();
    d3.select("#pie-area").selectAll("svg").remove();

    var data = self.tourData;

    for(var i = 1; i < data.length; i++) {
        for(var x = 0; x < i; x++){
            if(data[x].Abbr === data[i].Abbr && data[x].City === data[i].City){
                if(data[x].Revenue > data[i].Revenue){
                    data[x].Revenue -= data[i].Revenue;
                } else {
                    data[i].Revenue -= data[x].Revenue;
                }
                break;
            } else if(data[x].Abbr === data[i].Abbr){
                if(data[x].Revenue > data[i].Revenue){
                    data[x].Revenue -= data[i].Revenue;
                } else {
                    data[i].Revenue -= data[x].Revenue;
                }
                break;
            } else if(data[x].Abbr === data[i].Abbr && data[x].Venue === data[i].Venue) {
                if (data[x].Revenue > data[i].Revenue) {
                    data[x].Revenue -= data[i].Revenue;
                } else {
                    data[i].Revenue -= data[x].Revenue;
                }
                break;
            }
        }
    }

    var reduced = self.reducedStateData;

    data = data.filter(function(d) {
        return d.Abbr === stateAbbr;
    });

    if(data.length === 0){
        document.getElementById("state-abbr").innerText = "";
        alert("There were no concerts in this state :(");
        return;
    }

    document.getElementById("state-abbr").innerText = stateAbbr;

    var width = 450;
    var height = 450;
    var margin = 40;
    var radius = Math.min(width, height) / 2 - margin;

    var svg = d3.select("#pie-area")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var dataDict = [];

    var total = 0;

    for(var i = 0; i < data.length; i++){
        if(data[i].Abbr === stateAbbr){
            total += data[i].Revenue;
        }
    }

    for(var j = 0; j < data.length; j++){
        dataDict.push({
            key: data[j].Venue,
            value: data[j].Revenue,
            total: total
        });
    }

    var arcGenerator = d3.arc()
        .outerRadius(radius);

    var pie = d3.pie()
        .value(function(d) {return d.value.value; });

    var data_ready = pie(d3.entries(dataDict));

    var color = d3.scaleOrdinal()
        .domain(dataDict)
        .range(["#1B18C7", "#48C718", "#9A18C7", "#DF1830", "#0DF2F2", "#F20DE4", "#1A7B17"]);

    svg
        .selectAll('g')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        )
        .attr('fill', function(d){ return(color(d.data.value.key)) })
        .attr("stroke", "black")
        .attr("class", "pie")
        .on("mouseover", function(d) {
            var tip = d3.tip()
                .attr("class", "tooltip")
                .direction("e")
                .html(function(){
                    return "<p><h4>Venue: " + d.data.value.key + "<br> Revenue: $" + d.data.value.value + "<br> Percent Revenue: " + (100*d.data.value.value/d.data.value.total).toFixed(1) +"%</p>"
                });

            svg.call(tip);

            tip.show();
        })
        .on("mouseout", function(d){
            d3.select(".tooltip").remove();
        })
        .style("stroke-width", "1px")
        .style("opacity", .85);

};