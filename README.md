# musictours
Data Visualization Final Project: using data from various artists' tours, the aim is to display which venues/states garner the highest audiences for each artist, and to uncover underlying factors of audience turnout.
Please inspect the web page when changing the select option.

#### Milestone 1:
* Created a webcrawler (dataCollect.py) to parse the Wikipedia pages of 5 major tours
  * Justin Bieber - Purpose Tour
  * Kendrick Lamar - Damn Tour
  * Drake - Summer Sixteen Tour
  * Weeknd - Starboy Tour
  * Beyonce - Formation Tour
* From this parser we gathered the following information for each performance (in the US) for each tour and put the information into json format:
  * Date
  * City and State
  * Venue 
  * Attendance
  * Revenue
* We set up the topojson to create a map of the USA which we are going to put all of our information into.
* For Milestone 1 we spent most of our effort ironing out the webcrawler in order to have data we can work with for the next Milestone.

#### Milestone 2:
* Added 6 more tours to our visualizaition
  * Shawn Mendes - Illuminate Tour
  * Ariana Grande - Dangerous Woman Tour
  * Pitbull (with Enrique Iglesias) - Live Tour
  * Bruno Mars - 24K Magic Tour
  * Jay-Z (with Beyonce) - On The Run II Tour
  * Maluma - F.A.M.E Tour
* Added data to the US Map set up in the first milestone. If you hover over a state it displays a tooltip that either has information about the tour stops in that state, or says that there were no performances in that state. We also added color coding, purple states are the top 5 best performing states overall for each tour, red states are the best performing states for revenue, and blue states are the best performing states for attendance.
* Added bar graphs displaying information about each venue on a tour, which displays information specific to each venue on hover of a bar.

