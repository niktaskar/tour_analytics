from selenium import webdriver

chrome_path = "/Users/nikashtaskar/Desktop/cse457/chromedriver"
driver = webdriver.Chrome(chrome_path)

wiki = "https://en.wikipedia.org/wiki/"
tours = ["The_Damn_Tour", "Purpose_World_Tour", "Summer_Sixteen_Tour", "Starboy:_Legend_of_the_Fall_Tour", "The_Formation_World_Tour"]

def loadPage(tour):
    driver.get(wiki+tour)

def quitPage():
    driver.quit()

def createCSV(tour):
    filename = "../data/"+str(tour) + ".json"
    ofile = open(filename, 'w')

    # tableItems = driver.find_elements_by_class_name("wikitable")
    tableItems = driver.find_elements_by_tag_name("tr")

    # ofile.write("City,Date,Country,Venue,Attendance,Revenue")
    # ofile.write("City,State,Date,Country,Attendance,Revenue\n")

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    ofile.write("{'Concerts':[")
    for item in tableItems:
        line = item.text
        for month in months:
            splitLine = line.split(" ")
            if month in line and 'N/A' not in line and len(splitLine) > 4:
                # splitLine = line.split(" ")
                # print(splitLine[1])

                #CITY,STATE,DATE,COUNTRY,VENUE,ATTENDANCE,REVENUE
                dataLine = "{'City': '"+str(splitLine[3])+"',"+"'State': 'STATE'"+", 'Date': '"+str(splitLine[0]+"-")+str(splitLine[1]+"-").replace(",","")+str(splitLine[2])+"', 'Country': 'United States', 'Attendance': '"+str(splitLine[len(splitLine)-4]).replace(",","")+"', 'Revenue': '"+str(splitLine[len(splitLine)-1]).replace(",","").replace("$","")+"'},\n"
                ofile.write(dataLine)
                print(dataLine)

        # i = 2
        # while i < len(line):
        #     lineSplit = line[i].split(" ")
        #     if len(lineSplit) > 2:
        #         ofile.write(str(lineSplit))
        #         print(lineSplit)
        #     i += 1

        # ofile.write(item.text)
        # print(item.text)
    ofile.write("]}")
    ofile.close()

for tourName in tours:
    loadPage(tourName)
    createCSV(tourName)
quitPage()


