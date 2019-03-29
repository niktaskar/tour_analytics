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
    filename = "../data/"+str(tour) + ".csv"
    ofile = open(filename, 'w')

    tableItems = driver.find_elements_by_class_name("wikitable")

    ofile.write("City,Date,Country,Venue,Attendance,Revenue")

    for item in tableItems:
        line = item.text
        line = line.split('\n')
        # print(line)
        i = 2
        while i < len(line):
            lineSplit = line[i].split(" ")
            print(lineSplit)
            i += 1
            ofile.write(str(lineSplit))

        # ofile.write(item.text)
        # print(item.text)

    ofile.close()

for tourName in tours:
    loadPage(tourName)
    createCSV(tourName)
quitPage()


