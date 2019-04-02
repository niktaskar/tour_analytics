# tour_analytics
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

