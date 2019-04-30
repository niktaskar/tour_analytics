var height = 600;
var width = 1000;
var barWidth = 1100;
var artists = ["weeknd", 'beyonce', "lamar", "bieber", "drake", "mendes", "grande", "pitbull", "mars", "jayz", "maluma"];
var descriptions = ["Abel Makkonen Tesfaye (born 16 February 1990), better known by his stage name The Weeknd, is a Canadian singer, songwriter, and record producer. The Weeknd has helped to broaden the musical palette of R&B by incorporating indie and electronic music influences; his work has been categorized as alternative R&B.",
                    "Beyoncé Giselle Knowles-Carter is an American singer, songwriter, actress, director, record producer and dancer. She was born and raised in Houston, Texas. Her work has been categorized as a mix of R&B, pop, and hip hop.",
                    "Kendrick Lamar Duckworth (born June 17, 1987) is an American rapper, songwriter, and record producer. He was born and raised in Compton, California. He is regarded as one of the most skillful and successful hip hop artists of his generation.",
                    "Justin Drew Bieber (born March 1, 1994) is a singer-songwriter. After talent manager Scooter Braun discovered his YouTube videos covering songs, he was signed to RBMG in 2008. He was born in London, Ontario, Canada. His genre of music is best described as pop, R&B, and dance-pop.",
                    "Aubrey Drake Graham (born October 24, 1986) is a rapper, singer, songwriter, actor, producer, and entrepreneur. He was born in Toronto, Ontario, Canada. After being an actor for many years, he decided to pursue a career in music in 2007. His genres of music are hip-hop, R&B, and pop.",
                    "Shawn Peter Raul Mendes (born August 8, 1998) is a Canadian singer, songwriter, and model. In 2014 caught the attention of artist manager Andrew Gertler and Island Records A&R Ziggy Chareton, which led to him signing a deal with the record label. His genres of music include pop, folk-pop, and pop-rock.",
                    "Ariana Grande-Butera (born June 26, 1993) is an American singer, songwriter and actress. Born in Boca Raton, Florida to a family of New York-Italian origin, she began her career in 2008 in the Broadway musical 13. Her genre of music is classified as a mix of pop and R&B.",
                    "Armando Christian Pérez (born January 15, 1981), known by the stage name Pitbull, was born in Miami, Florida. His first recorded mainstream performance was on a solo track from Lil Jon's 2002 album Kings of Crunk. He began his career as a rapper, but later rebranded himself as a pop artist.",
                    "Peter Gene Hernandez (born October 8, 1985), known professionally as Bruno Mars, is a singer, songwriter, multi-instrumentalist, record producer, and dancer born in Honolulu, Hawaii. He is known for performing in a wide range of musical styles, including R&B, funk, pop, soul, reggae, hip hop, and rock.",
                    "Shawn Corey Carter (born December 4, 1969), known professionally as Jay-Z is an American rapper, songwriter, record producer, entrepreneur, and record executive. He is regarded as one of the world's most significant rappers and cultural icons and has been a global figure in popular culture for over two decades.",
                    "Juan Luis Londoño Arias (born 28 January 1994), known professionally as Maluma, is a Colombian singer and songwriter, signed to Sony Music Colombia and Sony Latin. He has won a Latin Grammy Award and two Latin American Music Awards. His musical genres include reggaeton, latin trap, and latin pop."];
var tours = ["Starboy:_Legend_of_the_Fall_Tour", "The_Formation_World_Tour", "The_Damn_Tour", "Purpose_World_Tour", "Summer_Sixteen_Tour", "Illuminate_World_Tour", "Dangerous_Woman_Tour", "Enrique_Iglesias_and_Pitbull_Live", "24K_Magic_World_Tour", "On_the_Run_II_Tour", "F.A.M.E._Tour_(Maluma)"];
var titles = ["Starboy: Legend of the Fall Tour", "The Formation World Tour", "The Damn Tour", "Purpose World Tour", "Summer Sixteen Tour", "Illuminate World Tour", "Dangerous Woman Tour", "Pitbull Live", "24K Magic World Tour", "On the Run II Tour", "F.A.M.E. Tour"];
var defaultTour = tours[0];
var defaultData = [];


document.getElementById("description").innerHTML = "<p>" + titles[0] + "<img src='images/weeknd.jpg'/><br>" + descriptions[0] + "<br><iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/34Na4j8AVgA\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe></p>";

