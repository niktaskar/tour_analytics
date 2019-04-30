
(function() {
    var instance = null;

    var artists = ["weeknd", 'beyonce', "lamar", "bieber", "drake", "mendes", "grande", "pitbull", "mars", "jayz", "maluma"];
    var artists1 = ["weeknd1", 'beyonce1', "lamar1", "bieber1", "drake1", "mendes1", "grande1", "pitbull1", "mars1", "jayz1", "maluma1"];
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

    function init() {
        var artist = getArtist();
        var index = artists.indexOf(artist);
        var tour1 = tours[index];
        var tour2 = tours[index];
        loadData(tour1, tour2);
    }

    function getArtist(){
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

        return artist;
    }

    function getArtistCompare(){
        var artist = document.getElementById("compare-select").value;
        var youtube = "";

        if(artist === "The Weeknd"){
            artist = "weeknd1";
            youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/34Na4j8AVgA\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
        } else if(artist === "Beyonce"){
            artist = "beyonce1";
            youtube = "\n" +
                "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/WDZJPJV__bQ\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
        } else if(artist === "Kendrick Lamar"){
            artist = "lamar1";
            youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/NLZRYQMLDW4\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
        } else if(artist === "Justin Bieber"){
            artist = "bieber1";
            youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/DK_0jXPuIr0\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
        } else if(artist === "Drake"){
            artist = "drake1";
            youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/xpVfcZ0ZcFM\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
        } else if(artist === "Shawn Mendes"){
            artist = "mendes1";
            youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/sJUGAIf1Px0\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
        } else if(artist === "Ariana Grande"){
            artist = "grande1";
            youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/gl1aHhXnN1k\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
        } else if(artist === "Pitbull"){
            artist = "pitbull1";
            youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/2up_Eq6r6Ko\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
        } else if(artist === "Bruno Mars"){
            artist = "mars1";
            youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/PMivT7MJ41M\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
        } else if(artist === "Jay-Z"){
            artist = "jayz1";
            youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/zSkA61esq_c\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
        } else if(artist === "Maluma"){
            artist = "maluma1";
            youtube = "<iframe width=\"250\" height=\"250\" src=\"https://www.youtube.com/embed/iMEhjsiHbwM\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
        }

        return artist;
    }

    function getDescription() {
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

        var image = "./images/"+artist+".jpg";

        var img = "<img src='"+ image +"'>";

        var index = artists.indexOf(artist);

        document.getElementById("description").innerHTML = "<p>" + titles[index] + "\n" + "<img src='images/" + artist + ".jpg'/><br>" + descriptions[index] + "<br>" + youtube + "</p>";
    }

    function loadData(tour1, tour2) {
        var tourData, tour2Data, mapData;
        getDescription();
        queue()
            .defer(d3.json, "data/"+tour1+".json")
            .defer(d3.json, "data/"+tour2+".json")
            .defer(d3.json, "data/us.json")
            .awaitAll(function(error, results) {
                tourData = results[0].Concerts;
                tour2Data = results[1].Concerts;
                mapData = results[2];
                createVisualization(tourData, tour2Data, mapData);
            });
    }

    function createVisualization(tourData, tour2Data, mapData){
        dataWrangle(tourData);
        dataWrangle(tour2Data);
        var reducedCityData = reduceCityTourData(tourData);
        var reducedStateData = reduceStateTourData(tourData);

        var reducedCityData2 = reduceCityTourData(tour2Data);
        var reducedStateData2 = reduceStateTourData(tour2Data);

        var map = new Map(tourData, reducedCityData, reducedStateData, mapData);
        var bar = new Bar(tourData, reducedCityData, reducedStateData);
        var bar2 = new Bar2(tour2Data, reducedCityData2, reducedStateData2);

        document.getElementById("selector-select").addEventListener("change", function(){

            d3.select("#pie-area").selectAll("svg").remove();
            document.getElementById("state-abbr").innerText = "";

            var artist = getArtist();

            getDescription();

            var tour = tours[artists.indexOf(artist)];

            queue()
                .defer(d3.json, "data/"+tour+".json")
                .awaitAll(function(error, result){
                    var tourData = result[0].Concerts;
                    dataWrangle(tourData);
                    var reducedCityData = reduceCityTourData(tourData);
                    var reducedStateData = reduceStateTourData(tourData);

                    map.update(tourData, reducedCityData, reducedStateData);
                    bar.update(tourData, reducedCityData, reducedStateData);
                })
        });

        document.getElementById("compare-select").addEventListener("change", function(){

            var artist = getArtistCompare();

            var tour = tours[artists1.indexOf(artist)];

            queue()
                .defer(d3.json, "data/"+tour+".json")
                .awaitAll(function(error, result){
                    var tourData = result[0].Concerts;
                    dataWrangle(tourData);
                    var reducedCityData = reduceCityTourData(tourData);
                    var reducedStateData = reduceStateTourData(tourData);

                    bar2.update(tourData, reducedCityData, reducedStateData);
                })
        });

    }

    function dataWrangle(tourData) {
        for(var i = 0; i < tourData.length; i++){
            tourData[i].Attendance = parseInt(tourData[i].Attendance);
            tourData[i].Revenue = parseInt(tourData[i].Revenue);
        }
    }

    function reduceCityTourData(tourData){
        var tourDataReduced = [];
        // console.log(tourData);

        for(var i = 0; i < tourData.length; i++){
            if(tourDataReduced[tourData[i].Venue]){
                tourDataReduced[tourData[i].Venue].Attendance = tourDataReduced[tourData[i].Venue].Attendance + tourData[i].Attendance;
                tourDataReduced[tourData[i].Venue].Revenue = tourDataReduced[tourData[i].Venue].Revenue + tourData[i].Revenue;
            } else {
                tourDataReduced[tourData[i].Venue] = tourData[i];
            }
        }

        // console.log(tourDataReduced);

        var tourDataReducedFinal = [];
        for(val in tourDataReduced){
            tourDataReducedFinal.push(tourDataReduced[val]);
        }

        defaultData = tourData;
        return tourDataReducedFinal;
    }

    function reduceStateTourData(tourData){
        var tourDataReduced = [];

        for(var i = 0; i < tourData.length; i++){
            if(tourDataReduced[tourData[i].State]){
                tourDataReduced[tourData[i].State].Attendance = tourDataReduced[tourData[i].State].Attendance + tourData[i].Attendance;
                tourDataReduced[tourData[i].State].Revenue = tourDataReduced[tourData[i].State].Revenue + tourData[i].Revenue;
            } else {
                tourDataReduced[tourData[i].State] = tourData[i];
            }
        }

        var tourDataReducedFinal = [];
        for(val in tourDataReduced){
            tourDataReducedFinal.push(tourDataReduced[val]);
        }

        defaultData = tourData;
        return tourDataReducedFinal;
    }

    function Main() {
        if(instance !== null){
            throw new Error("Cannot instantiate more than one Class");
        }
    }

    Main.getInstance = function(){
        var self = this;

        if(self.instance == null){
            self.instance = new Main();

            init();
        }
        return instance;
    };

    Main.getInstance();
})();