function Bar2(tourData, reducedCityData, reducedStateData) {
    var self = this;
    self.tourData = tourData;
    self.reducedCityData = reducedCityData;
    self.reducedStateData = reducedStateData;
    self.init();
}

Bar2.prototype.init = function() {
    var self = this;

    self.height = 1100;
    self.width = 500;

    self.svg1 = d3.select("#barchart-area2").append("svg")
        .attr("id", "bar1-svg2")
        .attr("height", self.height/2)
        .attr("width", self.width);
    // .attr("transform", "translate(0, 100)");

    self.svg2 = d3.select("#barchart-area2").append("svg")
        .attr("id", "bar2-svg2")
        .attr("height", self.height/2)
        .attr("width", self.width);
    // .attr("transform", "translate(0, 100)");

    self.renderBar(self.reducedCityData);
};

Bar2.prototype.update = function(tourData, reducedCityData, reducedStateData){
    var self = this;

    self.svg1.selectAll("g").remove();
    self.svg2.selectAll("g").remove();

    self.tourData = tourData;
    self.reducedCityData = reducedCityData;
    self.reducedStateData = reducedStateData;

    self.renderBar(self.reducedCityData);
};


Bar2.prototype.renderBar = function(reducedCityData) {
    var self = this;

    self.renderRevenue(reducedCityData);
    self.renderAttendance(reducedCityData);
};

Bar2.prototype.renderRevenue = function(reducedCityData) {
    var self = this;

    reducedCityData = reducedCityData.sort(function(a,b) {
        return b.Revenue-a.Revenue;
    });

    var trans = d3.transition()
        .duration(1000);

    self.svg1.selectAll("rect")
        .data(reducedCityData)
        .remove();

    var maxRevenue = d3.max(reducedCityData, function(d) {
        return d.Revenue;
    });

    var revenueScale = d3.scaleLinear()
        .domain([0, maxRevenue])
        .range([0, self.width-100]);

    var i = 0;
    var length = reducedCityData.length;
    var rectHeight = (self.height/2-100)/(length)-2;

    // X AXIS
    var labelArray = [];
    var labelXArray = [];

    for(var j = 0; j < reducedCityData.length; j++){
        labelArray[j] = reducedCityData[j].City;
        labelXArray[j] = j*rectHeight-2 + rectHeight/2;
    }

    var xOrdinalScale = d3.scaleOrdinal()
        .domain(labelArray)
        .range(labelXArray);

    var xAxis = d3.axisLeft()
        .scale(xOrdinalScale);

    self.svg1.append("g")
        .call(xAxis)
        .attr("stroke", "black")
        .attr("transform", "translate(99, 100)")
        .attr("class", "xAxis");

    // Y AXIS
    var yAxis = d3.axisRight()
        .scale(revenueScale);

    self.svg1.append("g")
        .call(yAxis)
        .attr("stroke", "black")
        .attr("transform", "translate(100 98) rotate(-90)");

    // RENDER
    var rects = self.svg1.selectAll("rect")
        .data(reducedCityData)
        .attr("height", function(d) {
            return rectHeight-2;
        })
        .attr("x", function() {
            return 0;
        })
        .attr("y", function(d) {
            i++;
            return (i-1)*rectHeight-2;
        })
        .attr("width", function(d) {
            return revenueScale(d.Revenue);
        });

    rects.enter()
        .append("rect")
        .attr("height", function(d) {
            return rectHeight-2;
        })
        .attr("fill", "darkgreen")
        .attr("transform", "translate(100, 100)")
        .on("mouseover", function(d) {
            var tip = d3.tip()
                .attr("class", "tooltip")
                .direction("e")
                .html(function(){
                    return "<p><h4>City: " + d.City + "</h4><p>Venue: " + d.Venue + "</p></p>"+"</p><p>Revenue: $" + d.Revenue + "</p>"
                });

            self.svg1.call(tip);

            tip.show();

            this.setAttribute("fill", "lightgreen");
        })
        .on("mouseout", function(d){
            d3.select(".tooltip").remove();
            this.setAttribute("fill", "darkgreen");
        })
        .transition(trans)
        .attr("x", function() {
            return 0;
        })
        .attr("y", function(d) {
            i++;
            return (i-1)*rectHeight-2;
        })
        .attr("width", function(d) {
            return revenueScale(d.Revenue);
        });
};

Bar2.prototype.renderAttendance = function(reducedCityData) {
    var self = this;

    reducedCityData = reducedCityData.sort(function(a,b) {
        return b.Attendance-a.Attendance;
    });

    var trans = d3.transition()
        .duration(1000);

    self.svg2.selectAll("rect")
        .data(reducedCityData)
        .remove();

    var maxAttendance = d3.max(reducedCityData, function(d) {
        return d.Attendance;
    });

    var attendScale = d3.scaleLinear()
        .domain([0, maxAttendance])
        .range([0, self.width-100]);

    var i = 0;
    var length = reducedCityData.length;
    var rectHeight = (self.height/2-100)/(length)-2;

    // X AXIS
    var labelArray = [];
    var labelXArray = [];

    for(var j = 0; j < reducedCityData.length; j++){
        labelArray[j] = reducedCityData[j].City;
        labelXArray[j] = j*rectHeight-2 + rectHeight/2;
    }

    var xOrdinalScale = d3.scaleOrdinal()
        .domain(labelArray)
        .range(labelXArray);

    var xAxis = d3.axisLeft()
        .scale(xOrdinalScale);

    // Y AXIS
    var yAxis = d3.axisRight()
        .scale(attendScale);

    self.svg2.append("g")
        .call(yAxis)
        .attr("stroke", "black")
        .attr("transform", "translate(100 98) rotate(-90)");

    // RENDER
    self.svg2.append("g")
        .call(xAxis)
        .attr("stroke", "black")
        .attr("transform", "translate(99, 100)")
        .attr("class", "xAxis");

    var rects = self.svg2.selectAll("rect")
        .data(reducedCityData)
        .attr("height", function(d) {
            return rectHeight-2;
        })
        .attr("x", function() {
            return 0;
        })
        .attr("y", function(d) {
            i++;
            return (i-1)*rectHeight-2;
        })
        .attr("width", function(d) {
            return attendScale(d.Attendance);
        });

    rects.enter()
        .append("rect")
        .attr("height", function(d) {
            return rectHeight-2;
        })
        .attr("fill", "darkblue")
        .on("mouseover", function(d) {
            var tip = d3.tip()
                .attr("class", "tooltip")
                .direction("e")
                .html(function(){
                    return "<p><h4>City: " + d.City + "</h4><p>Venue: " + d.Venue + "</p></p>"+"</p><p>Attendance: " + d.Attendance + "</p>"
                });

            self.svg1.call(tip);

            tip.show();

            this.setAttribute("fill", "lightblue");
        })
        .on("mouseout", function(d){
            d3.select(".tooltip").remove();
            this.setAttribute("fill", "darkblue");
        })
        .attr("transform", "translate(100, 100)")
        .transition(trans)
        .attr("x", function() {
            return 0;
        })
        .attr("y", function(d) {
            i++;
            return (i-1)*rectHeight-2;
        })
        .attr("width", function(d) {
            return attendScale(d.Attendance);
        });
};