var pieArea = d3.select("#pie-area").append("svg")
    .attr("id", "pie-svg");

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
    document.getElementById("pie-area").innerHTML = "Hover over slice to see venue name and revenue";
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

    defaultData = tourDataReducedFinal;

    renderBarChart(tourDataReducedFinal);

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
                } else if (tourData.Concerts[i].Abbr === d.properties.STATE_ABBR){
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
        .on("click", function(d){
            renderPie(d, tourData);
        })
        .on("mouseout", function(d){
            textArea.selectAll("text").remove();
            d3.select(".tooltip").remove();
        });
}

function renderPie(mapData, concertData){
    var concerts = [];
    document.getElementById("pie-area").innerHTML = " ";

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

    for(var j = 0; j < concertData.Concerts.length; j++){
        if(concertData.Concerts[j].Abbr === mapData.properties.STATE_ABBR) {
            concerts.push({
                key: concertData.Concerts[j].Venue,
                value: concertData.Concerts[j].Revenue
            });
        }
    }

    if(concerts[0] == null){
        document.getElementById("pie-area").innerHTML = "No concerts in this state";
    }

    var color = d3.scaleOrdinal()
        .domain(concerts)
        .range(["#1B18C7", "#48C718", "#9A18C7", "#DF1830", "#0DF2F2", "#F20DE4", "#1A7B17"])

    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

    var pie = d3.pie()
        .value(function(d) {return d.value.value; });
    var data_ready = pie(d3.entries(concerts));

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
        .on("mouseover", function(d) {
            var tip = d3.tip()
                .attr("class", "tooltip")
                .direction("e")
                .html(function(){
                    return "<p><h4>Venue: " + d.data.value.key + "<br> Revenue: $" + d.data.value.value + "</p>"
                });

            svg.call(tip);

            tip.show();
        })
        .on("mouseout", function(d){
            d3.select(".tooltip").remove();
        })
        .style("stroke-width", "0.5px")
        .style("opacity", 0.5);
}

function renderBarChart(data){
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

function handleChange(){
    var artist = document.getElementById("selector-select").value;
    var youtube = "";

    if(artist === "The Weeknd"){
        artist = "weeknd";
        youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/34Na4j8AVgA\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
    } else if(artist === "Beyonce"){
        artist = "beyonce";
        youtube = "\n" +
            "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/WDZJPJV__bQ\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
    } else if(artist === "Kendrick Lamar"){
        artist = "lamar";
        youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/NLZRYQMLDW4\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
    } else if(artist === "Justin Bieber"){
        artist = "bieber";
        youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/DK_0jXPuIr0\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
    } else if(artist === "Drake"){
        artist = "drake";
        youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/xpVfcZ0ZcFM\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
    } else if(artist === "Shawn Mendes"){
        artist = "mendes";
        youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/sJUGAIf1Px0\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
    } else if(artist === "Ariana Grande"){
        artist = "grande";
        youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/gl1aHhXnN1k\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
    } else if(artist === "Pitbull"){
        artist = "pitbull";
        youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/2up_Eq6r6Ko\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
    } else if(artist === "Bruno Mars"){
        artist = "mars";
        youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/PMivT7MJ41M\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
    } else if(artist === "Jay-Z"){
        artist = "jayz";
        youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/zSkA61esq_c\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
    } else if(artist === "Maluma"){
        artist = "maluma";
        youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/iMEhjsiHbwM\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
    }

    var index = artists.indexOf(artist);

    var tour = tours[index];

    document.getElementById("description").innerHTML = "<p>" + titles[index] + "<img src='images/" + artist + ".jpg'/><br>" + descriptions[index] + "<br>" + youtube + "</p>";

    loadData(tour);

}

function dataWrangle(data) {
    for(var i = 0; i < data.length; i++){
        data[i].Attendance = parseInt(data[i].Attendance);
        data[i].Revenue = parseInt(data[i].Revenue);
    }
}

document.getElementById("selector-select").addEventListener("change", handleChange);
// document.getElementById("selector-select").addEventListener("click", handleChange);

document.getElementById("sort-select").addEventListener("change", handleChange);
// document.getElementById("sort-select").addEventListener("click", handleChange);

loadData(defaultTour);
